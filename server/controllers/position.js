const express = require('express');
const router = express.Router();
const positionService = require('../services/position');

// routes
router.get('/', read);

module.exports = router;

function read(req, res, next) {
    positionService.read()
        .then(positions => res.json(positions))
        .catch(err => next(err));
}