
const express = require('express');
const {seedData} = require('../db')



const router = express.Router();



// ---------------------------------------------------------
// 3. Stations
// ---------------------------------------------------------

// GET /stations (Collection)
router.get('/', (req, res) => {
    res.status(200).json(seedData.stations);
});

// GET /stations/:station-id (Atomic member)
router.get('/:stationId', (req, res) => {
    const id = req.params.stationId;
    const station = seedData.stations.find(s => s.id == id);
    
    if (station) {
        res.status(200).json(station);
    } else {
        res.status(404).json({ error: "Station not found" });
    }
});

module.exports = router
