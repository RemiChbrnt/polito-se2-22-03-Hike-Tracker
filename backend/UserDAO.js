const sqlite = require('sqlite3');
const crypto = require('crypto');

const db = new sqlite.Database('database.db', (err) => {
    if(err)
        throw err;
});

/* Get user by username (mail) and password */
function getUser(username, password) {
    return new Promise((resolve, reject) => {
        /* First we only look for a match on the username, since
         * we can't use the password for the match. We will then
         * match the hash of the user to the hash of the password
         *  */
        const query = 'SELECT * FROM users WHERE email = ?';
        db.get(query, [username], (err, row) => {
            if(err)
                reject(err);
            else if(row === undefined) {
                resolve(false); // User not found
            }
            else {
                const user = {
                    id : row.id,
                    username : row.email,
                    name : row.name
                }

                /* User found. Now check if the hash matches */
                crypto.scrypt(password, row.salt, 32, function(err, hashedPassword) {
                    if(err)
                        reject(err);
                    
                        if(!crypto.timingSafeEqual(Buffer.from(row.hash, 'hex'), hashedPassword))
                            resolve(false); // Hashes don't match
                        else
                            resolve(user); // User found
                });
            }
        })
    })
}

/* Get user by ID */
function getUserById(id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE id = ?';
        db.run(query, [id], (err, row) => {
            if(err)
                reject(err);
            else if (row === undefined)
                reject({ error : 'User not found'});
            else{
                const user = ({ id : row.id , name : row.name , username : row.mail });
                resolve(user);
            }
        });
    });
}

module.exports = { getUser, getUserById };