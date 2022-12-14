'use strict'

class UserService {

    constructor(DAO) {
        this.DAO = DAO;
    }

    login = async (body) => {
        try {
            let user = await this.DAO.login(body.email, body.password);
            if (user === 412 || user === 403 || user === 401)
                return {
                    ok: false,
                    status: user
                }

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
            let user = await this.DAO.signup(body.email, body.fullName, body.password, body.role, body.phoneNumber, body.hut);
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


    getPendingUsers = async () => {
        try {
            const result = await this.DAO.getPendingUsers();
            const users = result.map((u) => ({
                email: u.email,
                fullName: u.fullname,
                role: u.role,
                phoneNumber: u.phoneNumber
            }))
            return {
                ok: true,
                status: 200,
                body: users
            };
        }
        catch (e) {
            return {
                ok: false,
                status: e
            };

        }
    }


    approveUser = async (email) => {
        try {
            const user = await this.DAO.approveUser(email);
            return {
                ok: true,
                status: 200,
                body: user
            };
        }
        catch (e) {
            return {
                ok: false,
                status: e
            };

        }
    }


    declineUser = async (email, role) => {
        try {
            const user = await this.DAO.declineUser(email, role);
            return {
                ok: true,
                status: 200,
                body: user
            };
        }
        catch (e) {
            return {
                ok: false,
                status: e
            };

        }
    }



    updatePreferences = async (req) => {
        try {
            let prefs = await this.DAO.updatePreferences(req.user.email, req.body.ascent, req.body.duration);
            return {
                ok: true,
                status: 201,
                body: prefs
            };
        } catch(e) {
            return {
                ok: false,
                status: e
            }
        }
    }
    
    deletePreferences = async (req) => {
        try {
            await this.DAO.deletePreferences(req.user.email);
            return {
                ok: true,
                status: 204
            };
        } catch(e) {
            return {
                ok: false,
                status: e
            }
        }
    }
}

module.exports = UserService