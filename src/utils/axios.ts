import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
    // baseURL: import.meta.env.VITE_API_URL,
    baseURL: "http://localhost:8080",
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Request interceptor
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Allow Content-Type to be overridden for file uploads
        if (config.data instanceof FormData) {
            delete config.headers['Content-Type'];
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh_token') || Cookies.get('refresh_token');
                if (!refreshToken) {
                    throw new Error('Missing refresh token');
                }
                const response = await instance.post('/api/auth/refresh-token', {
                    refreshToken,
                });

                const { accessToken, refreshToken: newRefreshToken } = response.data;

                localStorage.setItem('access_token', accessToken);
                localStorage.setItem('refresh_token', newRefreshToken);
                Cookies.set('refresh_token', newRefreshToken, {
                    expires: 30,
                    secure: true,
                    sameSite: 'strict'
                });

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return instance(originalRequest);
            } catch (error) {
                // If refresh token fails, redirect to login
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                Cookies.remove('refresh_token');
                window.location.href = '/admin/login';
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export default instance; 