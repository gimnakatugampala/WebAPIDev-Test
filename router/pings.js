
const express = require('express');
const {seedData} = require('../db')



const router = express.Router();



// ---------------------------------------------------------
// 5. Stations
// ---------------------------------------------------------

// GET /pings (Collection)
router.get('/', (req, res) => {
    res.status(200).json(seedData.pings);
});



module.exports = router
