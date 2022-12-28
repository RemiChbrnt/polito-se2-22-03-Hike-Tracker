'use strict'
const express = require('express');
const HikeService = require('../services/hikeService');
const HikeDao = require('../DAOs/hikeDAO');
const isLoggedIn = require("../middleware/authentication");
const service = new HikeService(HikeDao)

const router = express.Router()

const { query, body, param, validationResult } = require('express-validator');

router.get('/hikes/completed', isLoggedIn, async (req, res) => {
        
        const data = await service.getCompletedHikes(req.user.email)
        if (data.ok) {
            return res.status(data.status).json(data.body)
        }
        return res.status(data.status).end()
})

router.get('/hikes', [
        query('minLength').optional().isFloat({ min: 0 }),
        query('maxLength').optional().isFloat({ min: 0 }),
        query('minAscent').optional().isFloat({ min: 0 }),
        query('maxAscent').optional().isFloat({ min: 0 }),
        query('minTime').optional().isFloat({ min: 0 }),
        query('maxTime').optional().isFloat({ min: 0 }),
        query('difficulty').optional().isString().isIn(['tourist', 'hiker', 'pro']),
        query('country').optional().isString(),
        query('region').optional().isString(),
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

router.post('/hikes', isLoggedIn, [
    body('title').exists().isString(),
    body('length').exists().isFloat({ min: 0 }),
    body('expTime').exists().isFloat({ min: 0 }),
    body('ascent').exists().isFloat({ min: 0 }),
    body('difficulty').exists().isString().isIn(['tourist', 'hiker', 'pro']),
    body('startPt').exists().isNumeric(),
    body('endPt').exists().isNumeric(),
    body('description').exists().isString(),
    body('author').exists().isEmail()
], async (req, res) => {
    const errors = validationResult(req);
    console.log("hike query " + JSON.stringify(req.body));

    if (req.user.role !== 'guide')
        return res.status(403).json({ errors: "Only guides can access this feature" });
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

router.get('/hikeFromID', [query('id').exists()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const data = await service.getHikeFromID(req.query)
        if (data.ok) {
            return res.status(data.status).json(data.body)
        }
        return res.status(data.status).end()
    })



router.put('/hike-startPt/:id/:startPt', isLoggedIn, [
    param('id').exists().isInt(),
    param('startPt').exists().isInt(),
], async (req, res) => {

    if (req.user === undefined || req.user.role !== "guide")
        return res.status(400).json({ error: "Unauthorized" });

    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

    const data = await service.setHikeStartPoint(req.params);

    if (data.ok)
        return res.status(data.status).json(data.body);

    return res.status(data.status).end()
})


router.put('/hike-endPt/:id/:endPt', isLoggedIn, [
    param('id').exists().isInt(),
    param('endPt').exists().isInt(),
], async (req, res) => {

    if (req.user === undefined || req.user.role !== "guide")
        return res.status(400).json({ error: "Unauthorized" });

    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

    const data = await service.setHikeEndPoint(req.params);

    if (data.ok)
        return res.status(data.status).json(data.body);

    return res.status(data.status).end()
})

router.post('/hikesReferencePoints', isLoggedIn, [
    body('hikeId').exists().isNumeric(),
    body('locationId').exists().isNumeric()
], async (req, res) => {
    const errors = validationResult(req);

    if (req.user.role !== 'guide')
        return res.status(403).json({ errors: "Only guides can access this feature" });
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const hikeReferencePoints = req.body
    const refPt = await service.addHikeReferencePoint(hikeReferencePoints)
    if (refPt.ok) {
        return res.status(refPt.status).json({ ok: true })
    }
    return res.status(refPt.status).end()
})

router.get('/hikesList/:hutId/', isLoggedIn,
    [param('hutId').exists().isInt(),],
    async (req, res) => {
        if (req.user === undefined || req.user.role !== "hutworker")
            return res.status(400).json({ error: "Unauthorized" });

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const data = await service.getHikesByHutId(req.params.hutId, req.user.email)
        if (data.ok) {
            return res.status(data.status).json(data.body)
        }
        return res.status(data.status).end()
    }
)


router.put('/hikes/:hikeId/status/:hutId', [
    param('hikeId').exists().isInt(),
    param('hutId').exists().isInt(),
    body('status').exists().isString().isIn(['open', 'closed', 'partly blocked', 'requires special gear']),
    body('description').exists().isString()
],
    async (req, res) => {

        if (req.user === undefined || req.user.role !== "hutworker")
            return res.status(400).json({ error: "Unauthorized" });

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ error: errors.array() });
        }

        const data = await service.updateStatus(req.body, req.params.hikeId, req.params.hutId, req.user.email)
        if (data.ok) {
            return res.status(data.status).end();
        }
        return res.status(data.status).end()
    }
);

router.post('/start-hike', isLoggedIn, [
    body('hikeId').exists().isNumeric()
],
    async (req, res) => {
        if (req.user.role === "hiker") {
            const response = await service.startHike(req.body.groupId, req.body.hikeId, req.user.email);
            if (response.ok) {
                return res.status(response.status).end();
            }
            else {
                res.status(response.status).end();
            }
        } else {
            return res.status(400).json({ error: "Unauthorized" });
        }
    });

router.put('/terminate-hike', isLoggedIn, async (req, res) => {
    if (req.user.role === "hiker") {
        const response = await service.terminateHike(req.body.groupId, req.body.hikeId, req.user.email);
        if (response.ok) {
            return res.status(response.status).end();
        }
        else {
            res.status(response.status).end();
        }
    } else {
        return res.status(400).json({ error: "Unauthorized" });
    }
});

router.get('/current-group', isLoggedIn, async (req, res) => {
    if (req.user.role === "hiker") {
        const response = await service.getCurrentGroupId(req.user.email);
        if (response.ok) {
            if (response.status === 204) {
                return res.status(response.status).end();
            } else {
                return res.status(response.status).json(response.body);
            }
        }
        else {
            res.status(response.status).end();
        }
    } else {
        return res.status(400).json({ error: "Unauthorized" });
    }
})

module.exports = router