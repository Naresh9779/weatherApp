const express = require('express');
const { searchWeather, getReports } = require('../controllers/weatherController');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

router.post('/search', authenticateToken, searchWeather);
router.get('/reports', authenticateToken, getReports);

module.exports = router;
