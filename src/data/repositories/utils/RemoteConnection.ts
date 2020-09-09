import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.ldrpontes.me',
    timeout: 100000,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
});

api.interceptors.request.use(async config => {
    const token = await sessionStorage.getItem('token')
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
});

export default api

export const instance = axios.create({
    timeout: 100000
});