'use strict'

class HikeService {
    constructor(dao) {
        this.dao = dao
    }

    getHikes=async ()=>{
        try {
            const hikes = await this.dao.getHikes()
            const message = hikes.map((r) => ({
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
            return {
            ok: false,
            status: 500
            }
        }
    }

    createHike= async (newHike)=>{
        try{
            const response = await this.dao.createHike(newHike)
            return {
                ok: true,
                status: 201,
            }
        } catch(e) {
            return {
                ok: false,
                status: 400
            }
        }
    }
}

module.exports = HikeService