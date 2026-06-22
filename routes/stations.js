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

module.exports = router;
