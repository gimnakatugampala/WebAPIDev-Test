const express = require('express');
const { getDB } = require('../db')
const authenticate = require('../middleware/auth'); // Import the auth middleware



const router = express.Router();



// ---------------------------------------------------------
// 4. Vehicles
// ---------------------------------------------------------

// GET /vehicles (Collection)
router.get('/', async (req, res) => {
    try {
        const db = getDB();
        const vehicles = await db.collection('vehicles').find({}).toArray();
        res.status(200).json(vehicles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET /vehicles/:vehicleId
router.get('/:vehicleId', async (req, res) => {
    try {
        const db = getDB();
        const id = Number(req.params.vehicleId);

        const vehicle = await db.collection('vehicles').findOne({ id });
        if (!vehicle) {
            return res.status(404).json({ error: "Vehicle not found" });
        }

        const vehiclePings = await db.collection('pings')
            .find({ vehicle_id: id })
            .toArray();

        const lastPing = vehiclePings.length > 0
            ? vehiclePings[vehiclePings.length - 1]
            : null;

        res.status(200).json({
            ...vehicle,
            last_ping: lastPing
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET /vehicles/:vehicle-id/pings (Scoped collection)
router.get('/:vehicleId/pings', async (req, res) => {
    try {
        const db = getDB();
        const id = Number(req.params.vehicleId);

        // First, verify the vehicle exists (to return 404 if it doesn't)
        const vehicle = await db.collection('vehicles').findOne({ id });
        if (!vehicle) {
            return res.status(404).json({ error: "Vehicle not found" });
        }

        // Filter pings that belong strictly to this vehicle
        const vehiclePings = await db.collection('pings')
            .find({ vehicle_id: id })
            .toArray();

        res.status(200).json(vehiclePings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET /vehicles/:vehicle-id/last-position
router.get('/:vehicleId/last-position', async (req, res) => {
    try {
        const db = getDB();
        const id = Number(req.params.vehicleId);

        // First, verify the vehicle exists (to return 404 if it doesn't)
        const vehicle = await db.collection('vehicles').findOne({ id });
        if (!vehicle) {
            return res.status(404).json({ error: "Vehicle not found" });
        }

        // Return only the single most recent ping (fixes the bug noted in
        // project.md where this endpoint used to return every ping)
        const [lastPing] = await db.collection('pings')
            .find({ vehicle_id: id })
            .sort({ timestamp: -1 })
            .limit(1)
            .toArray();

        res.status(200).json(lastPing || null);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// POST /vehicles/:vehicleId/pings
// key_v01 : Key
router.post('/:vehicleId/pings', authenticate, async (req, res) => {
    try {
        const db = getDB();
        const { vehicleId } = req.params;
        const { latitude, longitude } = req.body;

        // Validate inputs
        if (!latitude || !longitude) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newPing = {
            id: `p-${Date.now()}`,
            vehicle_id: Number(vehicleId),
            latitude,
            longitude,
            timestamp: new Date().toISOString()
        };

        await db.collection('pings').insertOne(newPing);

        // Set the Location header as instructed
        res.setHeader('Location', `/v1/api/vehicles/${vehicleId}/pings/${newPing.id}`);

        // Return 201 Created
        res.status(201).json(newPing);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router