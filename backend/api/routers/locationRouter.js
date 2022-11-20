'use strict';

const express = require('express');
const locationService = require('../services/locationService');
const locationDAO = require('../DAOs/locationDAO');

const service = new locationService(locationDAO);
const router = express.Router();
const { body, param, validationResult } = require('express-validator');

// TODO: inspiration

router.post('/parking', [], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const data = await service.addParking(req.body);

    if (data.ok)
        return res.status(data.status).json(data.body);

    return res.status(data.status).end;

});

module.exports = router