'use strict'
const db = require('../../index').database

exports.getHikes = async (query) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * from Hikes'
        const filters = this.generateFilters(query);
        sql = sql + filters
        // console.log(sql)
        db.all(sql, [], async (err, rows) => {
            if (err) {
                reject()
                return
            }
            const res = await Promise.all(
                rows.map(async (r) => {
                    const startLocation = await this.getLocationById(r.startPt);
                    const endLocation = await this.getLocationById(r.endPt);
                    const refLocations = await this.getReferenceLocations(r.id);
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
                        referencePoints: refLocations,
                    }
                })
            )
            const hikes = this.filterByLocation(query, res)
            resolve(hikes)
        })
    })
}
exports.filterByLocation = (query, hikes) => {
    return hikes.filter((hike) => {
        if (query.country !== undefined) {
            if (hike.startPt.country.toLowerCase() !== query.country.toLowerCase()) return false
        }
        if (query.province !== undefined) {
            if (hike.startPt.province.toLowerCase() !== query.province.toLowerCase()) return false
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
        if (query.minLength !== undefined) filters = filters + ` length > ${query.minLength} AND`
        if (query.maxLength !== undefined) filters = filters + ` length < ${query.maxLength} AND`
        if (query.minAscent !== undefined) filters = filters + ` ascent > ${query.minAscent} AND`
        if (query.maxAscent !== undefined) filters = filters + ` ascent < ${query.maxAscent} AND`
        if (query.minTime !== undefined) filters = filters + ` expTime > ${query.minTime} AND`
        if (query.maxTime !== undefined) filters = filters + ` expTime < ${query.maxTime} AND`
        if (query.difficulty !== undefined) filters = filters + ` difficulty = "${query.difficulty}" AND`
        filters = filters + " 1"
    }
    return filters;
}

exports.getReferenceLocations = async (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * \
                     from Locations \
                     where id in ( select locationId from HikesReferencePoints where hikeId=?)'
        db.all(sql, [id], async (err, rows) => {
            if (err) {
                console.log(err)
                return null;
            }
            resolve(rows)
        })
    })
}
exports.getLocationById = async (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * from Locations where id=?'
        db.get(sql, [id], async (err, row) => {
            if (err) {
                console.log(err)
                return null;
            }
            resolve(row)
        })
    })
}

exports.createHike = async (hike) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Hikes(title, length, expTime, ascent, difficulty, startPt, endPt, description, author) VALUES(?,?,?,?,?,1,2,?,?)';
        db.run(sql, [
            hike.title,
            hike.length,
            hike.expTime,
            hike.ascent,
            hike.difficulty,
            hike.description,
            hike.author
        ], async (err, rows) => {
            if (err) {
                reject(400);
                return;
            }
            else {
                resolve(201);
                return;
            }
        })
    })
}

exports.clearDatabase=async () =>{
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM Hikes'
        db.run(sql, [], async (err, rows) => {
            if(err)
                reject();
            else
                resolve();
        })
    })
 }

