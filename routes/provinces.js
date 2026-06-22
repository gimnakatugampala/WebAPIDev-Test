const express = require('express');
const db = require('../db');

const router = express.Router();


// @method GET 
// @route /v1/api/provinces
// @access public 
// @desc Get all provinces 
router.get('/', (req, res) => {
  res.json({ data: db.provinces, meta : { total: db.provinces.length } });
});


// @method GET 
// @route /v1/api/provinces/:id
// @access public 
// @desc Get single province
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const province = db.provincesById.get(id);

  if (!province) {
    return res.status(404).json({ error: `Province ${req.params.id} not found` });
  }

  res.json({ data: province });
});


module.exports = router;
