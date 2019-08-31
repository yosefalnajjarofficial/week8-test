const express = require('express');

const city = require('./city');

const router = express.Router();

router.get('/cities', city.getAllCities);
router.post('/add-city', city.add);

module.exports = router;
