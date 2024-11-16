import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://storeapi-production-ac79.up.railway.app',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
