// src/api/axiosConfig.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/', // **IMPORTANT: Replace with your actual API base URL**
    timeout: 10000, // Request will timeout after 10 seconds
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Optional: Request Interceptor (e.g., to add auth token)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken'); // Assuming you store your token here
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Optional: Response Interceptor (e.g., to handle global errors like 401)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized: Redirecting to login...');
            // Example: Redirect to login page
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;