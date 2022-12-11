'use strict';

const SERVER_PORT = 3001;
const apiUrl = '/api';

/* Requires */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { validationResult, body, param } = require('express-validator');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');

/* ------------------------------------------------------------------- */

const app = express();

/* CORS setup */
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));
/* ---------------------------------- */

app.use(morgan('dev'));
app.use(express.json());

const userRouter = require('./api/routers/userRouter');
const hikeRouter = require('./api/routers/hikeRouter');
const locationRouter = require('./api/routers/locationRouter');
app.use(apiUrl, userRouter);
app.use(apiUrl, hikeRouter);
app.use(apiUrl, locationRouter);

/* express-session setup */
app.use(session({
    secret: 'software engineldenring speedrun [ANY%][NO GLITCH][EPIC]',
    resave: false,
    saveUninitialized: false
}));
/* ---------------------------------------*/

/* -------- AUTHENTICATION SETUP -------- */
/* passport.use(new LocalStrategy(
    async function verify(email, password, callback) {
        const user = await userDAO.getUser(email, password);

        if (!user)
            return callback(null, false, 'Wrong username or password'); // LOGIN FAILURE

        return callback(null, user); // LOGIN SUCCESS
    }
)); */

app.use(passport.authenticate('session'));
/* --------------------------------------------------------------------------------------- */

/* Session information setup */
/* Here we decide which information should be stored during each session.
 * To do so, we use the serializeUser() and deserializeUser() methods,
 * which take the specified subset of user information and store them
 * on req.passport (or retrieves them, with deserializeUser()).
 * Note that the deserializeUser() can only access the information
 * that have been serialized, and uses them to return a User object,
 * which will be accessible to every authenticated request to the server. 
 */

passport.serializeUser(function (user, callback) {
    callback(null, user); // The user is received from the verify method, therefore it contains id + username (mail) + name
});

passport.deserializeUser(function (user, callback) {
    return callback(null, user);
    /* Additional check may be performed here, for example
     * to check if the user is still in the database.
     */
});

/* --------------------------------------------------------- */

/* AUTHENTICATION */
/* Login */
app.post(apiUrl + '/login', passport.authenticate('local'), (req, res) => {
    res.status(201).json(req.user);
});

/* Get currently logged user's info */
app.get(apiUrl + '/session/current', (req, res) => {
    if (req.isAuthenticated())
        res.json(req.user);
    else
        res.status(401).json({ error: 'Not authenticated' });
});

/* Logout */
app.delete(apiUrl + '/session/current', (req, res) => {
    req.logout(() => {
        res.end();
    });
});
/* --------------------------------------------------------- */

app.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT}`)
});

module.exports = app