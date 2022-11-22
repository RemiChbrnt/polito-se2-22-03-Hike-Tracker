'use strict';

const express = require('express');
const locationService = require('../services/locationService');
const locationDAO = require('../DAOs/locationDAO');
const LocationService = require('../services/locationService');

const service = new LocationService(locationDAO);
const router = express.Router();
const { body, param, validationResult } = require('express-validator');

router.post('/addHut', [
        body('title').exists().isString(),
        body('latitude').exists().isFloat({ min: 0 }),
        body('longitude').exists().isFloat({ min: 0 }),
        body('altitude').exists().isFloat({ min: 0 }),
        body('food').exists().isString().isIn(['none', 'buffet', 'restaurant']),
        body('country').exists().isString(),
        body('province').exists().isString(),
        body('town').exists().isString(),
        body('address').optional().isString(),
        body('beds').exists().isInt({ min: 0 }),
        body('description').optional().isString()
    ], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const data = await service.addHut(req.body);
    if(data.ok)
        return res.status(data.status).json(data.body);
    
    return res.status(data.status).end();
});

module.exports = router;