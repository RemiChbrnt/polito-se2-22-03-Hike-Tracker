'use strict'
const sqlite = require('sqlite3')
const dbPath = require('../../index').databasePath
const db = new sqlite.Database(dbPath, (err) => {
   if (err) throw err
   db.run("PRAGMA foreign_keys = ON")
})

   exports.getHikes=async()=> {
      return new Promise((resolve, reject) => {
         const sql = 'SELECT * from Hikes'
         db.all(sql, [], async (err, rows) => {
            if (err) {
               reject(503)
               return
            }
            const res = await Promise.all(
               rows.map(async (r) => {
               const startLocation=await this.getLocationById(r.startPt);
               const endLocation=await this.getLocationById(r.endPt);
               const refLocations= await this.getReferenceLocations(r.id);
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
   }
   exports.getReferenceLocations=async(id)=> {
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
   }
   exports.getLocationById=async(id)=> {
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

   exports.createHike=async(hike)=> {
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
 }

 