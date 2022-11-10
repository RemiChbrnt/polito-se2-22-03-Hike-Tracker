'use strict';

const express = require('express');
const UserService = require('../services/userService');
const userDAO = require('../DAOs/userDAO');

const service = new UserService(userDAO);
const router = express.Router();
const { body, param, validationResult } = require('express-validator');

// TODO: inspiration

router.post('/login', async (req, res) => {
    const user = await service.login(req.user);

    console.log("user router " + req.user);

    if (user.ok) {
        return res.status(user.status).json(user.body);
    }
    else
        return res.status(user.status).end;


});


router.get('/skuitems/sku/:id',
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