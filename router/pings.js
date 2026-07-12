
const express = require('express');
const {seedData} = require('../db')


const router = express.Router();



// ---------------------------------------------------------
// 5. Pings
// ---------------------------------------------------------

// GET /pings (Collection)
router.get('/', (req, res) => {
    res.status(200).json(seedData.pings);
});

// GET /pings/:pingId (Atomic member)
router.get('/:pingId', (req, res) => {
    const id = req.params.pingId;
    const ping = seedData.pings.find(p => p.id == id);
    
    if (ping) {
        res.status(200).json(ping);
    } else {
        res.status(404).json({ error: "Ping not found" });
    }
});



module.exports = router
