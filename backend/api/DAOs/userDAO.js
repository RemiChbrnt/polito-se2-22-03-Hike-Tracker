'use strict'
const crypto = require('crypto');
const db = require('../../db/db');

exports.login = async (email, password) => {
    return new Promise((resolve, reject) => {
        const sql =
            `SELECT * FROM Users WHERE email = ?`;
        db.get(sql, [email], (err, row) => {
            if (err) {
                console.log("errore " + err);
                reject(err);
            }
            else if (row === undefined)
                resolve(false); // User not found
            else {
                const user = {
                    // id: row.rowid,
                    email: row.email,
                    fullName: row.fullname,
                    role: row.role
                }


                /* User found. Now check whether the hash matches */
                crypto.scrypt(password, row.salt, 128, function (err, hashedPassword) {
                    if (err)
                        reject(err);

                    if (!crypto.timingSafeEqual(Buffer.from(row.password, 'base64'), Buffer.from(hashedPassword))) {
                        console.log("Login failed - Wrong password");
                        resolve(false); // Hash doesn't match, wrong password
                    }
                    else {
                        console.log("Login successful");
                        resolve(user);
                    }
                });
            }
        });
    });
}




exports.signup = async (email, fullName, password, role, phoneNumber) => {
    let salt, hash, query;

    return new Promise((resolve, reject) => {
        crypto.randomBytes(24, async (err, buf) => {
            if (err) reject(err);

            salt = buf.toString("base64");
            resolve(salt);
        })
    }).then(() => new Promise((resolve, reject) => {

        crypto.scrypt(password, salt, 128, function (err, hashedPassword) {
            if (err) reject(err);

            hash = hashedPassword.toString("base64");
            resolve(hash);
        })
    })).then(() => new Promise((resolve, reject) => {

        if (phoneNumber !== undefined) {

            query = `INSERT INTO Users VALUES(?, ?, ?, ?, ?, ?)`;
            db.run(query, [email, fullName, hash, salt, role, phoneNumber], (err) => {
                // let query = `INSERT INTO Users VALUES(?, ?, ?, ?, ?)`;
                // db.run(query, [email, fullName, hash, salt, role], (err) => {
                if (err)
                    reject(err);
                else
                    resolve(true);

            });
        }
        else {
            query = `INSERT INTO Users VALUES(?, ?, ?, ?, ?, NULL)`;
            // let query = `INSERT INTO Users VALUES(?, ?, ?, ?, ?)`;
            db.run(query, [email, fullName, hash, salt, role, phoneNumber], (err) => {
                if (err)
                    reject(err);
                else {
                    const user = {
                        email: email,
                        fullName: fullname,
                        role: role
                    }

                    resolve(user);
                }
            });
        }
    }));

}


exports.createPreferences = async (email, ascent, duration) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Preferences (email, duration, ascent) VALUES (?,?,?)'
        db.run(sql, [email, duration, ascent], async (err, rows) => {
            if (err) {
                reject(503)
                return
            }
            const prefs = {
                "email": email,
                "ascent": ascent,
                "duration": duration,
            }
            resolve(prefs)
        })
    })
}

exports.getPreferences = async (email) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Preferences WHERE email=?'
        db.get(sql, [email], async (err, row) => {
            if (err) {
                reject(503)
                return
            }
            if (row === undefined) {
                resolve({})
                return
            }
            const prefs = {
                "email": row.email,
                "ascent": row.ascent,
                "duration": row.duration,
            }
            resolve(prefs)
        })
    })
}






exports.clearDatabase = async () => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM Users where email != "maurizio.merluzzo@donkeykong.com"'
        db.run(sql, [], async (err, rows) => {
            if (err) console.log(err)
            if (err)
                reject();
            else {
                const sql1 = 'DELETE FROM Preferences'
                db.run(sql1, [], async (err, rows) => {
                    if (err) console.log(err)
                    if (err)
                        reject();
                    else {
                        resolve();
                    }
                })
            }
        })
    })
}

