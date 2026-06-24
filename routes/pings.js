const express = require('express');
const db = require('../db');
const { paginate } = require('../pagination');


const router = express.Router();

// GET /api/pings?vehicle_id=1&from=...&to=...&page=1&limit=100
router.get('/', (req, res) => {
  let pings = db.pings;

  if (req.query.vehicle_id !== undefined) {
    const vehicleId = Number(req.query.vehicle_id);
    if (!db.vehiclesById.has(vehicleId)) {
      return res.status(404).json({ error: `Vehicle ${req.query.vehicle_id} not found` });
    }
    pings = db.pingsByVehicleId.get(vehicleId) || [];
  }

  const { from, to } = req.query;
  if (from) {
    const fromDate = new Date(from);
    pings = pings.filter((p) => new Date(p.timestamp) >= fromDate);
  }
  if (to) {
    const toDate = new Date(to);
    pings = pings.filter((p) => new Date(p.timestamp) <= toDate);
  }

  const { data, meta } = paginate(pings, req);
  res.json({ data, meta });
});

// GET /api/pings/:id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const ping = db.pingsById.get(id);
  if (!ping) {
    return res.status(404).json({ error: `Ping ${req.params.id} not found` });
  }
  res.json({ data: ping });
});

module.exports = router;
