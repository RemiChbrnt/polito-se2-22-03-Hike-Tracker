'use strict'

class HikeService {
    constructor(dao) {
        this.dao = dao
    }

    getHikes = async (query) => {
        try {
            const hikes = await this.dao.getHikes(query)
            const message = hikes.map((r) => ({
<<<<<<< HEAD
                id: r.id,
                title: r.title,
                length: r.length,
                expTime: r.expTime,
                ascent: r.ascent,
                difficulty: r.difficulty,
                startPt: r.startPt,
                endPt: r.endPt,
                description: r.description,
                referencePoints: r.referencePoints
            }))
            return {
                ok: true,
                status: 200,
                body: message
            }
        } catch (e) {
            return {
                ok: false,
                status: 500
=======
                id:r.id,
                title:r.title, 
                length:r.length, 
                expTime:r.expTime, 
                ascent:r.ascent, 
                difficulty:r.difficulty, 
                startPt:r.startPt, 
                endPt:r.endPt, 
                description:r.description,
                referencePoints:r.referencePoints
             }))
            return {
            ok: true,
            status: 200,
            body: message
            }
        } catch(e) {
            console.log(e)
            return {
            ok: false,
            status: 500
>>>>>>> sprint2HT10
            }
        }
    }

    createHike = async (newHike) => {
        try {
            const response = await this.dao.createHike(newHike)
            return {
                ok: true,
                status: 201,
            }
        } catch (e) {
            return {
                ok: false,
                status: 400
            }
        }
    }


    setHikeStartPoint = async (query) => {
        try {
            const response = await this.dao.setHikeStartPoint(query)
            return {
                ok: true,
                status: 200,
            }
        } catch (e) {
            return {
                ok: false,
                status: 400
            }
        }
    }


    setHikeEndPoint = async (query) => {
        try {
            const response = await this.dao.setHikeEndPoint(query)
            return {
                ok: true,
                status: 200,
            }
        } catch (e) {
            return {
                ok: false,
                status: 400
            }
        }
    }


}

module.exports = HikeService