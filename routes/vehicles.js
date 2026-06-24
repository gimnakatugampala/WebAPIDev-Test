const express = require('express');
const db = require('../db');
const paginate = require('../pagination')

const router = express.Router();


// @method GET 
// @route /api/vehicles?station_id=4&page=1&limit=50
// @access public 
// @desc Get all vehicles 
router.get('/', (req, res) => {
  let vehicles = db.vehicles;

  if (req.query.station_id !== undefined) {
    const stationId = Number(req.query.station_id);
    if (!db.stationsById.has(stationId)) {
      return res.status(404).json({ error: `Station ${req.query.station_id} not found` });
    }
    vehicles = db.vehiclesByStationId.get(stationId) || [];
  }

  const { data, meta } = paginate(vehicles, req);
  res.json({ data, meta });
});
// @method GET 
// @route /v1/api/vehicles/:id
// @access public 
// @desc Get single vehicle
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const vehicle = db.vehiclesById.get(id);

  if (!vehicle) {
    return res.status(404).json({ error: `Vehicle ${req.params.id} not found` });
  }

  res.json({ data: vehicle });
});


// @method GET 
// @route /api/vehicles/:id/pings?from=2026-06-15T00:00:00Z&to=2026-06-16T00:00:00Z&page=1&limit=100
// @access public 
// @desc Get single vehicle
router.get('/:id/pings', (req, res) => {
  const id = Number(req.params.id);
  if (!db.vehiclesById.has(id)) {
    return res.status(404).json({ error: `Vehicle ${req.params.id} not found` });
  }

  let pings = db.pingsByVehicleId.get(id) || [];

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
  res.json({ data, meta: { ...meta, vehicle_id: id } });
});


// @method GET 
// @route /api/vehicles/:id/pings/latest
// @access public 
// @desc Get single vehicle
router.get('/:id/pings/latest', (req, res) => {
  const id = Number(req.params.id);
  if (!db.vehiclesById.has(id)) {
    return res.status(404).json({ error: `Vehicle ${req.params.id} not found` });
  }

  const pings = db.pingsByVehicleId.get(id) || [];
  if (pings.length === 0) {
    return res.status(404).json({ error: `No pings found for vehicle ${id}` });
  }

  res.json({ data: pings[pings.length - 1] });
});




module.exports = router;
