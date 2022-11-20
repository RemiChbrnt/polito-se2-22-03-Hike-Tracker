'use strict'
const express = require('express');
const HikeService = require('../services/hikeService');
const HikeDao = require('../DAOs/hikeDAO');
const mockHikeDao = require('../mockDAOs/mockHikeDAO');

const service = new HikeService(HikeDao)
// const service = new HikeService(mockHikeDao);

const router = express.Router()

const { query, body, param, validationResult } = require('express-validator/check');

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
    query('town').optional().isString()
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
    body('difficulty').exists().isString().isIn(['toursit', 'hiker', 'pro']),
    body('description').exists().isString(),
    body('author').exists().isEmail()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const newHike = req.body
    const data = await service.createHike(newHike)
    if (data.ok) {
        return res.status(data.status).json(data.body)
    }
    return res.status(data.status).end()
})



router.put('/hike-startPt/:id/:startPt', [
    param('id').exists().isInt(),
    param('startPt').exists().isInt(),
], async (req, res) => {

    console.log("req.params " + JSON.stringify(req.params));
    //check if the user is a local guide

    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

    const data = await service.setHikeStartPoint(req.params);
    console.log("data " + JSON.stringify(data));
    if (data.ok)
        return res.status(data.status).json(data.body);

    return res.status(data.status).end()
})


router.put('/hike-endPt/:id/:endPt', [
    param('id').exists().isInt(),
    param('endPt').exists().isInt(),
], async (req, res) => {

    console.log("req.params " + JSON.stringify(req.params));

    //check if the user is a local guide

    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

    const data = await service.setHikeEndPoint(req.params);
    console.log("data " + JSON.stringify(data));
    if (data.ok) {
        console.log("ciao " + JSON.stringify(data));
        return res.status(data.status).json(data.body);
    }



    return res.status(data.status).end()
})



module.exports = router