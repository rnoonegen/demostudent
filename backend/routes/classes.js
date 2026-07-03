const express = require('express');
const { store } = require('../data/store');
const { GROWTH_DIMENSIONS } = require('../data/constants');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    ...store.classOverview,
    dimensions: GROWTH_DIMENSIONS,
  });
});

module.exports = router;
