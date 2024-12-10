import React, { useEffect, useState } from 'react';
import { getReports } from '../services/api';

const Report = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const { data } = await getReports();
                setReports(data);
            } catch (error) {
                alert('Failed to fetch reports.');
            }
        };

        fetchReports();
    }, []);

    const formatWeatherInfo = (weatherInfo) => {
        // Parsing the string into a JavaScript object
        const parsedWeatherInfo = JSON.parse(weatherInfo);
        console.log(parsedWeatherInfo)
        
        return {
            location: `${parsedWeatherInfo.location.name}, ${parsedWeatherInfo.location.country}`,
            region: parsedWeatherInfo.location.region,
            temp: parsedWeatherInfo.current.temperature,
        };
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Search Reports</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>User</th>
                        <th style={styles.tableHeader}>City</th>
                        <th style={styles.tableHeader}>Weather Info</th>
                        <th style={styles.tableHeader}>Searched At</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report, index) => {
                        const formattedWeatherInfo = formatWeatherInfo(report.weather_info);

                        return (
                            <tr key={index} style={styles.tableRow}>
                                <td>{report.username}</td>
                                <td>{report.city}</td>
                                <td>
                                    <div><strong>Location:</strong> {formattedWeatherInfo.location}</div>
                                    <div><strong>Region:</strong> {formattedWeatherInfo.region}</div>
                                    <div><strong>Temperature:</strong> {formattedWeatherInfo.temp} °C</div>
                                </td>
                                <td>{report.searched_at}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        margin: '0 auto',
    },
    heading: {
        textAlign: 'center',
        fontSize: '24px',
        marginBottom: '20px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    },
    tableHeader: {
        backgroundColor: '#007BFF',
        color: '#fff',
        padding: '12px',
        textAlign: 'left',
        fontSize: '16px',
    },
    tableRow: {
        backgroundColor: '#f9f9f9',
        borderBottom: '1px solid #ddd',
        transition: 'background-color 0.3s ease',
    },
};

export default Report;
