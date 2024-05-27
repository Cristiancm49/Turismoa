const express = require('express');
const router = express.Router();
const sparql = require('../sparql');

router.get('/', async (req, res) => {
  try {
    const food = await sparql.getAllFood();
    res.json(food);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;