'use strict'

class LocationService {
    constructor(dao) {
        this.dao = dao
    }

    getHuts = async (query) => {
        try {
            const huts = await this.dao.getHuts(query);
            
            const message = huts.map((r) => ({
                id: r.id,
                name: r.name,
                latitude: r.latitude,
                longitude: r.longitude,
                country: r.country,
                province: r.province,
                town: r.town,
                address: r.address,
                altitude: r.altitude,
                numberOfBeds: r.numberOfBeds,
                food: r.food,
                description: r.description,
                openingTime: r.openingTime,
                closingTime: r.closingTime,
                cost: r.cost
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

    getLocations = async (query) => {
        try {
            const locations = await this.dao.getLocations(query)
            const message = locations.map((r) => ({
                id: r.id,
                name: r.name,
                type: r.type,
                latitude: r.latitude,
                longitude: r.longitude,
                country: r.country,
                province: r.province,
                town: r.town,
                address: r.address,
                altitude: r.altitude,
                author: r.author,
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


    getHutsAndParkingLots = async (email) => {
        try {
            const result = await this.dao.getHutsAndParkingLots(email)
            const message = result.map((r) => ({
                id: r.id,
                name: r.name,
                type: r.type,
                latitude: r.latitude,
                longitude: r.longitude,
                country: r.country,
                province: r.province,
                town: r.town,
                address: r.address,
                altitude: r.altitude
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


    addLocation = async (newLocation, email) => {
        try {
            const response = await this.dao.addLocation(newLocation, email);
            return {
                ok: true,
                status: 201,
                body: response
            }
        } catch (e) {
            return {
                ok: false,
                status: e
            }
        }
    }


    getHutsByUserId = async (email) => {
        try {
            const huts = await this.dao.getHutsByUserId(email)
            const message = huts.map((r) => ({
                id: r.id,
                name: r.name,
                latitude: r.latitude,
                longitude: r.longitude,
                country: r.country,
                province: r.province,
                town: r.town,
                address: r.address,
                altitude: r.altitude,
                numberOfBeds: r.numberOfBeds,
                food: r.food,
                description: r.description,
                openingTime: r.openingTime,
                closingTime: r.closingTime,
                cost: r.cost
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

    linkHut = async (newLink) => {
        try {
            const res = await this.dao.linkHut(newLink.hikeId, newLink.locationId)
            return {
                ok: true,
                status: 201,
                body: res
            }
        } catch (e) {
            if (e === 415) {
                return {
                    ok: false,
                    status: 415
                }
            } else {
                return {
                    ok: false,
                    status: 400
                }
            }
        }
    }


    getHutbyWorkerId = async (email) => {
        try {
            const hutId = await this.dao.getHutbyWorkerId(email)
            return {
                ok: true,
                status: 200,
                body: hutId
            }
        } catch (e) {
            return {
                ok: false,
                status: 500
            }
        }
    }

}




module.exports = LocationService
