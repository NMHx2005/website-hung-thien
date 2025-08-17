import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '@/utils/axios';
import Cookies from 'js-cookie';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const accessToken = localStorage.getItem('access_token');
            if (!accessToken) {
                throw new Error('No token');
            }

            await axios.get('/api/auth/me');
            setIsAuthenticated(true);
        } catch {
            // Try to refresh token
            try {
                const refreshToken = Cookies.get('refresh_token');
                if (!refreshToken) throw new Error('No refresh token');

                const { data } = await axios.post('/api/auth/refresh-token', {
                    refreshToken,
                });

                localStorage.setItem('access_token', data.accessToken);
                Cookies.set('refresh_token', data.refreshToken, { 
                    expires: 30, // 30 days
                    secure: true,
                    sameSite: 'strict'
                });
                setIsAuthenticated(true);
            } catch {
                setIsAuthenticated(false);
                navigate('/admin/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        const { data } = await axios.post('/api/auth/login', {
            email,
            password,
        });

        localStorage.setItem('access_token', data.accessToken);
        Cookies.set('refresh_token', data.refreshToken, { 
            expires: 30, // 30 days
            secure: true,
            sameSite: 'strict'
        });
        setIsAuthenticated(true);
        navigate('/admin');
    };

    const logout = async () => {
        try {
            await axios.post('/api/auth/logout');
        } finally {
            localStorage.removeItem('access_token');
            Cookies.remove('refresh_token');
            setIsAuthenticated(false);
            navigate('/admin/login');
        }
    };

    return { isAuthenticated, loading, login, logout };
}; 