const express = require('express');
const router = express.Router();
const sparql = require('../sparql');

router.get('/', async (req, res) => {
  try {
    const accommodations = await sparql.getAllAccommodations();
    res.json(accommodations);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;