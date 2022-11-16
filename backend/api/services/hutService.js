'use strict'

class HutService {
    constructor(dao) {
        this.dao = dao
    }

    getHuts = async (query) => {
        try {
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


}

module.exports = HutService