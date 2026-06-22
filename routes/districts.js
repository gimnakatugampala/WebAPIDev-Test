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


module.exports = router;
