'use strict';
const sqlite = require('sqlite3');
const dbPath = require('../../index').databasePath;
const db = new sqlite.Database(dbPath, (err) => {
    if (err) throw err
    db.run("PRAGMA foreign_keys = ON")
});

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