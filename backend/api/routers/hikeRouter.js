'use strict'
const express = require('express');
const HikeService = require('../services/hikeService');
const HikeDao = require('../DAOs/hikeDAO');
const mockHikeDao = require('../mockDAOs/mockHikeDAO');

const service = new HikeService(HikeDao)
// const service = new HikeService(mockHikeDao);

const router = express.Router()

const { query, body, validationResult } = require('express-validator/check');

router.get('/hikes', [
    query('minLength').optional().isFloat({ min: 0 }),
    query('maxLength').optional().isFloat({ min: 0 }),
    query('minAscent').optional().isFloat({ min: 0 }),
    query('maxAscent').optional().isFloat({ min: 0 }),
    query('minTime').optional().isFloat({ min: 0 }),
    query('maxTime').optional().isFloat({ min: 0 }),
    query('difficulty').optional().isString().isIn(['tourist', 'hiker', 'pro']),
    query('country').optional().isString(),
    query('province').optional().isString(),
    query('town').optional().isString(),
    query('author').optional().isEmail()
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const data = await service.getHikes(req.query)
        if (data.ok) {
            return res.status(data.status).json(data.body)
        }
        return res.status(data.status).end()
    })

router.post('/hikes', [
    body('title').exists().isString(),
    body('length').exists().isFloat({ min: 0 }),
    body('expTime').exists().isFloat({ min: 0 }),
    body('ascent').exists().isFloat({ min: 0 }),
    body('difficulty').exists().isString().isIn(['tourist', 'hiker', 'pro']),
    body('startPt').exists().isFloat(),
    body('endPt').exists().isFloat(),
    body('description').exists().isString(),
    body('author').exists().isEmail()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const newHike = req.body
    const hikeId = await service.createHike(newHike)
    if (hikeId.ok) {
        return res.status(hikeId.status).json(hikeId.body)
    }
    return res.status(hikeId.status).end()
})

router.post('/locations', [
    body('name').exists().isString(),
    body('type').exists().isString(),
    body('latitude').exists().isFloat(),
    body('longitude').exists().isFloat()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const newLocation = req.body
    const locId = await service.createLocation(newLocation)
    if (locId.ok) {
        return res.status(locId.status).json(locId.body)
    }
    return res.status(locId.status).end()
})

module.exports = router