'use strict'
const express = require('express');
const HutService = require('../services/hutService');
const HutDao = require('../DAOs/hutDAO');
// const mockHutDao = require('../mockDAOs/mockHikeDAO');

const service = new HutService(HutDao)
// const service = new HikeService(mockHikeDao);

const router = express.Router()

const { query, body, validationResult } = require('express-validator/check');

router.get('/huts', [
    query('name').optional().isString({ min: 0 }),
    query('latitude').optional().isFloat({ min: 0 }),
    query('longitude').optional().isFloat({ min: 0 }),
    query('country').optional().isString({ min: 0 }),
    query('province').optional().isString({ min: 0 }),
    query('town').optional().isString({ min: 0 }),
    query('address').optional().isString({ min: 0 }),
    query('altitude').optional().isFloat()
],
    async (req, res) => {
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




module.exports = router;