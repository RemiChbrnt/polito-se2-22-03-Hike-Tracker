'use strict'
const db = require('../../db/db');

exports.getHikes = async (query) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * from Hikes h';
        const filters = this.generateFilters(query);
        sql = sql + filters + " LIMIT 10 OFFSET ?";
        db.all(sql, [(query.page * 10)], async (err, rows) => {
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
                        photo: r.photo
                    }
                })
            )
            const hikes = this.filterByLocation(query, res)
            resolve(hikes)
        })
    })
}

exports.getCompletedHikes = async (email) => {
    return new Promise((resolve, reject) => {
        let sql1 = 'SELECT groupId FROM Participants p WHERE hikerId=?'

        db.all(sql1, [email], async (err, rows) => {
            if (err) {
                console.log("err" + err)
                reject()
                return
            } else if (rows.length > 0) {
                var groupIdArray = [];
                for (let i = 0; i < rows.length; i++) {
                    groupIdArray.push(rows[i].groupId.toString());
                }
                var ids = groupIdArray.map(function (a) { return "'" + a.replace("'", "''") + "'"; }).join();;
                let sql2 = 'SELECT hikeId FROM HikesHistory p WHERE status="completed" AND groupId IN (' + ids + ')'
                db.all(sql2, async (err, rows) => {
                    if (err) {
                        console.log("err" + err)
                        reject()
                        return
                    } else if (rows.length > 0) {
                        var hikesIdArray = [];
                        for (let i = 0; i < rows.length; i++) {
                            hikesIdArray.push(rows[i].hikeId.toString());
                        }
                        var ids = hikesIdArray.map(function (a) { return "'" + a.replace("'", "''") + "'"; }).join();;
                        let sql3 = 'SELECT * FROM Hikes p WHERE id IN (' + ids + ')'
                        db.all(sql3, async (err, rows) => {
                            if (err) {
                                console.log("err" + err)
                                reject()
                                return
                            } else if (rows.length > 0) {
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
                                resolve(res);
                            }
                        })
                    }
                })
            }
        })
    })
}

exports.getHikesCount = async (query) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT COUNT(Hikes.id) AS count FROM Hikes ';
        const filters = this.generateFilters(query);

        if (query.country !== undefined || query.region !== undefined || query.town !== undefined)
            sql = sql + "JOIN Locations ON Hikes.startPt = Locations.id";

        (filters !== "") ? sql += filters + " AND " : sql += " WHERE ";

        if (query.country !== undefined) sql = sql + ` Locations.country = "${query.country}" COLLATE NOCASE AND `
        if (query.region !== undefined) sql = sql + ` Locations.region = "${query.region}" COLLATE NOCASE AND `
        if (query.town !== undefined) sql = sql + ` Locations.town = "${query.town}" COLLATE NOCASE AND `

        sql = sql + " 1"

        db.get(sql, [], async (err, row) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else
                resolve(row.count);
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

/**
 * Function to start a new hike. The function creates an entry in the HikesHistory table with the specified group ID and hike ID. The status of
 * the hike is set to 'ongoing', as the function is intended to be used to signal that the hike is currently being performed. The checkPoints field
 * is initially set to NULL, and it will be filled with a stringified JSON object containing the sequence of reached checkpoints.
 * @param {*} groupId - The ID of the group
 * @param {*} hikeId - The ID of the hike
 * @returns a Promise that resolves to true if the insertion is successful, to 404 if the user is currently performing a different hike, and to 503 otherwise
 */

exports.startHike = async (groupId, hikeId, userId) => {
    return new Promise((resolve, reject) => {
        const sql1 = 'SELECT * FROM HikesHistory WHERE groupId = ? AND status = "ongoing"';
        db.all(sql1, [groupId], function (err, rows) {
            if (err) {
                console.log(err);
                reject(503);
            } else if (rows.length !== 0) {
                reject(404);
            } else {
                const sql2 = 'INSERT INTO HikesHistory (hikeId, status, checkPoints) VALUES (?, "ongoing", NULL)';
                db.run(sql2, [hikeId], function (err) {
                    if (err) {
                        console.log(err);
                        reject(503);
                    }
                    else {
                        {
                            const sql2 = 'INSERT INTO Participants(groupId, hikerId) VALUES(?,?)';
                            db.run(sql2, [this.lastID, userId], function (err) {
                                if (err) {
                                    reject(503);
                                } else {
                                    resolve(true);
                                }
                            })
                        }
                    }
                })
            }
        })
    })
}

/**
 * Function to terminate a hike. The function sets the status field to 'completed' in the HikesHistory entry having the specified group ID and 
 * hike ID.
 * @param {*} groupId - The ID of the group
 * @param {*} hikeId - The ID of the hike
 * @param {*} userId - The ID of the current user
 * @returns a Promise that resolves to true if the update is successful, that rejects to 403 if the current user is not part of the hike, to
*           404 if the hike is not found in the HikesHistory table (i.e. if there is no record of the user currently performing the hike), to
            400 if the hike is not currently ongoing, and to 503 otherwise
 */
exports.terminateHike = async (groupId, hikeId, userId) => {
    return new Promise((resolve, reject) => {
        const sql1 = 'SELECT * FROM Participants WHERE groupId = ? AND hikerId = ?';
        db.all(sql1, [groupId, userId], (err, rows) => {
            if (err) {
                reject(503);
            } else if (rows.length === 0) {
                /* User is not performing the selected Hike, cannot terminate it */
                reject(403);
            } else {
                const sql2 = 'SELECT * FROM HikesHistory WHERE groupId = ? AND hikeId = ?';
                db.all(sql2, [groupId, hikeId], (err, rows) => {
                    if (err) {
                        reject(503);
                    } else if (rows.length === 0) {
                        reject(404);
                    } else if (rows[0].status !== "ongoing") {
                        reject(400);
                    } else {
                        const sql3 = 'UPDATE HikesHistory SET status = "completed" WHERE groupId = ? AND hikeId = ?';
                        db.run(sql3, [groupId, hikeId], (err) => {
                            if (err) {
                                reject(503);
                            } else if (this.changes === 0) {
                                reject(404); // Hike already completed
                            } else {
                                resolve(true);
                            }
                        })
                    }
                })
            }
        })
    })
}

/* TODO: finish */
exports.getCurrentGroupId = async (hikerId) => {
    return new Promise((resolve, reject) => {
        const sql1 =
            `SELECT p.groupId, h.hikeId FROM Participants p, HikesHistory h
            WHERE p.hikerId = ? AND h.status = "ongoing"
            ORDER BY p.groupId DESC`;
        db.all(sql1, [hikerId], (err, rows) => {
            if (err) {
                reject(503);
            } else if (rows.length === 0) {
                resolve(false); // User not in any group
            } else
                resolve(rows[0]);
        })
    })
}