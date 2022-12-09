'use strict'

class HikeService {
    constructor(dao) {
        this.dao = dao
    }

    getHikes = async (query) => {
        try {
            const hikes = await this.dao.getHikes(query)
            const message = hikes.map((r) => ({
                id: r.id,
                title: r.title,
                length: r.length,
                expTime: r.expTime,
                ascent: r.ascent,
                difficulty: r.difficulty,
                startPt: r.startPt,
                endPt: r.endPt,
                description: r.description,
                track: r.track,
                author: r.author,
                referencePoints: r.referencePoints,
                statusList:r.statusList,
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
            }
        }
    }

    getHikeFromID = async (query) => {
        try {
            const hike = await this.dao.getHikeFromID(query)
            return {
                ok: true,
                status: 200,
                body: hike
            }
        } catch (e) {
            return {
                ok: false,
                status: 500
            }
        }
    }

    createHike = async (newHike) => {
        try {
            const hike = await this.dao.createHike(newHike)
            return {
                ok: true,
                status: 201,
                body: hike
            }
        } catch (e) {
            return {
                ok: false,
                status: 400
            }
        }
    }

    // createLocation = async (newLocation) => {
    //     try {
    //         const location = await this.dao.createLocation(newLocation)
    //         return {
    //             ok: true,
    //             status: 201,
    //             body: location
    //         }
    //     } catch (e) {
    //         return {
    //             ok: false,
    //             status: 400
    //         }
    //     }
    // }


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


    getHikesByHutId = async (hutId, email) => {
        try {
            const hikes = await this.dao.getHikesByHutId(hutId, email)
            const message = hikes.map((r) => ({
                id: r.id,
                name: r.title,
                status: r.status,
                description: r.description,
            }))
            return {
                ok: true,
                status: 200,
                body: message
            }
        } catch (e) {
            return {
                ok: false,
                status: 400
            }
        }
    }


    updateStatus = async (status, hikeId, hutId, email) => {
        try {
            await this.dao.updateStatus(status, hikeId, hutId, email)
            return {
                ok: true,
                status: 200
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