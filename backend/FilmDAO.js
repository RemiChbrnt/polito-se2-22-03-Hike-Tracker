// const sqlite = require('sqlite3');
// const { Film } = require('./FilmLibrary.js');

// const db = new sqlite.Database('database.db', (err) => {
//     if(err)
//         throw err;
// });

// /* Load all films from database */
// function loadAll(user) {
//     console.log('USER: ' + user);
//     return new Promise((resolve, reject) => {
//         const query = 'SELECT * FROM films WHERE user == ?';
//         db.all(query, [user], (err, rows) => {
//             if(err)
//                 reject(err);
//             else {
//                 resolve(rows.map((row) =>
//                     new Film(row.id, row.title, row.favorite, row.watchdate, row.rating)
//                 ));
//             }
//         });
//     });
// }

// /* Load favorite films from database */
// function loadFavorites(user) {
//     return new Promise((resolve, reject) => {
//         const query = 'SELECT * FROM films WHERE favorite = true AND user == ?';
//         db.all(query, [user], (err, rows) => {
//             if(err)
//                 reject(err);
//             else {
//                 resolve(rows.map((row) =>
//                     new Film(row.id, row.title, row.favorite, row.watchdate, row.score)
//                 ));
//             }
//         });
//     });
// }

// /* Load recent films (within last month) from database */
// function loadRecent(user) {
//     return new Promise((resolve, reject) => {
//         const query = 'SELECT * FROM films  WHERE user == ? AND watchdate > (SELECT DATETIME(\'now\', \'-30 day\'))';
//         db.all(query, [user], (err, rows) => {
//             if(err)
//                 reject(err);
//             else {
//                 resolve(rows.map((row) =>
//                     new Film(row.id, row.title, row.favorite, row.watchdate, row.score)
//                 ));
//             }
//         });
//     });
// }

// /* Load top rated films from database */
// function loadTopRated(user) {
//     return new Promise((resolve, reject) => {
//         const query = 'SELECT * FROM films WHERE rating = 5 AND user == ?';
//         db.all(query, [user], (err, rows) => {
//             if(err)
//                 reject(err);
//             else {
//                 resolve(rows.map((row) =>
//                     new Film(row.id, row.title, row.favorite, row.watchdate, row.score)
//                 ));
//             }
//         });
//     });
// }

// /* Load unseen films from database */
// function loadNotSeen(user) {
//     return new Promise((resolve, reject) => {
//         const query = 'SELECT * FROM films WHERE user == ? AND watchdate IS NULL';
//         db.all(query, [user],  (err, rows) => {
//             if(err)
//                 reject(err);
//             else {
//                 resolve(rows.map((row) =>
//                     new Film(row.id, row.title, row.favorite, row.watchdate, row.score)
//                 ));
//             }
//         });
//     });
// }

// /* Add new film */
// function addFilm(film) {
//     return new Promise((resolve, reject) => {
//         const query = 'INSERT INTO films (title, favorite, watchdate, rating) VALUES(?,?,?,?,?)';
//         db.run(query, [
//             film.title,
//             film.favorite === undefined ? 0 : film.favorite,
//             film.watchdate,
//             film.rating,
//             film.user
//         ], (err) => {
//             if(err)
//                 reject(err);
//             else
//                 resolve(true);
//         });
//     });
// }

// /* Edit film
//  * The function receives the updated version of the film
//  * and updates the fields of the database entry that has
//  * a matching ID
//  */
// function updateFilm(updated) {
//     return new Promise((resolve, reject) => {
//         const query = 'UPDATE films SET title = ? , favorite = ? , watchdate = ? , rating = ? WHERE id = ?';
//         db.run(query, [
//             updated.title,
//             updated.favorite,
//             updated.watchdate,
//             updated.rating,
//             updated.id
//         ], (err, rows) => {
//             if(err)
//                 reject(err);
//             else
//                 resolve(rows);
//         })
//     })
// }

// /* Remove film */
// function removeFilm(id) {
//     return new Promise((resolve, reject) => {
//         const query = 'DELETE FROM films WHERE id = ?';
//         db.run(query, [id], (err) => {
//             if(err)
//                 reject(err);
//             else if (this.changes == 0)
//                 reject('Film id not found');
//             else
//                 resolve(true);
//         })
//     })
// }

// /* Get film by ID (used to precompile the edit form) */
// function getFilmById(id) {
//     return new Promise((resolve, reject) => {
//         const query = 'SELECT * FROM films WHERE id = ?';
//         db.get(query, [id], (err, row) => {
//             if(err)
//                 reject(err);
//             else
//                 resolve(row);
//         })
//     })
// }

// module.exports = { loadAll, loadFavorites, loadRecent, loadTopRated, loadNotSeen, addFilm, updateFilm, removeFilm, getFilmById };