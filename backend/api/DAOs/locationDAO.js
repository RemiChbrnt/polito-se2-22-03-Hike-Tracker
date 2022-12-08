'use strict';
const db = require('../../db/db');

exports.getHuts = async (query) => {
    return new Promise((resolve, reject) => {
        let sql1 =
            `SELECT * from Locations
            LEFT JOIN Huts ON Locations.id = Huts.locationId
            WHERE type="hut"`
        let filters = "";

        if (Object.entries(query).length !== 0)    //check if the query has any parameters
            filters = this.generateHutFilters(query);
        sql1 = sql1 + filters;
        db.all(sql1, [], async (err, rows) => {
            if (err) {
                console.log(err);
                reject(400);
                return;
            }
            else {
                const res = await Promise.all(
                    rows.map(async (r) => {
                        let photos = await setPhotos(r.id);
                        return {
                            id: r.id,
                            name: r.name,
                            type: r.type,
                            latitude: r.latitude,
                            longitude: r.longitude,
                            country: r.country,
                            province: r.province,
                            town: r.town,
                            address: r.address,
                            altitude: r.altitude,
                            author: r.author,
                            photos: photos
                        }
                    })
                )
                resolve(res);
            }
        })
    })
}



const setPhotos = async (id) => {
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
            else {
                const res = await Promise.all(
                    rows.map(async (r) => {
                        // console.log("fileName " + r.fileName);
                        return r.fileName;
                    }))
                resolve(res);
            }
        })
    })
}





exports.generateHutFilters = (query) => {
    let filters = " AND";
    if (query.name !== undefined) filters = filters + ` name LIKE '%${query.name}%' AND`
    if (query.latitude !== undefined) filters = filters + ` latitude = ${query.latitude} AND`
    if (query.longitude !== undefined) filters = filters + ` longitude = ${query.longitude} AND`
    if (query.country !== undefined) filters = filters + ` country = '${query.country}' AND`
    if (query.province !== undefined) filters = filters + ` province   = '${query.province}' AND`
    if (query.town !== undefined) filters = filters + ` town LIKE '%${query.town}%' AND`
    if (query.address !== undefined) filters = filters + ` address LIKE '%${query.address}%' AND`
    if (query.minAltitude !== undefined) filters = filters + ` altitude >= ${query.minAltitude} AND`
    if (query.maxAltitude !== undefined) filters = filters + ` altitude <= ${query.maxAltitude} AND`
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
        // const filters = this.generateFilters(query);
        // sql = sql + filters
        // console.log(sql)
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
                        province: r.province,
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
        const sql = 'INSERT INTO Locations(name, type, latitude, longitude, altitude, country, province, town, address, author) VALUES(?,?,?,?,?,?,?,?,?,?)';
        db.run(sql, [
            newLocation.name,
            newLocation.type,
            newLocation.latitude,
            newLocation.longitude,
            newLocation.altitude,
            newLocation.country,
            newLocation.province,
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
                if (newLocation.type === "hut")
                    addHut(this.lastID, newLocation.numberOfBeds, newLocation.food, newLocation.description)
                if (newLocation.type === "parkinglot")
                    addParking(this.lastID, newLocation.lotsNumber, newLocation.description)
                newLocation.id = this.lastID;
                resolve(newLocation);
                return;
            }
        })
    })
}


const addHut = async function (id, numberOfBeds, food, description) {
    return new Promise((resolve, reject) => {

        const sql2 = 'INSERT INTO Huts(locationId, numberOfBeds, food, description) VALUES (?,?,?,?)';
        db.run(sql2, [
            id,
            numberOfBeds,
            food,
            description
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
                        let photos = [];
                        const sql2 =
                            `SELECT fileName FROM Locations, HutsPhotos
                            WHERE Locations.id = HutsPhotos.hutId
                            AND type="hut" AND Locations.id = ?`
                        db.all(sql2, [r.id], async (err, rows) => {
                            if (err) {
                                reject();
                                return;
                            } else {
                                if (rows !== undefined && rows.length !== 0)
                                    rows.map((r) => {
                                        photos.push(r.fileName);
                                    })
                            }
                        })
                        return {
                            id: r.id,
                            name: r.name,
                            type: r.type,
                            latitude: r.latitude,
                            longitude: r.longitude,
                            country: r.country,
                            province: r.province,
                            town: r.town,
                            address: r.address,
                            altitude: r.altitude,
                            author: r.author,
                            photos: photos
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
                province: location.province,
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
                return;
            }

            resolve(201);
        })
    })
}