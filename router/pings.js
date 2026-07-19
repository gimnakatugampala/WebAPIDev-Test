const express = require('express');
const { getDB } = require('../db')


const router = express.Router();



// ---------------------------------------------------------
// 5. Pings
// ---------------------------------------------------------

// GET /pings (Collection)
router.get('/', async (req, res) => {
    try {
        const db = getDB();
        const pings = await db.collection('pings').find({}).toArray();
        res.status(200).json(pings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET /pings/:pingId (Atomic member)
router.get('/:pingId', async (req, res) => {
    try {
        const db = getDB();
        const id = req.params.pingId;
        // Ping ids can be numeric (seeded) or string-based (e.g. "p-<timestamp>" from POST),
        // so try a numeric match first and fall back to a string match.
        const numericId = Number(id);
        const ping = await db.collection('pings').findOne({
            id: Number.isNaN(numericId) ? id : numericId
        });

        if (ping) {
            res.status(200).json(ping);
        } else {
            res.status(404).json({ error: "Ping not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});



module.exports = router