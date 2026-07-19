const express = require('express');
const { getDB } = require('../db')



const router = express.Router();



// ---------------------------------------------------------
// 3. Stations
// ---------------------------------------------------------

// GET /stations (Collection)
router.get('/', async (req, res) => {
    try {
        const db = getDB();
        const stations = await db.collection('stations').find({}).toArray();
        res.status(200).json(stations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET /stations/:station-id (Atomic member)
router.get('/:stationId', async (req, res) => {
    try {
        const db = getDB();
        const id = Number(req.params.stationId);
        const station = await db.collection('stations').findOne({ id });

        if (station) {
            res.status(200).json(station);
        } else {
            res.status(404).json({ error: "Station not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router