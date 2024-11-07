const express = require('express');
const router = express.Router();
const { getStatistics, getBarChart, getPieChart } = require('../controllers/statsController');

// Route for fetching statistics data
router.get('/statistics', getStatistics);

// Route for fetching bar chart data
router.get('/barchart', getBarChart);

// Route for fetching pie chart data
router.get('/piechart', getPieChart);

module.exports = router;
