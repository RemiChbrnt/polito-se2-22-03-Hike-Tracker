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
        const sql1 = "DELETE FROM Users WHERE email!='maurizio.merluzzo@donkeykong.com' AND email!='antonio.fracassa@live.it' \
                        AND email != 'fiyode9163@eilnews.com' AND email != 'najejof113@dmonies.com' AND email != 'manager@management.com' AND email!='jen.shiro@chiocciola.it'"
        db.all(sql1, [], (err) => {
            if (err)
                reject(err);
            else {
                const sql2 = "DELETE FROM Preferences"
                db.all(sql2, [], (err) => {
                    if (err)
                        reject(err);
                    else {
                        const sql3 = "UPDATE Users SET verified = 1 WHERE (email = 'fiyode9163@eilnews.com' OR email = 'najejof113@dmonies.com')";
                        db.run(sql3, [], (err) => {
                            if (err)
                                reject(err);
                            else
                                resolve("Success");
                        })
                        /* resolve(true); */
                    }
                });
            }
        });

    })
}

const resetDeclinedUser1 = async function () {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Users VALUES (?,?,?,?,?,?,?,?)';
        const params = [
            "fiyode9163@eilnews.com",
            "Approval Needed",
            "cHaEM8Ym4Z/8hydZAJcBFX5TVfgT3MDw9ByMCSVy6lTV2nRMiB+CPVnHavcf0T3PzTgHWErkyQUQRXYuMyv3ul2ZFH/FmWbsfu9r+l+oKf/CeIzS//zzGAknEp+4ZJ3ySDRn7RBxhX/IvoabqgkEWJr4I227FGFozuU8Qr6LcKs=",
            "z0HTr4JT9KKIWzXVnL3zFpcetTrH4ScS",
            "guide",
            "1597536842",
            "NULL",
            "1"
        ]
        db.run(sql, params, (err) => {
            if (err)
                reject(err);
            else
                resolve(true);
        })
    })
}

const resetDeclinedUser2 = async function () {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Users VALUES (?,?,?,?,?,?,?,?)';
        const params = [
            "najejof113@dmonies.com",
            "Unapproved Hutworker",
            "Fp6qIsruB/E3d9g6OuUeUg+SlnYuaV01Epy4hxi3ayExXFxcJyuGF+ohTu8+/uAqw0LQTKqrql7Vc/eVoL9gzzPh3H14erZV3kefHPyjqHztbe269zMgYQcBN/Nn/2fPphe6+NKHklR13e2WdCddDKMwAImtppgUCRIAmH2jljE=",
            "M3+UyafDMR1pxCWSTmhfQFUedcZ8ZFRa",
            "hutworker",
            "369852147",
            "fd49d96d90ca033623e7b5214ec280c2",
            "1"
        ]
        db.run(sql, params, (err) => {
            if (err)
                reject(err);
            else{
                const sql = 'INSERT INTO HutWorkers VALUES (?,?)';
                db.run(sql, ["najejof113@dmonies.com", 1], (err) => {
                    if (err)
                        reject(err);
                    else
                     resolve(true);
                })
            }
        })
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
                    else {
                        resolve("Success");
                    }
                });
            }
        });

    })
}
module.exports = { resetHikes, resetUsers, resetLocations, resetDeclinedUser1, resetDeclinedUser2 }