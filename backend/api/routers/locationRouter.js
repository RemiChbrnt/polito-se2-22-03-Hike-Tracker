'use strict';

const express = require('express');
const locationService = require('../services/locationService');
const locationDAO = require('../DAOs/locationDAO');

const service = new locationService(locationDAO);
const router = express.Router();
const { body, param, query, validationResult } = require('express-validator');



router.get('/huts', [
    query('name').optional({ nullable: true }).isString({ min: 0 }),
    query('country').optional({ nullable: true }).isString({ min: 0 }),
    query('province').optional({ nullable: true }).isString({ min: 0 }),
    query('town').optional({ nullable: true }).isString({ min: 0 }),
    query('address').optional({ nullable: true }).isString({ min: 0 }),
    query('minAltitude').optional({ nullable: true }).isFloat(),
    query('maxAltitude').optional({ nullable: true }).isFloat(),
],
    async (req, res) => {

        if (req.user === undefined || req.user.role !== "hiker")
            return res.status(400).json({ error: "Unauthorized" });

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        console.log("req.query " + JSON.stringify(req.query));
        const data = await service.getHuts(req.query)
        if (data.ok) {
            return res.status(data.status).json(data.body)
        }
        return res.status(data.status).end()
    })



router.get('/huts-and-parking-lots',
    async (req, res) => {

        if (req.user === undefined || req.user.role !== "guide")
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



router.post('/locations', [
    body('name').exists().isString(),
    body('type').exists().isIn(['hut', 'parkinglot', 'generic']),
    body('latitude').exists().isFloat({ min: 0 }),
    body('longitude').exists().isFloat({ min: 0 }),
    body('country').optional({ nullable: true }).isString(),
    body('province').optional({ nullable: true }).isString(),
    body('town').optional({ nullable: true }).isString(),
    body('address').optional({ nullable: true }).isString(),
    body('altitude').optional({ nullable: true }).isFloat({ min: 0 }),
    body('numberOfBeds').optional({ nullable: true }).isInt({ min: 0 }),
    body('lotsNumber').optional({ nullable: true }).isInt({ min: 0 }),
    body('food').optional({ nullable: true }).isString().isIn(['none', 'buffet', 'restaurant']),
    body('description').optional({ nullable: true }).isString()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const data = await service.addLocation(req.body);
    if (data.ok)
        return res.status(data.status).json(data.body);

    return res.status(data.status).end();
});




module.exports = router;
