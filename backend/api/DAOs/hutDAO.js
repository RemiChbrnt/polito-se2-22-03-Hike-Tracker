'use strict'
const db = require('../../db/db');

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

exports.getHutsByUserId = async (userId) => {
    return new Promise((resolve, reject) => {
        const sql =
            `SELECT * from Locations
             LEFT JOIN Huts ON Locations.id = Huts.locationId
             WHERE type="hut" AND author=? `
        db.get(sql, [userId], async (err, rows) => {
            if (err) {
                reject();
                return;
            }else if (rows === undefined) { resolve(false); }
            else {
                resolve(rows);
            }
        })
    })
}

exports.linkHut = async (hikeId, locationId) => {
    console.log(hike);
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO HikesHaveHuts(hikeId, locationId) VALUES(?,?)';
        db.run(sql, [hikeId, locationId], function (err, rows) {
            if (err) {
                console.log(err);
                reject(400);
                return;
            }
            else {
                resolve({id: this.lastID});
                return;
            }
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


exports.clearDatabase = async () => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM Huts'
        db.run(sql, [], async (err, rows) => {
            if (err)
                reject();
            else
                resolve();
        })
    })
}