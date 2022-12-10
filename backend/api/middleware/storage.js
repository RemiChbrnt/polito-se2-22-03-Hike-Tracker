'use strict';

const multer = require('multer');
const crypto = require('crypto');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/src/photos');
    },
    filename: function (req, file, cb) {
        if (file.originalname.slice(-4) === ".png")
            cb(null, crypto.randomBytes(32).toString('hex') + ".png");
        if (file.originalname.slice(-4) === ".jpg")
            cb(null, crypto.randomBytes(32).toString('hex') + ".jpg");
        if (file.originalname.slice(-5) === ".jpeg")
            cb(null, crypto.randomBytes(32).toString('hex') + ".jpeg");
    }
});

const uploadImg = multer({ storage: storage }).single('file');

module.exports.uploadImg = uploadImg;