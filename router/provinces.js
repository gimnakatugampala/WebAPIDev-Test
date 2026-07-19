const express = require('express');
const { getDB } = require('../db')



const router = express.Router();


// ---------------------------------------------------------
// 1. Provinces
// ---------------------------------------------------------

// GET /provinces (Collection)
router.get('/', async (req, res) => {
    try {
        const db = getDB();
        const provinces = await db.collection('provinces').find({}).toArray();
        res.status(200).json(provinces);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET /provinces/:province-id (Atomic member)
router.get('/:provinceId', async (req, res) => {
    try {
        const db = getDB();
        const id = Number(req.params.provinceId);
        const province = await db.collection('provinces').findOne({ id });

        if (province) {
            res.status(200).json(province);
        } else {
            res.status(404).json({ error: "Province not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router