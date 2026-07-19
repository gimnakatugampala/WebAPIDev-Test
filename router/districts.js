const express = require('express');
const { getDB } = require('../db')



const router = express.Router();

// ---------------------------------------------------------
// 2. Districts
// ---------------------------------------------------------

// GET /districts (Collection)
router.get('/', async (req, res) => {
    try {
        const db = getDB();
        const districts = await db.collection('districts').find({}).toArray();
        res.status(200).json(districts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET /districts/:district-id (Atomic member)
router.get('/:districtId', async (req, res) => {
    try {
        const db = getDB();
        const id = Number(req.params.districtId);
        const district = await db.collection('districts').findOne({ id });

        if (district) {
            res.status(200).json(district);
        } else {
            res.status(404).json({ error: "District not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router