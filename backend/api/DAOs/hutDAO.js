'use strict'
const sqlite = require('sqlite3')
const { on } = require('../../index')
const dbPath = require('../../index').databasePath
const db = new sqlite.Database(dbPath, (err) => {
    if (err) throw err
    db.run("PRAGMA foreign_keys = ON")
})

exports.getHuts = async (query) => {
    console.log("query: " + JSON.stringify(query));
    console.log("Object.entries(query).length " + Object.entries(query).length);
    return new Promise((resolve, reject) => {
        let sql =
            `SELECT * from Locations
            LEFT JOIN Huts ON Locations.id = Huts.locationId
            WHERE type="hut"`
        let filters = "";
        if (Object.entries(query).length !== 0)    //check if the query has any parameters
            filters = this.generateFilters(query);
        sql = sql + filters;
        console.log(sql);
        db.all(sql, [], async (err, rows) => {
            if (err) {
                reject();
                return;
            }

            resolve(rows);
        })
    })
}

exports.generateFilters = (query) => {
    let filters = " AND";
    if (query.name !== undefined) filters = filters + ` name LIKE '%${query.name}%' AND`
    if (query.latitude !== undefined) filters = filters + ` latitude = ${query.latitude} AND`
    if (query.longitude !== undefined) filters = filters + ` longitude = ${query.longitude} AND`
    if (query.country !== undefined) filters = filters + ` country = '${query.country}' AND`
    if (query.province !== undefined) filters = filters + ` province   = '${query.province}' AND`
    if (query.town !== undefined) filters = filters + ` town LIKE '%${query.town}%' AND`
    if (query.address !== undefined) filters = filters + ` address LIKE '%${query.address}%' AND`
    if (query.altitude !== undefined) filters = filters + ` altitude = ${query.altitude} AND`
    filters = filters + " 1"
    return filters;
}