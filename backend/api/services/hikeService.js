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
                statusList: r.statusList
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

    getCompletedHikes = async (query) => {
        try {
            const hikes = await this.dao.getCompletedHikes(query)
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
                statusList: r.statusList,
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

    getHikesCount = async (query) => {
        try {
            const count = await this.dao.getHikesCount(query);
            return {
                ok: true,
                status: 200,
                body: count
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

    addHikeReferencePoint = async (newReferencePoint) => {
        try {
            const res = await this.dao.addHikeReferencePoint(newReferencePoint)
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

    startHike = async (groupId, hikeId, userId) => {
        try {
            const result = await this.dao.startHike(groupId, hikeId, userId);
            if (result === true) {
                return {
                    ok: true,
                    status: 201
                }
            } else {
                return {
                    ok: false,
                    status: result
                }
            }
        } catch (e) {
            return {
                ok: false,
                status: e
            }
        }
    }

    terminateHike = async (groupId, hikeId, userId) => {
        try {
            const result = await this.dao.terminateHike(groupId, hikeId, userId);
            if (result === true) {
                return {
                    ok: true,
                    status: 201
                }
            } else {
                return {
                    ok: false,
                    status: result
                }
            }
        } catch (e) {
            return {
                ok: false,
                status: e
            }
        }
    }

    getCurrentGroupId = async (hikerId) => {
        try {
            const result = await this.dao.getCurrentGroupId(hikerId);
            if (result === 503) {
                return {
                    ok: false,
                    status: 503
                }
            } else if (result === false) {
                return {
                    ok: true,
                    status: 204
                }
            } else {
                return {
                    ok: true,
                    status: 200,
                    body: result
                }
            }
        } catch (e) {
            return {
                ok: false,
                status: e
            }
        }
    }
}

module.exports = HikeService