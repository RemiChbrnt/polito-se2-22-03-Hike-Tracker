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
const isLoggedIn = require("../middleware/authentication");

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


userRouter.use(session({
    secret: 'software engineldenring speedrun [ANY%][NO GLITCH][EPIC]',
    resave: false,
    saveUninitialized: false
}));

userRouter.use(passport.authenticate('session'));
userRouter.post('/login', passport.authenticate('local'), async (req, res) => {
    const user = await service.login(req.body);

    if (user.ok) {
        console.log("LOGIN AS " + JSON.stringify(req.user));
        return res.status(user.status).json(user.body);
    } else if (user.status === 412 || user.status === 403 || user.status === 401)
        return res.status(user.status).json(user.status);


    return res.status(user.status).end();

});

/* Get currently logged user's info */
userRouter.get('/session/current', (req, res) => {
    if (req.isAuthenticated())
        res.json(req.user);
    else
        res.status(401).json({ error: 'Not authenticated' });
});

userRouter.post('/signup', async (req, res) => {
    let user = await service.signup(req.body);
    if (user.ok) {
        return res.status(user.status).json(user.body);
    }

    return res.status(user.status).end();


});

userRouter.post('/preferences', isLoggedIn,
    [
        body('ascent').isFloat(),
        body('duration').isFloat(),
    ], isLoggedIn, async (req, res) => {

        //validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }


        if (req.user.role === "hiker") {
            //connection to database function
            const data = await service.createPreferences(req)
            if (data.ok) {
                return res.status(data.status).json(data.body)
            }
            return res.status(data.status).end()
        } else
            return res.status(403).json({ errors: "Invalid role selection" });

    })

userRouter.get('/preferences', isLoggedIn, async (req, res) => {

    if (req.user.role === "hiker") {
        //connection to database function
        const data = await service.getPreferences(req.user.email);
        if (data.ok) {
            return res.status(data.status).json(data)
        }
        return res.status(data.status).end()
    }
    else
        return res.status(403).json({ errors: "Invalid role selection" });
})

userRouter.get('/verify/:email/:randomString', async (req, res) => {

    let data = await service.verify(req.params.email, req.params.randomString);

    /* For now the server returns an html code snippet as response,
    but it can be improved by redirecting to a real page */

    let httpResponse;
    if (data.ok) {
        httpResponse = `<div>User ${data.body.email}, Full Name ${data.body.fullName}, role ${data.body.role} verified.</div>
                        <div>You can close this page</div>`;
    }
    else {
        httpResponse = `<div>Something went wrong. Error ${data.status}</div>`;
    }

    return res.send(httpResponse);

});


userRouter.get('/get-pending-users', isLoggedIn, async (req, res) => {

    if (req.user.role !== "manager")
        return res.status(400).json({ error: "Unauthorized" });

    const data = await service.getPendingUsers();

    if (data.ok)
        return res.status(data.status).json(data.body);

    return res.status(data.status).end()

});


userRouter.put('/approve', isLoggedIn, async (req, res) => {

    if (req.user.role !== "manager")
        return res.status(400).json({ error: "Unauthorized" });

    const data = await service.approveUser(req.body.email);

    if (data.ok)
        return res.status(data.status).json(data)

    return res.status(data.status).end()

});



userRouter.delete('/approve', isLoggedIn, async (req, res) => {

    if (req.user.role !== "manager")
        return res.status(400).json({ error: "Unauthorized" });

    const data = await service.declineUser(req.body.email, req.body.role);

    if (data.ok)
        return res.status(data.status).json(data)

    return res.status(data.status).end()

});



userRouter.put('/preferences', isLoggedIn, async (req, res) => {
    if(req.user.role === "hiker") {
        const data = await service.updatePreferences(req);
        if(data.ok)
            return res.status(data.status).json(data);
        return res.status(data.status).end();
    } else {
        return res.status(403).json({ errors: "Invalid role selection" });
    }
});

userRouter.delete('/preferences', isLoggedIn, async (req, res) => {
    if(req.user.role === "hiker") {
        const data = await service.deletePreferences(req);
        if(data.ok)
            return res.status(data.status).json(data.body);
        return res.status(data.status).end();
    } else {
        return res.status(403).json({ errors: "Invalid role selection" });
    }
})

module.exports = userRouter