'use strict';
const db = require('../../db/db');

/*
getHutsByUserId refers to local guides
getHutbyWorkerId to workers intead
*/

exports.getHuts = async (query) => {
    return new Promise((resolve, reject) => {
        let sql =
            `SELECT Locations.id, Locations.name, Locations.type, Locations.latitude, Locations.longitude, Locations.country, Locations.region, Locations.town, Locations.address, Locations.altitude, Locations.author, Huts.numberOfBeds, Huts.food, Huts.description, Huts.openingTime, Huts.closingTime, Huts.cost, Huts.phone, Huts.email, Huts.website, HutsPhotos.fileName
            FROM Locations LEFT JOIN Huts ON Locations.id = Huts.locationId
            LEFT JOIN HutsPhotos ON Locations.id = HutsPhotos.hutId            
            WHERE type="hut"`

            //remove this comment when merging: if we don't list all fields we end up with duplicates like [id, locationId, id, hutId]

        let filters = "";

        if (Object.entries(query).length !== 0)    //check if the query has any parameters
            filters = this.generateHutFilters(query);
        sql = sql + filters;
        if(query.page !== undefined)
        sql =`${sql} GROUP BY Locations.id LIMIT 10 OFFSET ${query.page*10}`;
        db.all(sql, [], async (err, rows) => {
            if (err) {
                console.log(err);
                reject(400);
                return;
            }
            resolve(rows);
        })
    })
}


exports.getHutsCount = async (query) => {
    return new Promise((resolve, reject) => {
        let filters = "";
        let sql = 'SELECT COUNT(id) AS count FROM Locations WHERE type="hut"'
        if (Object.entries(query).length !== 0)
            filters = this.generateHutFilters(query);
        sql = sql + filters;
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



exports.getHutById = async (id) => {
    return new Promise((resolve, reject) => {
        let sql =
            `SELECT * from Locations
            LEFT JOIN Huts ON Locations.id = Huts.locationId
            WHERE type="hut" AND id = ?`

        db.get(sql, [id], async (err, row) => {
            if (err) {
                console.log(err);
                reject(400);
                return;
            } else if (row === undefined)
                reject(400);
            else {
                let photos = await getHutPhotos(row.id);
                row.photos = photos;
                resolve(row);
            }
        })
    })
}



const getHutPhotos = async (id) => {
    return new Promise((resolve, reject) => {
        const sql =
            `SELECT fileName FROM HutsPhotos        
            WHERE hutId = ?`
        db.all(sql, [id], async (err, rows) => {
            if (err) {
                console.log("err" + err)
                reject();
                return;
            } else if (rows === undefined || rows.length === 0)
                resolve();
            else
                resolve(rows);

        })
    })
}





exports.generateHutFilters = (query) => {
    let filters = " AND";
    if (query.name !== undefined) filters = filters + ` name LIKE '%${query.name}%' AND`
    if (query.latitude !== undefined) filters = filters + ` latitude = ${query.latitude} AND`
    if (query.longitude !== undefined) filters = filters + ` longitude = ${query.longitude} AND`
    if (query.country !== undefined) filters = filters + ` country = '${query.country}'COLLATE NOCASE AND`
    if (query.region !== undefined) filters = filters + ` region = '${query.region}' COLLATE NOCASE AND`
    if (query.town !== undefined) filters = filters + ` town LIKE '%${query.town}%' AND`
    if (query.address !== undefined) filters = filters + ` address LIKE '%${query.address}%' AND`
    if (query.latitude !== undefined) filters = filters + ` latitude >= ${query.latitude - 10} AND latitude <= ${query.latitude + 10} AND`
    if (query.longitude !== undefined) filters = filters + ` longitude >= ${query.longitude - 10} AND longitude <= ${query.longitude + 10} AND`
    if (query.minAltitude !== undefined) filters = filters + ` altitude >= ${query.minAltitude} AND`
    if (query.maxAltitude !== undefined) filters = filters + ` altitude <= ${query.maxAltitude} AND`
    if (query.food !== undefined) filters = filters + ` food = '${query.food}' AND`
    if (query.minNumberOfBeds !== undefined) filters = filters + ` numberOfBeds >= ${query.minNumberOfBeds} AND`
    if (query.maxNumberOfBeds !== undefined) filters = filters + ` numberOfBeds <= ${query.maxNumberOfBeds} AND`
    filters = filters + " 1"
    return filters;
}

exports.getHutsAndParkingLots = async (email) => {
    return new Promise((resolve, reject) => {
        let sql =
            `SELECT * from Locations            
            WHERE (type="hut" OR type="parkinglot") AND author=?`

        db.all(sql, [email], async (err, rows) => {
            if (err) {
                console.log(err);
                reject(400);
                return;
            }

            resolve(rows);
        })
    })
}

exports.getLocations = async (query) => {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT * from Locations'
        db.all(sql, [], async (err, rows) => {
            if (err) {
                console.log("err" + err)
                reject()
                return
            }
            const res = await Promise.all(
                rows.map(async (r) => {
                    return {
                        id: r.id,
                        name: r.name,
                        type: r.type,
                        latitude: r.latitude,
                        longitude: r.longitude,
                        country: r.country,
                        region: r.region,
                        town: r.town,
                        address: r.address,
                        altitude: r.altitude,
                        author: r.author
                    }
                })
            )
            resolve(res);
        })
    })
}


exports.addLocation = async (newLocation, email) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Locations(name, type, latitude, longitude, altitude, country, region, town, address, author) VALUES(?,?,?,?,?,?,?,?,?,?)';
        db.run(sql, [
            newLocation.name,
            newLocation.type,
            newLocation.latitude,
            newLocation.longitude,
            newLocation.altitude,
            newLocation.country,
            newLocation.region,
            newLocation.town,
            newLocation.address,
            email
        ], async function (err) {
            if (err) {
                console.log(err);
                reject(400);
                return;
            }
            else {
                try {
                    if (newLocation.type === "hut")
                        await addHut(this.lastID, newLocation.numberOfBeds, newLocation.food, newLocation.description, newLocation.phone, newLocation.email, newLocation.website)
                    if (newLocation.type === "parkinglot")
                        await addParking(this.lastID, newLocation.lotsNumber, newLocation.description)
                } catch (e) {
                    console.log(e);
                    reject(404);
                }
                newLocation.id = this.lastID;
                resolve(newLocation);
                return;
            }
        })
    })
}


