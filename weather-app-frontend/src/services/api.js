import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000',
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) req.headers.Authorization = token;
    return req;
});

export const signup = (data) => API.post('/auth/signup', data);
export const login = (data) => API.post('/auth/login', data);
export const searchWeather = (data) => API.post('/weather/search', data);
export const getReports = () => API.get('/weather/reports');
