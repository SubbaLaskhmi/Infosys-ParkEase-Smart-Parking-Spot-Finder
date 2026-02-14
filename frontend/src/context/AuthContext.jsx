import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        console.error("useAuth must be used within an AuthProvider");
        // Returning a dummy object to prevent destructuring crashes in components
        return {
            user: null,
            loading: false,
            login: () => Promise.resolve({ success: false, message: "Auth Error" }),
            register: () => Promise.resolve({ success: false, message: "Auth Error" }),
            googleLogin: () => Promise.resolve({ success: false, message: "Auth Error" }),
            logout: () => { },
            token: null
        };
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    // console.log("AuthProvider: Initializing...");

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const logout = () => {
        // console.log("AuthProvider: Logging out...");
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        try {
            navigate('/login');
        } catch (e) {
            console.error("Navigation failed during logout (safe to ignore if initialization):", e);
        }
    };

    // Axios Interceptor for Authorization
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
        }
    }, [token]);

    // Check if user is already logged in (Token persistence)
    useEffect(() => {
        const checkLoggedIn = async () => {
            if (token) {
                try {
                    const decoded = jwtDecode(token);

                    if (decoded.exp * 1000 < Date.now()) {
                        console.warn("AuthProvider: Token expired");
                        logout();
                        setLoading(false);
                        return;
                    }

                    // Timeout promise to prevent hanging (5s)
                    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000));
                    const apiPromise = axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5002/api'}/auth/me`);

                    const { data } = await Promise.race([apiPromise, timeoutPromise]);
                    setUser(data);
                } catch {
                    console.error("AuthProvider: Auth check failed:");
                    logout();
                }
            } else if (user) {
                // Self-healing: User exists in state but token is missing (Ghost Session)
                console.warn("AuthProvider: Detected inconsistent state (User set but no Token). Forcing logout.");
                logout();
            }
            setLoading(false);
        };
        checkLoggedIn();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const login = async (email, password) => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5002/api'}/auth/login`, { email, password });
            setToken(data.token);
            setUser(data);
            redirectUser(data.role);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const register = async (name, email, password, role) => {
        try {
            // Map 'DRIVER' (frontend label) to 'USER' (backend enum), or default to 'USER'
            const validRole = (role === 'DRIVER' || !role) ? 'USER' : role;

            const { data } = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5002/api'}/auth/register`, {
                name,
                email,
                password,
                role: validRole
            });

            if (data.token) {
                setToken(data.token);
                setUser(data);
                redirectUser(data.role);
                return { success: true };
            } else {
                return { success: false, message: "Registration successful but auto-login failed. Please login manually." };
            }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed'
            };
        }
    };

    const googleLogin = async (credential) => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5002/api'}/auth/google`, { token: credential });
            setToken(data.token);
            setUser(data);
            redirectUser(data.role);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Google Login failed'
            };
        }
    };



    const redirectUser = (role) => {
        // console.log("Redirecting user with role:", role);
        if (role === 'ADMIN') navigate('/admin');
        else if (role === 'PROVIDER') navigate('/owner');
        else navigate('/driver');
    };

    return (
        <AuthContext.Provider value={{ user, setUser, token, login, register, googleLogin, logout, loading }}>
            {loading ? (
                <div className="min-h-screen bg-black text-white flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-xl font-bold animate-pulse">ParkEase Initializing...</h2>
                        <p className="text-gray-500 text-sm mt-2">Checking authentication status</p>
                    </div>
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};
