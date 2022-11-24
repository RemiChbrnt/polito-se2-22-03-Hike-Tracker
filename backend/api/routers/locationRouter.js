'use strict';

const express = require('express');
const locationService = require('../services/locationService');
const locationDAO = require('../DAOs/locationDAO');
const LocationService = require('../services/locationService');

const service = new LocationService(locationDAO);
const router = express.Router();
const { body, param, query, validationResult } = require('express-validator');



router.get('/huts', [
    query('name').optional().isString({ min: 0 }),
    query('country').optional().isString({ min: 0 }),
    query('province').optional().isString({ min: 0 }),
    query('town').optional().isString({ min: 0 }),
    query('address').optional().isString({ min: 0 }),
    query('altitude').optional().isFloat()
],
    async (req, res) => {

        if (req.session.user === undefined || req.session.user.role !== "hiker")
            return res.status(400).json({ error: "Unauthorized" });

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const data = await service.getHuts(req.query)
        if (data.ok) {
            return res.status(data.status).json(data.body)
        }
        return res.status(data.status).end()
    })



router.get('/huts-and-parking-lots',
    async (req, res) => {

        if (req.session.user === undefined || req.session.user.role !== "guide")
            return res.status(400).json({ error: "Unauthorized" });

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const data = await service.getHutsAndParkingLots();
        if (data.ok) {
            return res.status(data.status).json(data.body)
        }
        return res.status(data.status).end()
    })




router.post('/addHut', [
    body('name').exists().isString(),
    body('latitude').exists().isFloat({ min: 0 }),
    body('longitude').exists().isFloat({ min: 0 }),
    body('altitude').exists().isFloat({ min: 0 }),
    body('food').exists().isString().isIn(['none', 'buffet', 'restaurant']),
    body('country').exists().isString(),
    body('province').exists().isString(),
    body('town').exists().isString(),
    body('address').optional().isString(),
    body('numberOfBeds').exists().isInt({ min: 0 }),
    body('description').optional().isString()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const data = await service.addHut(req.body);
    if (data.ok)
        return res.status(data.status).json(data.body);

    return res.status(data.status).end();
});

module.exports = router;