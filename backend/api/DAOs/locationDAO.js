'use strict'
const sqlite = require('sqlite3')
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
        ], async function (err){
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
                ], async function (err){
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

exports.addHut = async (newHut) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Locations(name, type, latitude, longitude, altitude, country, province, town, address) VALUES(?,"hut",?,?,?,?,?,?,?)';
        db.run(sql, [
            newHut.title,
            newHut.latitude,
            newHut.longitude,
            newHut.altitude,
            newHut.country,
            newHut.province,
            newHut.town,
            newHut.address
        ], async function (err) {
            if(err){
                console.log(err);
                reject(400);
                return;
            }
            else {

                const lastLocationID = this.lastID;
                const sql2 = 'INSERT INTO Huts(locationId, numberOfBeds, food, description) VALUES (?,?,?,?)';
                db.run(sql2, [
                    lastLocationID,
                    newHut.beds,
                    newHut.food,
                    newHut.description
                ], async function(err) {
                    if(err){
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
