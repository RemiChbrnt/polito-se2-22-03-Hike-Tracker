'use strict';

const express = require('express');
const locationService = require('../services/locationService');
const locationDAO = require('../DAOs/locationDAO');
const service = new locationService(locationDAO);
const router = express.Router();
const { body, param, query, validationResult } = require('express-validator');
const isLoggedIn = require("../middleware/authentication");


router.get('/huts', isLoggedIn, [
    query('name').optional({ nullable: true }).isString({ min: 0 }),
    query('country').optional({ nullable: true }).isString({ min: 0 }),
    query('region').optional({ nullable: true }).isString({ min: 0 }),
    query('town').optional({ nullable: true }).isString({ min: 0 }),
    query('address').optional({ nullable: true }).isString({ min: 0 }),
    query('minAltitude').optional({ nullable: true }).isFloat(),
    query('maxAltitude').optional({ nullable: true }).isFloat()
],
    async (req, res) => {

        if (req.user === undefined || req.user.role !== "hiker")
            return res.status(400).json({ error: "Unauthorized" });

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const data = await service.getHuts(req.query);
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

        const data = await service.getHutsAndParkingLots(req.user.email);
        if (data.ok) {
            return res.status(data.status).json(data.body)
        }
        return res.status(data.status).end()
    })

router.get('/locations',
    async (req, res) => {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const data = await service.getLocations(req.query)
        if (data.ok) {
            return res.status(data.status).json(data.body)
        }
        return res.status(data.status).end()
    }
)

router.post('/locations', isLoggedIn, [
    body('name').exists().isString(),
    body('type').exists().isIn(['hut', 'parkinglot', 'generic']),
    body('latitude').exists().isFloat({ min: 0 }),
    body('longitude').exists().isFloat({ min: 0 }),
    body('country').optional({ nullable: true }).isString(),
    body('region').optional({ nullable: true }).isString(),
    body('town').optional({ nullable: true }).isString(),
    body('address').optional({ nullable: true }).isString(),
    body('altitude').optional({ nullable: true }).isFloat({ min: 0 }),
    body('numberOfBeds').optional({ nullable: true }).isInt({ min: 0 }),
    body('lotsNumber').optional({ nullable: true }).isInt({ min: 0 }),
    body('food').optional({ nullable: true }).isString().isIn(['none', 'buffet', 'restaurant']),
    body('description').optional({ nullable: false }).isString(),
    body('phone').optional({ nullable: false }).isMobilePhone(),
    body('email').optional({ nullable: false }).isEmail(),
    body('website').optional({ nullable: true }).isURL()
], async (req, res) => {
    console.log('HERE router: ' + JSON.stringify(req.body));
    const errors = validationResult(req);
    if(req.user.role!=='guide')
        return res.status(403).json({ errors: "Only guides can access this feature"})
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const data = await service.addLocation(req.body, req.user.email).catch((e) => console.log('ROUTER: ' + e));;
    if (data.ok)
        return res.status(data.status).json(data.body);

    return res.status(data.status).end();
});

router.get('/hutsList/:userId', isLoggedIn, [
    param('userId').exists().isEmail(),
],
    async (req, res) => {

        if (req.user === undefined || req.user.role !== "guide" || req.user.email !== req.params.userId) { //userId = email
            return res.status(400).json({ error: "Unauthorized" });
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const data = await service.getHutsByUserId(req.params.userId)
        console.log('here')
        if (data.ok) {
            return res.status(data.status).json(data.body)
        }
        return res.status(data.status).end()
    })

router.post('/linkHut', isLoggedIn, [
    body('locationId').exists().isNumeric(),
    body('hikeId').exists().isNumeric(),
], async (req, res) => {

    if(req.user.role!=='guide')
        return res.status(403).json({ errors: "Only guides can access this feature"})
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const newLink = req.body
    const response = await service.linkHut(newLink)
    if (response.ok) {
        return res.status(response.status).json(response.body)
    }
    return res.status(response.status).end();
})


router.get('/huts/myhut', isLoggedIn,
    async (req, res) => {
        
        if (req.user === undefined || req.user.role !== "hutworker")
        return res.status(400).json({ error: "Unauthorized" });

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        const data = await service.getHutbyWorkerId(req.user.email)
        if (data.ok) {
            return res.status(data.status).json(data.body)
        }
        return res.status(data.status).end()
    }
)


module.exports = router;
