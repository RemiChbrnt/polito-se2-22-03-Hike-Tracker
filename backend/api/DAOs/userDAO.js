'use strict'
const { Console } = require('console');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { resolve } = require('path');
const db = require('../../db/db');

exports.login = async (email, password) => {
    return new Promise((resolve, reject) => {
        const sql =
            `SELECT * FROM Users WHERE email = ?`;
        db.get(sql, [email], async (err, row) => {
            if (err) {
                reject(err);
            }
            else if (row === undefined) {
                resolve(401); // User not found
                return;
            }
            else {
                const user = {
                    email: row.email,
                    fullName: row.fullname,
                    role: row.role,
                    verified: row.verified
                }

                if (user.verified === 0) {
                    resolve(412);
                    return;
                } else if (user.role !== "hiker" && user.verified === 1) {
                    resolve(403);
                    return;
                }

                if (user.role === "hutworker") {
                    user.hut = await getHutId(email).catch((e) => reject(e));
                }

                /* User found. Now check whether the hash matches */
                crypto.scrypt(password, row.salt, 128, function (err, hashedPassword) {
                    if (err)
                        reject(err);

                    if (!crypto.timingSafeEqual(Buffer.from(row.password, 'base64'), Buffer.from(hashedPassword))) {
                        resolve(false); // Hash doesn't match, wrong password
                    }
                    else {
                        resolve(user);
                    }
                });
            }
        });
    });
}

const getHutId = async function (email) {
    return new Promise((res, rej) => {
        const sql1 = `SELECT locationId FROM HutWorkers WHERE email = ?`;
        db.get(sql1, [email], async (err, row) => {
            if (err) {
                console.log("errore " + err);
                rej(err);
            }
            else if (row === undefined) {
                res(null);
                return;
            }
            else {
                // user.hut = row.id;
                res(row.locationId);
            }
        })
    })
}


const generateHash = async function (password) { 
    let salt, hash;
    await new Promise((resolve, reject) => {
        crypto.randomBytes(24, async (err, buf) => {
            if (err)
                reject(err);

            salt = buf.toString("base64");
            resolve(salt);
        });
    }).then(async () =>
        await new Promise((resolve, reject) => {
            crypto.scrypt(password, salt, 128, function (err, hashedPassword) {
                if (err)
                    reject(err);

                hash = hashedPassword.toString("base64");
                resolve();
            })
        })

    );
    return [salt, hash];
}

exports.signup = async (email, fullName, password, role, phoneNumber, hut) => {
    let salt, hash, query;

    [salt, hash] = await generateHash(password); //to reduce complexity we have outsourced the hash generation
    return new Promise((resolve, reject) => {

        let randomString = crypto.randomBytes(16).toString('hex');
        query = `INSERT INTO Users VALUES(?, ?, ?, ?, ?, ?, ?, 0)`;
        db.run(query, [email, fullName, hash, salt, role, phoneNumber ? phoneNumber : null, randomString], (err) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                /* If the new user wants to be a hut worker, insert his data in the HutWorkers table */
                if (role === "hutworker") {
                    console.log('QUERY PARAMETERS: ' + email + ' - ' + hut);
                    query = 'INSERT INTO HutWorkers VALUES(?, ?)';
                    db.run(query, [email, hut], (err) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
                            sendEmail(email, randomString);
                            resolve({
                                email: email,
                                fullName: fullName,
                                role: role
                            });
                        }
                    })
                } else {
                    sendEmail(email, randomString);
                    resolve({
                        email: email,
                        fullName: fullName,
                        role: role
                    });
                }
            }

        });
    });
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

exports.checkUserVerification = async (email) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT role, verified FROM Users WHERE email=?'
        db.get(sql, [email], (err, row) => {
            if (err) {
                console.log('USER NOT VERIFIED IN MIDDLEWARE');
                reject(503);
            }
            else if (row === undefined)
                resolve({});
            else
                resolve(row);

        })
    })
};



exports.getPendingUsers = async () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM Users WHERE verified = 1 AND role <> "hiker"`
        db.all(sql, [], (err, rows) => {
            if (err)
                reject(503);
            else if (rows === undefined || rows.length === 0)
                resolve([]);
            else
                resolve(rows);
        })
    })
}


exports.approveUser = async (email) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE Users SET verified = 2 WHERE email = ?'
        db.run(sql, [email], function (err) {
            console.log('USER EMAIL: ' + email);
            console.log(this.changes);
            if (err)
                reject(503);
            else
                resolve(true);
        })
    })
}

exports.updatePreferences = async (email, ascent, duration) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE preferences SET ascent = ?, duration = ? WHERE email = ?';
        db.run(sql, [ascent, duration, email], (err) => {
            if (err) {
                reject(503);
                return;
            }
            const prefs = {
                "email": email,
                "ascent": ascent,
                "duration": duration
            }
            resolve(prefs);
        })
    })
}

exports.declineUser = async (email, role) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM Users WHERE email = ?'
        db.run(sql, [email], (err) => {
            if (err)
                reject(503);
            else {
                if (role === "hutworker") {
                    const sql = 'DELETE FROM HutWorkers WHERE email = ?'
                    db.run(sql, [email], (err) => {
                        if (err)
                            reject(503);
                        else
                            resolve(true);
                    });
                }
                else
                    resolve(true);
            }
        });
    })
}

exports.deletePreferences = async (email) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM preferences WHERE email = ?';
        db.run(sql, [email], (err) => {
            if (err) {
                reject(503);
                return;
            }
            resolve(true);
        })
    })
}



exports.verifyUser = async (email, randomString) => {
    return new Promise((resolve, reject) => {
        const sql1 = 'SELECT * FROM Users WHERE email=? AND randomString=?'
        db.get(sql1, [email, randomString], (err, row) => {
            if (err)
                reject(503);
            else if (row === undefined)
                resolve({});
            else {
                const sql2 = 'UPDATE Users SET verified=1 WHERE email=?'
                db.run(sql2, [email], (err) => {
                    if (err)
                        reject(503);
                    else
                        resolve({
                            email: row.email,
                            fullName: row.fullname,
                            role: row.role,
                            verified: row.verified
                        });
                    return;
                })
            }
            return;
        })
    })
};



const sendEmail = async (email, randomString) => {

    let transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "hiketrackerdemo@gmail.com",
            pass: "cqmuynmsufghnheh"
        }
    });

    let sender = "Hike Tracker";
    let mailOptions = {
        from: sender,
        to: email,
        subject: "Email Confirmation",
        html: `<span>Press <a href="http://localhost:3001/api/verify/${email}/${randomString}">here</a> to verify your email.</span>`
    };

    await transport.sendMail(mailOptions);

    return;

}