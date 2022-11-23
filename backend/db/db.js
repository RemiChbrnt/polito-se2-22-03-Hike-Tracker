'use strict';
const sqlite = require('sqlite3')
const path = require('path');
/* DB init */

let dbPath = "";
if (process.env.NODE_ENV === 'development') {
    dbPath = './HikeTrackerDb.db'
}
if (process.env.NODE_ENV === 'test') {
    dbPath = './testingHikeTrackerDb.db'
}
const DBSOURCE = path.join(__dirname, dbPath);
const database = new sqlite.Database(DBSOURCE, (err) => {
    if (err) throw err
    database.run("PRAGMA foreign_keys = ON")
})



module.exports = database;