
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

// POST /vehicles/:vehicleId/pings
router.post('/vehicles/:vehicleId/pings', (req, res) => {
    const { vehicleId } = req.params;
    const { latitude, longitude, speed } = req.body;

    // 1. Create the new ping object
    const newPing = {
        id: `p-${Date.now()}`, // Generating a simple unique ID
        vehicleId,
        latitude,
        longitude,
        speed,
        timestamp: new Date().toISOString()
    };

    // 2. Add to your data store (assuming seedData is mutable in your app)
    seedData.pings.push(newPing);

    // 3. Set the Location header
    const location = `/vehicles/${vehicleId}/pings/${newPing.id}`;
    res.setHeader('Location', location);

    // 4. Return 201 Created
    res.status(201).json(newPing);
});

module.exports = router
