'use strict';
const sqlite = require('sqlite3')
const path = require('path');
/* DB init */
/* 
let dbPath = "";
if (process.env.NODE_ENV === 'development') {
    //dbPath = './HikeTrackerDb.db'
    dbPath = './productionHikeTrackerDb.db'
}
if (process.env.NODE_ENV === 'test') {
    dbPath = './testingHikeTrackerDb_updated.db'
} */

// TODO: set to original db
const dbPath = './productionHikeTrackerDb.db';

const DBSOURCE = path.join(__dirname, dbPath);
const database = new sqlite.Database(DBSOURCE, (err) => {
    if (err) throw err
    database.run("PRAGMA foreign_keys = ON")
})



module.exports = database;
