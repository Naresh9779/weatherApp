const axios = require('axios');
const { logWeatherSearch, getSearchReports } = require('../models/weatherModel');

const searchWeather = async (req, res) => {
    const { city } = req.body;
    const userId = req.user.id;

    try {
        const response = await axios.get(`http://api.weatherstack.com/current`, {
            params: { access_key: process.env.WEATHER_API_KEY, query: city },
        });

        const weatherInfo = response.data;
        
        logWeatherSearch(userId, city, JSON.stringify(weatherInfo), (err) => {
            if (err) return res.status(500).json({ message: 'Error logging weather search' });
            res.status(200).json(weatherInfo);
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching weather data' });
    }
};

const getReports = (req, res) => {
    getSearchReports((err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching reports' });
        res.status(200).json(results);
        
    });
};

module.exports = { searchWeather, getReports };
