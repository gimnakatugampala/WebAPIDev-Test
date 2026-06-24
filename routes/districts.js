const express = require('express');
const db = require('../db');

const router = express.Router();


// @method GET 
// @route /v1/api/districts
// @access public 
// @desc Get all districts 
router.get('/', (req, res) => {
  res.json({ data: db.districts, meta : { total: db.districts.length } });
});

// @method GET 
// @route /v1/api/districts/:id
// @access public 
// @desc Get single district
router.get('/:id', (req, res) => {

    const id = Number(req.params.id);
    const district = db.districtsById.get(id);

    if (!district) {
        return res.status(404).json({ error: `District ${req.params.id} not found` });
    }

    res.json({ data: district });
});


// @method GET 
// @route /v1/api/districts/:id/stations
// @access public 
// @desc Get Stations according to districts id
router.get('/:id/stations', (req, res) => {
  const id = Number(req.params.id);

  if (!db.districtsById.has(id)) {
    return res.status(404).json({ error: `Districts ${req.params.id} not found` });
  }

  const stations = db.stationsByDistrictId.get(id) || [];
  res.json({ data: stations, meta: { total: stations.length, district_id: id } });

});

// GET /api/stations?district_id=1
router.get('/', (req, res) => {
  let stations = db.stations;

  if (req.query.district_id !== undefined) {
    const districtId = Number(req.query.district_id);
    if (!db.districtsById.has(districtId)) {
      return res.status(404).json({ error: `District ${req.query.district_id} not found` });
    }
    stations = db.stationsByDistrictId.get(districtId) || [];
  }

  res.json({ data: stations, meta: { total: stations.length } });
});

module.exports = router;
