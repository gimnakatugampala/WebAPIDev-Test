const express = require('express');
const db = require('../db');

const router = express.Router();


// @method GET 
// @route /v1/api/stations
// @access public 
// @desc Get all stations 
router.get('/', (req, res) => {
  res.json({ data: db.stations, meta : { total: db.stations.length } });
});


// @method GET 
// @route /v1/api/stations/:id
// @access public 
// @desc Get single station
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const station = db.stationsById.get(id);

  if (!station) {
    return res.status(404).json({ error: `Station ${req.params.id} not found` });
  }

  res.json({ data: station });
});


// @method GET 
// @route /v1/api/stations/:id/vehicles
// @access public 
// @desc Get vehicles according to station id
router.get('/:id/vehicles', (req, res) => {
  const id = Number(req.params.id);

  if (!db.stationsById.has(id)) {
    return res.status(404).json({ error: `station ${req.params.id} not found` });
  }

  const vehicles = db.vehiclesByStationId.get(id) || [];
  res.json({ data: vehicles, meta: { total: vehicles.length, station_id: id } });

});


module.exports = router;
