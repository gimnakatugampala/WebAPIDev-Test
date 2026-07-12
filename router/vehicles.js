
const express = require('express');
const {seedData} = require('../db')
const authenticate = require('../middleware/auth'); // Import the auth middleware



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

// GET /vehicles/:vehicle-id/last-position 
router.get('/:vehicleId/last-position', (req, res) => {
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


// POST /vehicles/:vehicleId/pings
// key_v01 : Key
router.post('/:vehicleId/pings', authenticate, (req, res) => {
    const { vehicleId } = req.params;
    const { latitude, longitude } = req.body;

    // Validate inputs
    if (!latitude || !longitude) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const newPing = {
        id: `p-${Date.now()}`,
        vehicleId,
        latitude,
        longitude,
        timestamp: new Date().toISOString()
    };

    seedData.pings.push(newPing);

    // Set the Location header as instructed
    res.setHeader('Location', `/v1/api/vehicles/${vehicleId}/pings/${newPing.id}`);

    // Return 201 Created
    res.status(201).json(newPing);
});

module.exports = router
