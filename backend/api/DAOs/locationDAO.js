'use strict'
const db = require('../../db/db');

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
        const sql = 'DELETE FROM Locations WHERE id>2'
        db.run(sql, [], async (err, rows) => {
            if (err)
                reject();
            else {
                const sql = 'DELETE FROM ParkingLots WHERE locationId>2'
                db.run(sql, [], async (err, rows) => {
                    if (err)
                        reject();
                    else
                        resolve();
                })
            }
        })
    })
}