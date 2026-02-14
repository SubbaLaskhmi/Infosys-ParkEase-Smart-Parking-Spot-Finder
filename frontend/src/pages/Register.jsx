import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff, Sun, Moon } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState('USER');
    const [error, setError] = useState('');

    const { register, googleLogin } = useAuth() || {};
    const { theme, toggleTheme } = useTheme();
    const { addToast } = useToast();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!register) {
            setError("Auth System unavailable.");
            return;
        }
        const res = await register(name, email, password, role);
        if (!res.success) {
            setError(res.message);
            addToast(res.message, 'error');
        } else {
            addToast('Registration Successful!', 'success');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#050505] relative overflow-hidden font-sans selection:bg-purple-500/30 transition-colors duration-300">
            {/* Ambient Background */}
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-400/20 dark:bg-purple-600/10 blur-[120px]" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-[120px]" />

            {/* Theme Toggle Button */}
            <button
                onClick={toggleTheme}
                className="absolute top-6 right-6 p-3 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 hover:bg-white/20 dark:hover:bg-white/10 transition-all z-50 shadow-lg"
            >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md z-10 p-8 rounded-3xl bg-white/70 dark:bg-black/40 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-2xl relative"
            >
                <Link to="/" className="absolute top-6 left-6 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                    <ArrowLeft size={20} />
                </Link>

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Join ParkEase</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Create your smart parking account</p>
                </div>

                {error && <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 p-3 rounded-xl mb-6 text-sm text-center">{error}</div>}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="relative group">
                        <User className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors" size={18} />
                        <input
                            type="text"
                            className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl pl-12 pr-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-blue-50/50 dark:focus:bg-white/5 transition-all"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Full Name"
                            required
                        />
                    </div>

                    <div className="relative group">
                        <Mail className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500 group-focus-within:text-purple-500 dark:group-focus-within:text-purple-400 transition-colors" size={18} />
                        <input
                            type="email"
                            className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl pl-12 pr-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-purple-50/50 dark:focus:bg-white/5 transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            required
                        />
                    </div>

                    <div className="relative group">
                        <Lock className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500 group-focus-within:text-pink-500 dark:group-focus-within:text-pink-400 transition-colors" size={18} />
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl pl-12 pr-12 py-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-pink-500/50 focus:bg-pink-50/50 dark:focus:bg-white/5 transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
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

                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <button
                            type="button"
                            onClick={() => setRole('USER')}
                            className={`py-3 rounded-xl border text-sm font-bold transition-all ${role === 'USER' ? 'bg-blue-600/20 border-blue-500 text-blue-600 dark:text-blue-400' : 'bg-white/5 border-gray-200 dark:border-white/5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10'}`}
                        >
                            Driver
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('PROVIDER')}
                            className={`py-3 rounded-xl border text-sm font-bold transition-all ${role === 'PROVIDER' ? 'bg-purple-600/20 border-purple-500 text-purple-600 dark:text-purple-400' : 'bg-white/5 border-gray-200 dark:border-white/5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10'}`}
                        >
                            Owner
                        </button>
                    </div>

                    <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3.5 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg mt-4">
                        Create Account
                    </button>

                    <div className="flex justify-center pt-2">
                        <div className="grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100">
                            <GoogleLogin
                                onSuccess={async (res) => { if (googleLogin) await googleLogin(res.credential); }}
                                onError={() => setError('Signup Failed')}
                                theme={theme === 'dark' ? "filled_black" : "outline"}
                                shape="circle"
                            />
                        </div>
                    </div>
                </form>

                <p className="text-center mt-6 text-gray-500 text-sm">
                    Already have an account? <Link to="/login" className="text-gray-900 dark:text-white font-bold hover:underline decoration-blue-500 underline-offset-4">Login</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