const addHut = async function (id, numberOfBeds, food, description, phone, email, website) {
    return new Promise((resolve, reject) => {

        const sql2 = 'INSERT INTO Huts(locationId, numberOfBeds, food, description, phone, email, website) VALUES (?,?,?,?,?,?,?)';
        db.run(sql2, [
            id,
            numberOfBeds,
            food,
            description,
            phone,
            email,
            website
        ], async function (err) {
            if (err) {
                console.log(err);
                // Revert to keep database coherent          
                db.run('DELETE FROM Locations WHERE id = ?', [id]);
                reject(400);
                return;
            } else {
                resolve(201);
                return;
            }
        })
    })
}




const addParking = async function (id, lotsNumber, description) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO ParkingLots(locationID, description, lotsNumber) VALUES(?,?,?)';
        db.run(sql, [
            id,
            description,
            lotsNumber
        ], async function (err) {
            if (err) {
                //revert in case of error
                db.run('DELETE FROM Locations WHERE id=?', [id]);
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


exports.getHutsByUserId = async (email) => {
    return new Promise((resolve, reject) => {
        const sql1 =
            `SELECT * FROM Locations
             LEFT JOIN Huts ON Locations.id = Huts.locationId             
             WHERE type="hut" AND author=?`
        db.all(sql1, [email], async (err, rows) => {
            if (err) {
                reject();
                return;
            } else if (rows === undefined) { resolve(false); }
            else {
                const res = await Promise.all(
                    rows.map(async (r) => {
                        return {
                            id: r.id,
                            name: r.name,
                            type: r.type,
                            latitude: r.latitude,
                            longitude: r.longitude,
                            country: r.country,
                            region: r.region,
                            town: r.town,
                            address: r.address,
                            altitude: r.altitude,
                            author: r.author,
                            food: r.food,
                            description: r.description,
                            openingTime: r.openingTime,
                            closingTime: r.closingTime,
                            cost: r.cost
                        }
                    })
                )
                resolve(res);
            }
        })
    })
}

exports.linkHut = async (hikeId, locationId) => {
    return new Promise((resolve, reject) => {
        const sql1 = 'SELECT * FROM HikesHaveHuts WHERE hikeId=? AND locationId=?';
        db.all(sql1, [hikeId, locationId], function (err, rows) {
            if (err) {
                reject(err);
                return;
            } else if (rows.length === 0) {
                const sql2 = 'INSERT INTO HikesHaveHuts(hikeId, locationId) VALUES(?,?)';
                db.run(sql2, [hikeId, locationId], function (err, rows) {
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
            } else if (rows.length !== 0) {
                reject(415);
                return;
            }
        })
    })
}


exports.validateLinkStartEnd = async (hikeId, locationId) => {
    return new Promise((resolve, reject) => {
        const sql1 = 'SELECT startPt, endPt FROM Hikes WHERE id=?';
        db.get(sql1, [hikeId], async function (err, row) {
            if (err) {
                reject(err);
                return;
            } else {
                let l1 = await _getLocationById(row.startPt);
                let l2 = await _getLocationById(row.endPt);
                const sql2 = 'SELECT * FROM Locations WHERE id=?';
                db.get(sql2, [locationId], function (err, hutLocation) {
                    if (err) {
                        reject(err);
                        return;
                    } else {
                        if (checkDistance(hutLocation.latitude, hutLocation.longitude, l1.latitude, l1.longitude, 5) ||
                            checkDistance(hutLocation.latitude, hutLocation.longitude, l2.latitude, l2.longitude, 5))
                            resolve(true)
                        else
                            resolve(false)
                    }
                })
            }
        })
    })
}


exports.validateLinkRef = async (hikeId, locationId) => {
    return new Promise((resolve, reject) => {
        const sql1 = 'SELECT * FROM Locations WHERE id IN ( SELECT locationId FROM HikesReferencePoints WHERE hikeId=?)';
        db.all(sql1, [hikeId], async function (err, refPoints) {
            if (err) {
                reject(err);
                return;
            } else {
                const sql2 = 'SELECT * FROM Locations WHERE id=?';
                db.get(sql2, [locationId], function (err, hutLocation) {
                    if (err) {
                        reject(err);
                        return;
                    } else {
                        let success = true;
                        refPoints.forEach((refPoint) => {
                            if (!checkDistance(hutLocation.latitude, hutLocation.longitude, refPoint.latitude, refPoint.longitude, 5))
                                success = false;
                        })
                        resolve(success);
                    }
                })
            }
        })
    })
}

exports.getHutbyWorkerId = async (email) => {
    return new Promise((resolve, reject) => {
        let sql =
            `SELECT l.id FROM Locations l, HutWorkers h          
            WHERE l.type="hut" AND l.id=h.locationId AND email=?`

        db.get(sql, [email], async (err, row) => {
            if (err) {
                console.log(err);
                reject(400);
                return;
            }
            if (row === undefined) {
                reject(404);
                return;
            } else {
                resolve(row.id);
            }
        })
    })
}


exports.getReferencePointsFromHikeId = async (query) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * from HikesReferencePoints WHERE hikeId=${query.id}`
        db.all(sql, [], async (err, rows) => {
            if (err) {
                console.log("err" + err)
                reject()
                return
            }
            const res = await Promise.all(
                rows.map(async (r) => {
                    const location = await _getLocationById(r.locationId);
                    return {
                        location: location
                    }
                })
            )
            resolve(res);
        })
    })
}

const _getLocationById = async function (id) {
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




exports.getLocationById = async (query) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * from Locations WHERE id=${query.id}`
        db.all(sql, [], async (err, r) => {
            if (err) {
                console.log("err" + err)
                reject()
                return
            }
            const location = r[0];
            resolve({
                id: location.id,
                name: location.name,
                type: location.type,
                latitude: location.latitude,
                longitude: location.longitude,
                difficulty: location.difficulty,
                country: location.country,
                region: location.region,
                town: location.town,
                address: location.address,
                altitude: location.altitude,
                author: location.author
            });
        })
    })
}



exports.addHutPhoto = async (id, photo) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO HutsPhotos(hutId, fileName) VALUES(?,?)`
        db.run(sql, [id, photo], async (err) => {
            if (err) {
                console.log(err);
                reject(400);
            } else
                resolve(201);
        })
    })
}


const checkDistance = function (lat1, lon1, lat2, lon2, radius) {
    const φ1 = lat1 * Math.PI / 180, φ2 = lat2 * Math.PI / 180, Δλ = (lon2 - lon1) * Math.PI / 180, R = 6371e3;
    const d = Math.acos(Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ)) * R / 1000;
    return d <= radius;
}