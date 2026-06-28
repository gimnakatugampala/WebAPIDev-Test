
const express = require('express');
const {seedData} = require('../db')



const router = express.Router();


// ---------------------------------------------------------
// 1. Provinces
// ---------------------------------------------------------

// GET /provinces (Collection)
router.get('/', (req, res) => {
    res.status(200).json(seedData.provinces);
});

// GET /provinces/:province-id (Atomic member)
router.get('/:provinceId', (req, res) => {
    const id = req.params.provinceId;
    const province = seedData.provinces.find(p => p.id == id);
    
    if (province) {
        res.status(200).json(province);
    } else {
        res.status(404).json({ error: "Province not found" });
    }
});


module.exports = router