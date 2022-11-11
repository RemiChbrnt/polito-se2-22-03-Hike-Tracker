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
            let list = rows.map((r) => {
               return {
                title:r.title, 
                length:r.length, 
                expTime:r.expTime, 
                ascent:r.ascent, 
                difficulty:r.difficulty, 
                startPt:r.startPt, 
                endPt:r.endPt, 
                description:r.description
               }
            })
            resolve(list)
         })
      })
   }

   exports.createHike=async(hike)=> {
    return new Promise((resolve, reject) => {
       const sql = 'INSERT INTO Hikes(title, length, expTime, ascent, difficulty, startPt, endPt, description) VALUES(?,?,?,?,?,1,2,?)';
       db.run(sql, [
         hike.title,
         hike.length,
         hike.expTime,
         hike.ascent,
         hike.difficulty,
         hike.description
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

 