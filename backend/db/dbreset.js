'use strict'

const db = require('../db/db');

const resetHikes = async function () {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM Hikes WHERE id > 1"
        db.all(sql, [], async (err) => {
            if (err)
                reject(err);
            else
                resolve("Success");
        });

    })
}

const resetUsers = async function () {
    return new Promise((resolve, reject) => {
        const sql1 = "DELETE FROM Users WHERE email!='maurizio.merluzzo@donkeykong.com' AND email!='antonio.fracassa@live.it'"
        db.all(sql1, [], async (err) => {
            if (err)
                reject(err);
            else {
                const sql2 = "DELETE FROM Preferences"
                db.all(sql2, [], async (err) => {
                    if (err)
                        reject(err);
                    else
                        resolve("Success");
                });
            }
        });

    })
}

const resetLocations = async function () {
    return new Promise((resolve, reject) => {
        const sql1 = "DELETE FROM Locations WHERE id > 2"
        db.all(sql1, [], async (err) => {
            if (err)
                reject(err);
            else {
                const sql2 = "DELETE FROM ParkingLots"
                db.all(sql2, [], async (err) => {
                    if (err)
                        reject(err);
                    else
                        resolve("Success");

                });
            }
        });

    })
}
module.exports = { resetHikes, resetUsers, resetLocations }