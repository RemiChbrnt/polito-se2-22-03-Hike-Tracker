'use strict'
const sqlite = require('sqlite3');
// const dbPath = require('../db/testingHikeTrackerDb.db');
const db = new sqlite.Database('./db/testingHikeTrackerDb.db', (err) => {
   if (err) {
        throw err
   }
    db.run("PRAGMA foreign_keys = ON")
});

async function createHike(hike) {
    return new Promise((resolve, reject) => {
       const sql = 'INSERT INTO Hikes(title, length, expTime, ascent, difficulty, startPt, endPt, description, author) VALUES(?,?,?,?,?,1,2,?,?)';
       db.run(sql, [
         hike.title,
         hike.length,
         hike.expTime,
         hike.ascent,
         hike.difficulty,
         hike.description,
         hike.author
       ], async (err, rows) => {
         if(err){
            reject(400);
            return;
         }
         else {
            resolve(201);
            return;
         }
       })
    })
};

async function getReferenceLocations(id) {
    return new Promise((resolve, reject) => {
       const sql = 'SELECT * \
                   from Locations \
                   where id in ( select locationId from HikesReferencePoints where hikeId=?)'
       db.all(sql, [id], async (err, rows) => {
          if (err) {
             console.log(err)
             return null;
          }
          resolve(rows)
       })
    })
 };

 async function getLocationById(id) {
    return new Promise((resolve, reject) => {
       const sql = 'SELECT * from Locations where id=?'
       db.get(sql, [id], async (err, rows) => {
          if (err) {
             console.log(err)
             return null;
          }
          resolve(rows)
       })
    })
 }

async function getHikes() {
    return new Promise((resolve, reject) => {
       const sql = 'SELECT * from Hikes'
       db.all(sql, [], async (err, rows) => {
          if (err) {
             reject(503)
             return
          }
          const res = await Promise.all(
             rows.map(async (r) => {
             const startLocation=await getLocationById(r.startPt);
             const endLocation=await getLocationById(r.endPt);
             const refLocations= await getReferenceLocations(r.id);
             return {
              id:r.id,
              title:r.title, 
              length:r.length, 
              expTime:r.expTime, 
              ascent:r.ascent, 
              difficulty:r.difficulty, 
              startPt:startLocation, 
              endPt:endLocation, 
              description:r.description,
              referencePoints:refLocations,
             }
          })
          )
          resolve(res)
       })
    })
 };

 async function clearDatabase() {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM Hikes'
        db.run(sql, [], async (err, rows) => {
            if(err)
                reject();
            else
                resolve();
        })
    })
 }

module.exports = { createHike, getHikes, clearDatabase }