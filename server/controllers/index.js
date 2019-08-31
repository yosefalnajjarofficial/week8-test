const express = require('express');

const error = require("./error");
const city = require('./city');

const router = express.Router();

router.get('/cities', city.getAllCities);
router.post('/add-city', city.add);


router.use(error.client);
router.use(error.server);

module.exports = router;
