const db = require('./db');

const logWeatherSearch = (userId, city, weatherInfo, callback) => {
    const sql = 'INSERT INTO weather_searches (user_id, city, weather_info) VALUES (?, ?, ?)';
    db.query(sql, [userId, city, weatherInfo], callback);
};

const getSearchReports = (callback) => {
    const sql = `
        SELECT users.username, weather_searches.city, weather_searches.weather_info, weather_searches.searched_at
        FROM weather_searches
        JOIN users ON weather_searches.user_id = users.id
        ORDER BY weather_searches.searched_at DESC`;
    db.query(sql, callback);
};

module.exports = { logWeatherSearch, getSearchReports };
