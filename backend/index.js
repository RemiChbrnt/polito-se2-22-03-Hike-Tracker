'use strict';

const SERVER_PORT = 3001;
const apiUrl = '/api';

/* Requires */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const userDAO = require('./api/DAOs/userDAO.js');
// const hikeDAO = require('./HikeDAO.js'); TODO: add DAOs
const { validationResult, body, param } = require('express-validator');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
/* ------------------------------------------------------------------- */

/* DB init */
exports.databasePath = './db/HikeTrackerDb.db'

// TODO: add routers and services
// const hikeRouter = require('./api/routers/hikeRouter');
// app.use(apiUrl, hikeRouter);

const app = express();

app.use(morgan('dev'));
app.use(express.json());

const userRouter = require('./api/routers/userRouter');
const hikeRouter = require('./api/routers/hikeRouter');
app.use(userRouter);
app.use(apiUrl, hikeRouter);

/* CORS setup */
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));
/* ---------------------------------- */

/* express-session setup */
app.use(session({
    secret: 'software engineldenring speedrun [ANY%][NO GLITCH][EPIC]',
    resave: false,
    saveUninitialized: false
}));
/* ---------------------------------------*/

/* -------- AUTHENTICATION SETUP -------- */
passport.use(new LocalStrategy(
    async function verify(email, password, callback) {
        const user = await userDAO.getUser(email, password);

        if (!user)
            return callback(null, false, 'Wrong username or password'); // LOGIN FAILURE

        return callback(null, user); // LOGIN SUCCESS
    }
));

app.use(passport.authenticate('session'));
/* --------------------------------------------------------------------------------------- */

/* Session information setup */
/* Here we decide which information should be stored during each session.
 * To do so, we use the serializeUser() and deserializeUser() methods,
 * which take the specified subset of user information and store them
 * on req.session.passport (or retrieves them, with deserializeUser()).
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

/* The isLoggedIn middleware will be passed to every protected API,
 * in order to prevent unauthenticated users to access them.
 */

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ error: 'Not logged in' });
}
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

app.get(apiUrl + '/all/:user', isLoggedIn, (req, res) => {
    filmDAO.loadAll(req.params.user).then(
        (value) => {
            res.json(value);
        }
    ).catch(
        (err) => {
            res.status(500).json({ error: err });
        }
    )
});

app.get(apiUrl + '/favorites/:user', isLoggedIn, (req, res) => {
    filmDAO.loadFavorites(req.params.user).then(
        (value) => {
            res.json(value);
        }
    ).catch(
        (err) => {
            res.status(500).json({ error: err });
        }
    )
});

app.get(apiUrl + '/recent/:user', isLoggedIn, (req, res) => {
    filmDAO.loadRecent(req.params.user).then(
        (value) => {
            res.json(value);
        }
    ).catch(
        (err) => {
            res.status(500).json({ error: err });
        }
    )
});

app.get(apiUrl + '/top/:user', isLoggedIn, (req, res) => {
    filmDAO.loadTopRated(req.params.user).then(
        (value) => {
            res.json(value);
        }
    ).catch(
        (err) => {
            res.status(500).json({ error: err });
        }
    )
});

app.get(apiUrl + '/unseen/:user', isLoggedIn, (req, res) => {
    filmDAO.loadNotSeen(req.params.user).then(
        (value) => {
            res.json(value);
        }
    ).catch(
        (err) => {
            res.status(500).json({ error: err });
        }
    )
});

app.post(apiUrl + '/add', isLoggedIn, [
    /* First, check if the body contains a valid film. We do so
     * with the express-validator middleware.
     */
    body('title').not().isEmpty(),
    //body('favorite').isBoolean(),
    //body('watchdate').isISO8601(),
    //body('rating').isNumeric(),
    //body('user').isNumeric()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        /* Errors in the request, return 400 */
        return res.status(400).json({ errors: errors.array() });
    }

    /* Then, reformat the favorite attribute, since the DB uses 0 and 1
     * instead of false and true respectively.
     */

    if (req.body.favorite === 'true') { req.body.favorite = 1; }
    else if (req.body.favorite === 'false' || req.body.favorite === undefined) { req.body.favorite = 0; }

    const film_to_add = req.body;
    try {
        await filmDAO.addFilm(film_to_add);
        res.end();
    } catch (e) {
        res.status(400).json({ error: e });
    }
}
);

app.put(apiUrl + '/update/:id', isLoggedIn, async (req, res) => {
    /* The actual film to update is retrieved and
     * inserted in the request body, except for the ID
     * which I add to the body because it is needed to
     * update the correct film
     */
    const film_to_update = {
        ...req.body,
        id: req.params.id
    };

    try {
        await filmDAO.updateFilm(film_to_update);
        res.end();
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

app.delete(apiUrl + '/delete/:id', isLoggedIn, [
    param('id').isNumeric()
], async (req, res) => {
    const id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        /* Errors in the request, return 400 */
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        await filmDAO.removeFilm(id);
        res.end();
    } catch (e) {
        res.status(400).json({ error: e });
    }
}
);

app.get(apiUrl + '/get/:id', isLoggedIn, async (req, res) => {
    const id = req.params.id;
    try {
        const film = await filmDAO.getFilmById(id);
        res.json(film);
    } catch (e) {
        res.status(400).json({ error: e });
    }
});

app.listen(SERVER_PORT, () => { console.log(`Server running on port ${SERVER_PORT}`) });

module.exports = app