
const express = require('express');
const {seedData} = require('../db')



const router = express.Router();



// ---------------------------------------------------------
// 4. Vehicles
// ---------------------------------------------------------

// GET /vehicles (Collection)
router.get('/', (req, res) => {
    res.status(200).json(seedData.vehicles);
});

// GET /vehicles/:vehicleId
router.get('/:vehicleId', (req, res) => {
    const id = Number(req.params.vehicleId);

    const vehicle = seedData.vehicles.find(v => v.id === id);

    if (!vehicle) {
        return res.status(404).json({ error: "Vehicle not found" });
    }

    const vehiclePings = seedData.pings.filter(p => p.vehicle_id === id);
    const lastPing = vehiclePings.length > 0
        ? vehiclePings[vehiclePings.length - 1]
        : null;

    res.status(200).json({
        ...vehicle,
        last_ping: lastPing
    });
});

// GET /vehicles/:vehicle-id/pings (Scoped collection)
router.get('/:vehicleId/pings', (req, res) => {
    const id = req.params.vehicleId;
    
    // First, verify the vehicle exists (to return 404 if it doesn't)
    const vehicle = seedData.vehicles.find(v => v.id == id);
    if (!vehicle) {
        return res.status(404).json({ error: "Vehicle not found" });
    }

    // Filter pings that belong strictly to this vehicle
    const vehiclePings = seedData.pings.filter(ping => ping.vehicle_id == id);
    res.status(200).json(vehiclePings);
});


module.exports = router
