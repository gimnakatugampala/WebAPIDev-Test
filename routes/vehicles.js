const express = require('express');
const db = require('../db');

const router = express.Router();


// @method GET 
// @route /v1/api/vehicles
// @access public 
// @desc Get all vehicles 
router.get('/', (req, res) => {
  res.json({ data: db.vehicles, meta : { total: db.vehicles.length } });
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

module.exports = router;
