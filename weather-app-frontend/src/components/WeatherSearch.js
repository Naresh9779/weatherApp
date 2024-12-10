import React, { useState } from 'react';
import { searchWeather } from '../services/api';

const WeatherSearch = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await searchWeather({ city });
            setWeatherData(data);
        } catch (error) {
            alert('Failed to fetch weather data.');
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    placeholder="Enter city" 
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Search</button>
            </form>

            {weatherData && (
                <div style={styles.weatherInfo}>
                    <h3 style={styles.cityName}>Weather in {city}</h3>
                    <p style={styles.weatherDetail}>Temperature: {weatherData.current.temperature}°C</p>
                    <p style={styles.weatherDetail}>Description: {weatherData.current.weather_descriptions[0]}</p>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginBottom: '20px',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        outline: 'none',
    },
    button: {
        padding: '10px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
    },
    weatherInfo: {
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#f0f0f0',
        borderRadius: '5px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    cityName: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    weatherDetail: {
        fontSize: '16px',
        margin: '5px 0',
    },
};

export default WeatherSearch;
