'use strict';

const express = require('express');
const UserService = require('../services/userService');
const userDAO = require('../DAOs/userDAO');

const passport = require('passport');
const LocalStrategy = require('passport-local');

const session = require('express-session');
const service = new UserService(userDAO);
const userRouter = express.Router();
const { body, param, validationResult } = require('express-validator');

passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    async function verify(email, password, callback) {
        const user = await userDAO.login(email, password);

        if (!user)
            return callback(null, false, 'Wrong username or password'); // LOGIN FAILURE

        return callback(null, user); // LOGIN SUCCESS
    }
));

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ error: 'Not logged in' });
}

userRouter.use(session({
    secret: 'software engineldenring speedrun [ANY%][NO GLITCH][EPIC]',
    resave: false,
    saveUninitialized: false
}));

userRouter.use(passport.authenticate('session'));
userRouter.post('/login', passport.authenticate('local'), async (req, res) => {

    const user = await service.login(req.body);

    if (user.ok)
        return res.status(user.status).json(user.body);

    return res.status(user.status).end;

});

/* Get currently logged user's info */
userRouter.get('/session/current', (req, res) => {
    if (req.isAuthenticated())
        res.json(req.user);
    else
        res.status(401).json({ error: 'Not authenticated' });
});

userRouter.post('/signup', async (req, res) => {

    const user = await service.signup(req.body);

    if (user.ok)
        return res.status(user.status).json(user.body);

    return res.status(user.status).end;


});

userRouter.post('/user',
    [
        body('email').isEmail(),
        body('ascent').isFloat(),
        body('duration').isFloat(),
    ], isLoggedIn, async (req, res) => {
        
        //validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const id = req.query.role; // e.g. /user?role=hiker

        if(id==="hiker"){
            //connection to database function
            const data = await service.createPreferences(req.body)
            if (data.ok) {
                return res.status(data.status).json(data.body)
            }
            return res.status(data.status).end()
        }else if(id==="guide"){

        }else{
            return res.status(403).json({ errors: "Invalid role selection" });
        }
    })

userRouter.get('/user', isLoggedIn, async (req, res) => {
        const id = req.query.role; // e.g. /user?role=hiker

        if(id==="hiker"){
            //connection to database function
            const data = await service.getPreferences(req.session.email);
            if (data.ok) {
                return res.status(data.status).json(data)
            }
            return res.status(data.status).end()
        }else if(id==="guide"){

        }else{
            return res.status(403).json({ errors: "Invalid role selection" });
        }
    })

module.exports = userRouter