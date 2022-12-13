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
                region: r.region,
                town: r.town,
                address: r.address,
                altitude: r.altitude,
                numberOfBeds: r.numberOfBeds,
                food: r.food,
                description: r.description,
                openingTime: r.openingTime,
                closingTime: r.closingTime,
                cost: r.cost,
                phone: r.phone,
                email: r.email,
                website: r.website
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


    getHutById = async (id) => {
        try {
            const hut = await this.dao.getHutById(id);
            return {
                ok: true,
                status: 200,
                body: hut
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
                region: r.region,
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
                region: r.region,
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
                region: r.region,
                town: r.town,
                address: r.address,
                altitude: r.altitude,
                numberOfBeds: r.numberOfBeds,
                food: r.food,
                description: r.description,
                openingTime: r.openingTime,
                closingTime: r.closingTime,
                cost: r.cost,
                phone: r.phone,
                email: r.email,
                website: r.website,
                photos: r.photos
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
        if (!await this.dao.validateLinkStartEnd(newLink.hikeId, newLink.locationId)
            && !await this.dao.validateLinkRef(newLink.hikeId, newLink.locationId)) {
            return {
                ok: false,
                status: 409
            }
        }
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

    getLocationById = async (query) => {
        try {
            const location = await this.dao.getLocationById(query)
            return {
                ok: true,
                status: 200,
                body: location
            }
        } catch (e) {
            return {
                ok: false,
                status: 500
            }
        }
    }


    getReferencePointsFromHikeId = async (query) => {
        try {
            const locations = await this.dao.getReferencePointsFromHikeId(query)
            return {
                ok: true,
                status: 200,
                body: locations
            }
        } catch (e) {
            return {
                ok: false,
                status: 500
            }
        }
    }

    addHutPhoto = async (id, fileName) => {
        try {
            const result = await this.dao.addHutPhoto(id, fileName);
            return {
                ok: true,
                status: 201,
                body: result
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
