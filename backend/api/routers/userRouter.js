'use strict';

const express = require('express');
const UserService = require('../services/UserService');
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




userRouter.get('/skuitems/sku/:id',
    [param('id').isNumeric(),
    ], async (req, res) => {
        const id = req.params.id;
        //validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        //connection to database function
        const data = await service.getSKUItemsById(id)
        if (data.ok) {
            return res.status(data.status).json(data.body)
        }
        return res.status(data.status).end()
    })

module.exports = userRouter