
const express = require('express');
const {seedData} = require('../db')



const router = express.Router();

// ---------------------------------------------------------
// 2. Districts
// ---------------------------------------------------------

// GET /districts (Collection)
router.get('/', (req, res) => {
    res.status(200).json(seedData.districts);
});

// GET /districts/:district-id (Atomic member)
router.get('/:districtId', (req, res) => {
    const id = req.params.districtId;
    const district = seedData.districts.find(d => d.id == id);
    
    if (district) {
        res.status(200).json(district);
    } else {
        res.status(404).json({ error: "District not found" });
    }
});


module.exports = router