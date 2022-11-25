'use strict'

class LocationService {
    constructor(dao) {
        this.dao = dao
    }

    getHuts = async (query) => {
        try {
            console.log("query " + JSON.stringify(query));
            const huts = await this.dao.getHuts(query)
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


    getHutsAndParkingLots = async () => {
        try {
            const result = await this.dao.getHutsAndParkingLots()
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


    addLocation = async (newLocation) => {
        try {
            console.log("new location " + JSON.stringify(newLocation));
            const response = await this.dao.addLocation(newLocation);
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

}

module.exports = LocationService
