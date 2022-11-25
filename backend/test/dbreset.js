'use strict'

const db = require('../db/db');

const resetHikes = async function () {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM Hikes WHERE id > 1"
        db.all(sql, [], async (err, rows) => {
            if (err)
                reject(err);
            else{
                console.log("\n[...Hikes Reset Completed...]\n")
                resolve("Success");
            }            
        });
        
    })
}

const resetUsers = async function () {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM Users WHERE email!='maurizio.merluzzo@donkeykong.com' AND email!='antonio.fracassa@live.it'"
        db.all(sql, [], async (err, rows) => {
            if (err)
                reject(err);
                else {
                    const sql2 = "DELETE FROM Preferences"
                    db.all(sql2, [], async (err, rows) => {
                        if (err)
                            reject(err);
                        else {
                            console.log("\n[...Users+Preferences Reset Completed...]\n")
                            resolve("Success");
                        }
                    });
                }
        });

    })
}

const resetLocations = async function () {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM Locations WHERE id > 2"
        db.all(sql, [], async (err, rows) => {
            if (err)
                reject(err);
            else {
                const sql2 = "DELETE FROM ParkingLots"
                db.all(sql2, [], async (err, rows) => {
                    if (err)
                        reject(err);
                    else {
                        console.log("\n[...Locations+ParkingLots Reset Completed...]\n")
                        resolve("Success");
                    }
                });
            }
        });

    })
}
module.exports = { resetHikes, resetUsers, resetLocations }