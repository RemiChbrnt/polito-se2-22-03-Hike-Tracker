const userDAO = require('../DAOs/userDAO');

module.exports = async (req, res, next) => {
    if (req.isAuthenticated()) {
        let user = await userDAO.checkUserVerification(req.user.email);
        if ((user.role === "hiker" && user.verified === 1) || user.verified === 2)
            return next();
        else if (user.role !== "hiker" && user.verified === 1)
            return res.status(401).json({ error: 'User Not verified' });
        else
            return res.status(401).json({ error: 'User Not authenticated' });

    }
    return res.status(401).json({ error: 'Not logged in' });
}