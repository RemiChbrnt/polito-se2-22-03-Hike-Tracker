const userDAO = require('../DAOs/userDAO');

module.exports = async (req, res, next) => {
    if (req.isAuthenticated()) {
        let verified = await userDAO.checkUserVerification(req.user.email);

        if (verified === true)
            return next();
        else
            return res.status(401).json({ error: 'User Not verified' });

    }
    return res.status(401).json({ error: 'Not logged in' });
}