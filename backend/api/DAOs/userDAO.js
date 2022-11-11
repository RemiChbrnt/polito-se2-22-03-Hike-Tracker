'use strict'
const sqlite = require('sqlite3')
const crypto = require('crypto');
const dbPath = "./db/HikeTrackerDb.db"
const db = new sqlite.Database(dbPath, (err) => {

    if (err) throw err
    db.run("PRAGMA foreign_keys = ON");

})

exports.login = async (email, password) => {
    return new Promise((resolve, reject) => {
        console.log("a " + email);
        const sql = `SELECT * FROM Users WHERE email = ?`;
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
                    fullName: row.fullname
                }


            /* User found. Now check whether the hash matches */
            crypto.scrypt(password, row.salt, 128, function (err, hashedPassword) {
                if (err)
                    reject(err);                    

                if (!crypto.timingSafeEqual(Buffer.from(row.password, 'base64'), Buffer.from(hashedPassword))){
                    console.log("Login failed - Wrong password");
                    resolve(false); // Hash doesn't match, wrong password
                }
                else
                    {
                        console.log("Login successful");
                        resolve(user);
                    }
            });
            }
        });
    });
}




exports.signup = async (email, fullName, password, role, phoneNumber) => {


    return new Promise((resolve, reject) => {
        const sql = "";
        let salt = crypto.randomBytes(32).toString('base64');
        const hash = crypto.pbkdf2(password, salt, 10000);

        if (phoneNumber !== undefined) {
            sql = `INSERT INTO user VALUES(?, ?, ?, ?, ?, ?)`;
            db.run(query, [email, fullName, hash, salt, role, phoneNumber], (err, row) => {
                if (err)
                    reject(false);
                else {
                    const user = {
                        id: row.id,
                        email: row.email,
                        fullname: row.fullName
                    }

                    resolve(user);

                }
            });
        }
        else {
            sql = `INSERT INTO user VALUES(?, ?, ?, ?, ?, NULL)`;

            db.run(query, [email, fullName, hash, salt, role], (err, row) => {
                if (err)
                    reject(false);
                else {
                    const user = {
                        id: row.id,
                        email: row.email,
                        fullname: row.fullName
                    }

                    resolve(user);
                }
            });
        }
    });
}















exports.getSKUItems = async () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * from SKU_ITEM'
        db.all(sql, [], async (err, rows) => {
            if (err) {
                reject(503)
                return
            }
            let list = rows.map((r) => {
                return {
                    RFID: r.RFID,
                    SKUId: r.SKU_Id,
                    Avaiable: r.avaiable,
                    DateOfStock: r.dateOfStock,
                }
            })
            resolve(list)
        })
    })
}

exports.getSKUItemsById = async (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * from SKU_ITEM WHERE SKU_Id=? and avaiable=1'
        db.all(sql, [id], async (err, rows) => {
            if (err) {
                reject(503)
                return
            }
            if (rows.length == 0) {
                const check = await SkuDao.idExists(id).catch(() => reject(500));
                if (!check) {
                    reject(404)
                    return
                }
            }
            let list = rows.map((r) => {
                return {
                    RFID: r.RFID,
                    SKUId: r.SKU_Id,
                    Avaiable: r.avaiable,
                    DateOfStock: r.dateOfStock,
                }
            })
            resolve(list)
        })
    })
}

exports.getSKUItemsByRfid = async (rfid) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * from SKU_ITEM WHERE RFID=?'
        db.get(sql, [rfid], async (err, r) => {
            if (err) {
                reject(503)
                return
            }
            if (r === undefined) {
                reject(404)
                return
            }
            let res = {
                RFID: r.RFID,
                SKUId: r.SKU_Id,
                Avaiable: r.avaiable,
                DateOfStock: r.dateOfStock,
            }
            resolve(res)
        })
    })
}

exports.createSKUItem = async (RFID, SKUId, DateOfStock) => {
    return new Promise(async (resolve, reject) => {
        const check = await SkuDao.idExists(SKUId).catch(() => reject(503));
        if (!check) {
            reject(404)
            return
        }
        const sql =
            'INSERT INTO SKU_ITEM (RFID, avaiable, SKU_Id, dateOfStock) VALUES (?,0,?,?)'
        db.get(sql, [RFID, SKUId, DateOfStock], async (err, r) => {
            if (err) {

                reject(503)
                return
            }
            resolve(true)
        })
    })
}

exports.editSKUItem = async (oldRFID, RFID, Avaiable, DateOfStock) => {
    return new Promise(async (resolve, reject) => {
        const check = await this.rfidExists(oldRFID).catch(() => reject(503))
        if (!check) {
            reject('id not found')
            return
        }
        const sql =
            'UPDATE SKU_ITEM SET RFID=?, avaiable=?,  dateOfStock=? WHERE RFID=?'
        db.get(
            sql,
            [RFID, Avaiable, DateOfStock, oldRFID],
            async (err, r) => {
                if (err) {

                    reject(503)
                    return
                }
                resolve(true)
            }
        )
    })
}

exports.rfidExists = async (rfid) => {
    return new Promise(async (resolve, reject) => {
        const sql = 'SELECT RFID FROM SKU_ITEM WHERE RFID=?'
        db.get(sql, [rfid], async (err, rows) => {
            if (err) {
                reject(false)
                return
            } else {
                if (rows === undefined) resolve(false)
                else resolve(true)
            }
        })
    })
}

exports.deleteSKUItem = async (rfid) => {
    return new Promise(async (resolve, reject) => {
        const check = await this.rfidExists(rfid).catch(() => reject(503))
        if (!check) {
            reject('id not found')
            return
        }
        const sql = 'DELETE FROM SKU_ITEM WHERE RFID=?'
        db.all(sql, [rfid], (err, rows) => {
            if (err) {
                reject(err)
                return
            }
            resolve(true)
        })
    })
}


// module.exports = { login, signup }