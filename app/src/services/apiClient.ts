import axios from 'axios';

export const api = axios.create({
    // 1. The central place for your URL
    baseURL: import.meta.env.VITE_API_BASE_URL as string || '/api',

    // 2. Set default headers for every request
    // headers: {
    //     'Content-Type': 'application/json',
    // },

    // // 3. Essential if you are using Cookies/Sessions
    // withCredentials: true,
});

/**
 * OPTIONAL: The "Interceptor"
 * This is where you'd handle things like adding a Bearer token 
 * from localStorage or handling 401 Unauthorized errors globally.
 */
api.interceptors.request.use((config) => {
    //   const token = localStorage.getItem('auth_token');
    //   if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    //   }
    return config;
});