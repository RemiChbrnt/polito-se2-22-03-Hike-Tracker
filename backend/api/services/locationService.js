'use strict';

class LocationService {
    constructor(dao) {
        this.dao = dao;
    }

    addHut = async (newHut) => {
        try {
            const response = await this.dao.addHut(newHut);
            return {
                ok: true,
                status: 201,
                body: {}
            }
        } catch(e) {
            return {
                ok: false,
                status: e
            }
        }
    }
}

module.exports = LocationService;