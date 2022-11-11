'use strict'
const express = require('express');
const HikeService = require('../services/hikeService');
const HikeDao = require('../DAOs/hikeDao');
const mockHikeDao=require('../mockDAOs/mockHikeDAO');

// const service = new HikeService(HikeDao)
const service = new HikeService(mockHikeDao);

const router = express.Router()

const { body, param, validationResult } = require('express-validator');

   router.get('/hikes', async (req, res) => {
      const data=await service.getHikes()
      if(data.ok) {
         return res.status(data.status).json(data.body)
      }
      return res.status(data.status).end()
   })

   router.post('/hikes',[], async (req, res) => {
    //validation
/*     const errors=validationResult(req);
    if (!errors.isEmpty()) {
       return res.status(422).json({ errors: errors.array() });
    }
 */
    const newHike=req.body
    const data=await service.createHike(newHike)
    if(data.ok) {
       return res.status(data.status).json(data.body)
    }
    return res.status(data.status).end()
 })

module.exports=router