import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { useToast } from '../context/ToastContext';
import { ArrowLeft, User, Lock, Mail, Eye, EyeOff, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [activeRole, setActiveRole] = useState('USER');

    const { login, googleLogin } = useAuth() || {};
    const { theme, toggleTheme } = useTheme();
    const { addToast } = useToast();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        if (!login) {
            setError("Auth System unavailable.");
            return;
        }
        try {
            const res = await login(email, password);
            if (!res.success) {
                setError(res.message);
                addToast(res.message, 'error');
            } else {
                addToast('Login Successful!', 'success');
            }
        } catch (error) {
            console.error(error);
            setError("Login failed. Please try again.");
            addToast("Login failed.", 'error');
        }
    };

    const tabs = [
        { id: 'USER', label: 'Driver' },
        { id: 'PROVIDER', label: 'Space Owner' },
        { id: 'ADMIN', label: 'Admin' }
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#050505] relative overflow-hidden font-sans selection:bg-blue-500/30 transition-colors duration-300">
            {/* Ambient Background - Adaptive */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-400/20 dark:bg-purple-600/10 blur-[120px]" />

            {/* Theme Toggle Button */}
            <button
                onClick={toggleTheme}
                className="absolute top-6 right-6 p-3 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 hover:bg-white/20 dark:hover:bg-white/10 transition-all z-50 shadow-lg"
            >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md z-10 p-8 rounded-3xl bg-white/70 dark:bg-black/40 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-2xl relative"
            >
                {/* Home Button */}
                <Link to="/" className="absolute top-6 left-6 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                    <ArrowLeft size={20} />
                </Link>

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white font-bold text-xl mb-4 shadow-lg shadow-blue-500/20">
                        P
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Sign in to access your dashboard</p>
                </div>

                {/* Role Tabs */}
                <div className="flex p-1 bg-gray-100 dark:bg-black/40 rounded-xl mb-8 border border-gray-200 dark:border-white/5">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveRole(tab.id)}
                            className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${activeRole === tab.id
                                ? 'bg-white dark:bg-white/10 text-black dark:text-white shadow-md border border-gray-200 dark:border-white/10'
                                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 p-3 rounded-xl mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors" size={18} />
                            <input
                                type="email"
                                className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl pl-12 pr-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-blue-50/50 dark:focus:bg-white/5 transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="flex justify-between ml-1">
                            <label className="text-xs font-bold text-gray-500 uppercase">Password</label>
                            <Link to="/forgot-password" className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors">Forgot?</Link>
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500 group-focus-within:text-purple-500 dark:group-focus-within:text-purple-400 transition-colors" size={18} />
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl pl-12 pr-12 py-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-purple-50/50 dark:focus:bg-white/5 transition-all"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-3.5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-white transition-colors focus:outline-none"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3.5 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-blue-900/20 mt-2">
                        Sign In as {tabs.find(t => t.id === activeRole)?.label}
                    </button>

                    <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200 dark:border-white/10"></span></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-gray-50 dark:bg-[#0e0e11] px-2 text-gray-500">Or</span></div>
                    </div>

                    <div className="flex justify-center">
                        {/* Wrapper for Google Button to fit design style */}
                        <div className="grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100">
                            <GoogleLogin
                                onSuccess={async (res) => {
                                    if (googleLogin) await googleLogin(res.credential);
                                }}
                                onError={() => setError('Google Login Failed')}
                                theme={theme === 'dark' ? "filled_black" : "outline"}
                                shape="circle"
                            />
                        </div>
                    </div>
                </form>

                <p className="text-center mt-8 text-gray-500 text-sm">
                    New to ParkEase? <Link to="/register" className="text-blue-600 dark:text-white font-bold hover:underline decoration-blue-500 underline-offset-4">Create Account</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
