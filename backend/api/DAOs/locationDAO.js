'use strict';
const db = require('../../db/db');

exports.getHuts = async (query) => {
    return new Promise((resolve, reject) => {
        let sql =
            `SELECT * from Locations
            LEFT JOIN Huts ON Locations.id = Huts.locationId
            WHERE type="hut"`
        let filters = "";

        if (Object.entries(query).length !== 0)    //check if the query has any parameters
            filters = this.generateHutFilters(query);
        sql = sql + filters;
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

exports.generateHutFilters = (query) => {
    let filters = " AND";
    if (query.name !== undefined) filters = filters + ` name LIKE '%${query.name}%' AND`
    if (query.latitude !== undefined) filters = filters + ` latitude = ${query.latitude} AND`
    if (query.longitude !== undefined) filters = filters + ` longitude = ${query.longitude} AND`
    if (query.country !== undefined) filters = filters + ` country = '${query.country}' AND`
    if (query.province !== undefined) filters = filters + ` province   = '${query.province}' AND`
    if (query.town !== undefined) filters = filters + ` town LIKE '%${query.town}%' AND`
    if (query.address !== undefined) filters = filters + ` address LIKE '%${query.address}%' AND`
    if (query.altitude !== undefined) filters = filters + ` altitude = ${query.altitude} AND`
    filters = filters + " 1"
    return filters;
}



exports.getHutsAndParkingLots = async () => {
    return new Promise((resolve, reject) => {
        let sql =
            `SELECT * from Locations            
            WHERE type="hut" OR type="parkinglot"`

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


exports.addHut = async (newHut) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Locations(name, type, latitude, longitude, altitude, country, province, town, address) VALUES(?,"hut",?,?,?,?,?,?,?)';
        db.run(sql, [
            newHut.name,
            newHut.latitude,
            newHut.longitude,
            newHut.altitude,
            newHut.country,
            newHut.province,
            newHut.town,
            newHut.address
        ], async function (err) {
            if (err) {
                console.log(err);
                reject(400);
                return;
            }
            else {

                const lastLocationID = this.lastID;
                const sql2 = 'INSERT INTO Huts(locationId, numberOfBeds, food, description) VALUES (?,?,?,?)';
                db.run(sql2, [
                    lastLocationID,
                    newHut.numberOfBeds,
                    newHut.food,
                    newHut.description
                ], async function (err) {
                    if (err) {
                        console.log(err);
                        // Revert to keep database coherent          
                        db.run('DELETE FROM Locations WHERE id = ?', [lastLocationID]);
                        reject(400);
                        return;
                    } else {
                        resolve(201);
                        return;
                    }
                })
            }
        })
    })
}




exports.addParking = async (newParking) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Locations(name, type, latitude, longitude, altitude, country, province, town, address) VALUES(?,"parkinglot",?,?,?,?,?,?,?)';
        db.run(sql, [
            newParking.name,
            newParking.latitude,
            newParking.longitude,
            newParking.altitude,
            newParking.country,
            newParking.province,
            newParking.town,
            newParking.address
        ], async function (err) {
            if (err) {
                console.log(err);
                reject(400);
                return;
            }
            else {
                const sql2 = 'INSERT INTO ParkingLots(locationID, description, lotsNumber) VALUES(?,?,?)';
                db.run(sql2, [
                    this.lastID,
                    newParking.description,
                    newParking.lotsNumber
                ], async function (err) {
                    if (err) {
                        //revert in case of error
                        db.run('DELETE FROM Locations WHERE id=?', [this.lastID]);
                        reject(400);
                        return;
                    }
                    else {
                        resolve(201);
                        return;
                    }
                })
            }
        })
    })
}







exports.clearDatabase = async () => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM Huts'
        db.run(sql, [], async (err) => {
            if (err)
                reject();
            else
                resolve();
        })
    }).then(() => {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM ParkingLots'
            db.run(sql, [], async (err) => {
                if (err)
                    reject();
                else
                    resolve();
            })
        })
    }).then(() => {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM Locations WHERE id != 1 AND id != 2'
            db.run(sql, [], async (err) => {
                if (err)
                    reject();
                else
                    resolve();
            })
        })
    })
}
