import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '@/utils/axios';
import Cookies from 'js-cookie';

interface UseAuthOptions {
    skipInitialCheck?: boolean;
}

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

const hasToken = () => Boolean(localStorage.getItem(ACCESS_TOKEN_KEY));

export const useAuth = (options: UseAuthOptions = {}) => {
    const { skipInitialCheck = false } = options;
    const navigate = useNavigate();
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(hasToken());
    const [loading, setLoading] = useState<boolean>(!skipInitialCheck);

    const clearTokens = useCallback(() => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        Cookies.remove(REFRESH_TOKEN_KEY);
    }, []);

    useEffect(() => {
        if (skipInitialCheck) {
            setLoading(false);
            return;
        }

        let isMounted = true;

        const verify = async () => {
            setLoading(true);
            try {
                await axios.get('/api/auth/me');
                if (isMounted) {
                    setIsAuthenticated(true);
                }
            } catch {
                try {
                    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY) || Cookies.get(REFRESH_TOKEN_KEY);
                    if (!refreshToken) {
                        throw new Error('Missing refresh token');
                    }

                    const response = await axios.post<{ success: boolean; accessToken: string; refreshToken: string }>('/api/auth/refresh-token', {
                        refreshToken
                    });

                    const { accessToken, refreshToken: newRefreshToken } = response.data;

                    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
                    localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken);
                    Cookies.set(REFRESH_TOKEN_KEY, newRefreshToken, {
                        expires: 30,
                        secure: true,
                        sameSite: 'strict'
                    });

                    if (isMounted) {
                        setIsAuthenticated(true);
                    }
                } catch {
                    if (isMounted) {
                        setIsAuthenticated(false);
                    }
                    clearTokens();
                    if (location.pathname !== '/admin/login') {
                        navigate('/admin/login', { replace: true });
                    }
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        verify();

        return () => {
            isMounted = false;
        };
    }, [navigate, location.pathname, skipInitialCheck, clearTokens]);

    const login = useCallback(async (email: string, password: string) => {
        const response = await axios.post<{ success: boolean; accessToken: string; refreshToken: string }>('/api/auth/login', {
            email,
            password
        });

        const { accessToken, refreshToken } = response.data;

        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        Cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
            expires: 30,
            secure: true,
            sameSite: 'strict'
        });
        setIsAuthenticated(true);
        navigate('/admin', { replace: true });
    }, [navigate]);

    const logout = useCallback(async () => {
        try {
            await axios.post('/api/auth/logout');
        } catch (error) {
            console.warn('Logout failed:', error);
        } finally {
            clearTokens();
            setIsAuthenticated(false);
            navigate('/admin/login', { replace: true });
        }
    }, [navigate, clearTokens]);

    return useMemo(
        () => ({
            isAuthenticated,
            loading,
            login,
            logout
        }),
        [isAuthenticated, loading, login, logout]
    );
};
