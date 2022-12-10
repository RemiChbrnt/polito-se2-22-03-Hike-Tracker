'use strict'
const db = require('../../db/db');

exports.getHikes = async (query) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * from Hikes h'
        const filters = this.generateFilters(query);
        sql = sql + filters
        // console.log(sql)
        db.all(sql, [], async (err, rows) => {
            if (err) {
                console.log("err" + err)
                reject()
                return
            }
            const res = await Promise.all(
                rows.map(async (r) => {
                    const startLocation = await getLocationById(r.startPt);
                    const endLocation = await getLocationById(r.endPt);
                    const refLocations = await getReferenceLocations(r.id);
                    const statuses = await getStatusList(r.id);
                    return {
                        id: r.id,
                        title: r.title,
                        length: r.length,
                        expTime: r.expTime,
                        ascent: r.ascent,
                        difficulty: r.difficulty,
                        startPt: startLocation,
                        endPt: endLocation,
                        description: r.description,
                        track: r.track,
                        author: r.author,
                        referencePoints: refLocations,
                        statusList: statuses,
                    }
                })
            )
            const hikes = this.filterByLocation(query, res)
            resolve(hikes)
        })
    })
}


const getStatusList = async function (id) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT status, description, name FROM HikesHaveHuts hhh, Locations l WHERE hikeId=? AND hhh.locationId=l.id'
        db.all(sql, [id], async (err, rows) => {
            if (err) {
                console.log(err)
                return null;
            }
            resolve(rows)
        })
    })
}

exports.getHikeFromID = async (query) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * from Hikes WHERE id=${query.id}`
        db.all(sql, [], async (err, r) => {
            if (err) {
                console.log("err" + err)
                reject()
                return
            }
            const hike = r[0];
            const startLocation = await getLocationById(hike.startPt);
            const endLocation = await getLocationById(hike.endPt);
            const refLocations = await getReferenceLocations(hike.id);
            const statuses = await getStatusList(hike.id);
            resolve({
                id: hike.id,
                title: hike.title,
                length: hike.length,
                expTime: hike.expTime,
                ascent: hike.ascent,
                difficulty: hike.difficulty,
                startPt: startLocation,
                endPt: endLocation,
                description: hike.description,
                track: hike.track,
                author: hike.author,
                referencePoints: refLocations,
                statusList: statuses,
            });
        })
    })
}



const getLocationById = async function (id) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Locations WHERE id=?'
        db.get(sql, [id], async (err, row) => {
            if (err) {
                console.log(err)
                return null;
            }
            resolve(row)
        })
    })
}

const getReferenceLocations = async function (id) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * \
                     FROM Locations \
                     WHERE id IN ( SELECT locationId FROM HikesReferencePoints WHERE hikeId=?)'
        db.all(sql, [id], async (err, rows) => {
            if (err) {
                console.log(err)
                return null;
            }
            resolve(rows)
        })
    })
}



exports.filterByLocation = (query, hikes) => {
    return hikes.filter((hike) => {
        if (query.country !== undefined) {
            if (hike.startPt.country.toLowerCase() !== query.country.toLowerCase()) return false
        }
        if (query.region !== undefined) {
            if (hike.startPt.region.toLowerCase() !== query.region.toLowerCase()) return false
        }
        if (query.town !== undefined) {
            if (hike.startPt.town.toLowerCase() !== query.town.toLowerCase()) return false
        }
        return true
    });
}

exports.generateFilters = (query) => {
    let filters = ""
    if (query.minLength !== undefined || query.maxLength !== undefined ||
        query.minAscent !== undefined || query.maxAscent !== undefined ||
        query.minTime !== undefined || query.maxTime !== undefined ||
        query.difficulty !== undefined) {
        // test for an empty query, this looks awful but we cannot check for an empty object since
        // there are also fields for the locations that are used later on.   
        filters = " where"
        if (query.minLength !== undefined) filters = filters + ` length >= ${query.minLength} AND`
        if (query.maxLength !== undefined) filters = filters + ` length <= ${query.maxLength} AND`
        if (query.minAscent !== undefined) filters = filters + ` ascent >= ${query.minAscent} AND`
        if (query.maxAscent !== undefined) filters = filters + ` ascent <= ${query.maxAscent} AND`
        if (query.minTime !== undefined) filters = filters + ` expTime >= ${query.minTime} AND`
        if (query.maxTime !== undefined) filters = filters + ` expTime <= ${query.maxTime} AND`
        if (query.difficulty !== undefined) filters = filters + ` difficulty = "${query.difficulty}" AND`
        if (query.author !== undefined) filters = filters + ` author = "${query.difficulty}" AND`
        filters = filters + " 1"
    }
    return filters;
}






exports.createHike = async (hike) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Hikes(title, length, expTime, ascent, difficulty, startPt, endPt, description, track, author) VALUES(?,?,?,?,?,?,?,?,?,?)';
        db.run(sql, [
            hike.title,
            hike.length,
            hike.expTime,
            hike.ascent,
            hike.difficulty,
            hike.startPt,
            hike.endPt,
            hike.description,
            hike.track,
            hike.author
        ], function (err, rows) {
            if (err) {
                console.log(err);
                reject(400);
                return;
            }
            else {
                resolve({ id: this.lastID });
                return;
            }
        })
    })
}



exports.setHikeStartPoint = async (hike) => {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE Hikes SET startPt = ? WHERE id = ?`;
        db.run(sql, [
            hike.startPt,
            hike.id
        ], async (err) => {
            if (err) {
                reject(400);
                return;
            }
            else {
                resolve(200);
                return;
            }
        })
    })
}




exports.setHikeEndPoint = async (hike) => {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE Hikes SET endPt = ? WHERE id = ?`;
        db.run(sql, [
            hike.endPt,
            hike.id
        ], async (err) => {
            if (err) {
                reject(400);
                return;
            }
            else {
                resolve(200);
                return;
            }
        })
    })
}


exports.getHikesByHutId // add radius check (5 km)
    = async (hutId, email) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT hk.id, hk.title, hhh.status, hhh.description \
        FROM Hikes hk, HikesHaveHuts hhh, HutWorkers hw \
        WHERE hhh.locationId = hw.locationId AND hk.id = hhh.hikeId AND hhh.locationId = ? AND hw.email = ?';
            db.all(sql, [
                hutId,
                email
            ], async function (err, rows) {
                if (err) {
                    console.log(err)
                    reject(400);
                    return;
                }
                resolve(rows);
                return;
            })
        })
    }



exports.updateStatus = async (status, hikeId, hutId, email) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE HikesHaveHuts SET status = ?, description = ? \
        WHERE hikeId = ? AND locationId = ? AND locationId = (SELECT locationId FROM HutWorkers WHERE email = ?)';
        db.run(sql, [
            status.status,
            status.description,
            hikeId,
            hutId,
            email
        ], async function (err) {
            if (err) {
                console.log(err)
                reject(400);
                return;
            }
            if (this.changes === 0) {
                reject(404);
                return;
            }
            resolve(200);
            return;
        }
        )
    })
}
exports.addHikeReferencePoint = async (query) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO HikesReferencePoints(hikeId, locationId) VALUES(?,?)';
        db.run(sql, [
            query.hikeId,
            query.locationId,
        ], function (err, rows) {
            if (err) {
                console.log(err);
                reject(400);
                return;
            }
            else {
                resolve(200);
                return;
            }
        })
    })
}


