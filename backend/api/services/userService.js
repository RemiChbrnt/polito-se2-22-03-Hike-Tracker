'use strict'

class UserService {

    constructor(DAO) {
        this.DAO = DAO;
    }

    login = async (body) => {
        try {
            let user = await this.DAO.login(body.email, body.password);
            return {
                ok: true,
                status: 201,
                body: user
            };
        }
        catch (e) {
            return {
                ok: false,
                status: e
            };

        }
    };




    signup = async (body) => {
        try {
            let user = await this.DAO.signup(body.email, body.fullName, body.password, body.role, body.phoneNumber);
            return {
                ok: true,
                status: 201,
                body: user
            };
        }
        catch (e) {
            return {
                ok: false,
                status: e
            };

        }
    };


    verify = async (email, randomString) => {
        try {
            let user = await this.DAO.verifyUser(email, randomString);
            return {
                ok: true,
                status: 201,
                body: user
            };
        }
        catch (e) {
            return {
                ok: false,
                status: e
            };

        }
    };


    createPreferences = async (req) => {
        try {
            let prefs = await this.DAO.createPreferences(req.user.email, req.body.ascent, req.body.duration);
            return {
                ok: true,
                status: 201,
                body: prefs
            };
        }
        catch (e) {
            return {
                ok: false,
                status: e
            };

        }
    };

    getPreferences = async (email) => {
        try {
            let prefs = await this.DAO.getPreferences(email);
            return {
                ok: true,
                status: 200,
                body: prefs
            };
        }
        catch (e) {
            return {
                ok: false,
                status: e
            };

        }
    };

}

module.exports = UserService