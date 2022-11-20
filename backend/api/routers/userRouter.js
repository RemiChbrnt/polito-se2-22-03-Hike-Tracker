'use strict';

const express = require('express');
const UserService = require('../services/userService');
const userDAO = require('../DAOs/userDAO');

const service = new UserService(userDAO);
const userRouter = express.Router();
const { body, param, validationResult } = require('express-validator');

// TODO: inspiration

userRouter.post('/login', async (req, res) => {

    const user = await service.login(req.body);

    if (user.ok)
        return res.status(user.status).json(user.body);

    return res.status(user.status).end;

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
    ], async (req, res) => {
        
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

userRouter.get('/user', async (req, res) => {
        const id = req.query.role; // e.g. /user?role=hiker

        if(id==="hiker"){
            //connection to database function
            const data = await service.getPreferences(req.user.email)
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