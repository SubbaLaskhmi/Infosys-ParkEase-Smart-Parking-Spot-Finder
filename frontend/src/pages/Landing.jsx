import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, CheckCircle, Shield, Zap, Star, Menu, X, ArrowRight, Clock, CreditCard, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import ParkingMap from '../components/ParkingMap';
import { useTheme } from '../context/ThemeContext';

// Animations
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const Landing = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [parkings, setParkings] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const { theme, toggleTheme } = useTheme();

    // Fetch real parking data
    useEffect(() => {
        const fetchParkings = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5002/api'}/parkings`);
                setParkings(data);
            } catch (error) {
                console.error("Failed to fetch listings", error);
            }
        };
        fetchParkings();

        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/find?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white font-sans overflow-x-hidden selection:bg-purple-500/30 transition-colors duration-300">

            {/* Navbar */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 py-4' : 'bg-transparent py-6'}`}>
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white">P</div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                            ParkEase
                        </span>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition">Features</a>
                        <a href="#map" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition">Live Map</a>
                        <a href="#testimonials" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition">Testimonials</a>
                    </nav>

                    <div className="hidden md:flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <Link to="/login" className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
                            Login
                        </Link>
                        <Link to="/register" className="px-6 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                            Sign Up
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="flex items-center gap-4 md:hidden">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button className="text-black dark:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-white dark:bg-black pt-24 px-6 md:hidden"
                    >
                        <div className="flex flex-col gap-6 text-center">
                            <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-gray-900 dark:text-white">Features</a>
                            <a href="#map" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-gray-900 dark:text-white">Live Map</a>
                            <Link to="/login" className="py-3 rounded-xl bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white font-bold">Login</Link>
                            <Link to="/register" className="py-3 rounded-xl bg-blue-600 text-white font-bold">Sign Up</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 min-h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 dark:bg-purple-600/30 rounded-full blur-[120px] -z-10 animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[120px] -z-10"></div>

                <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto z-10">
                    <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Live in Bengaluru</span>
                    </motion.div>

                    <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                        Parking Made <br className="hidden md:block" /> <span className="text-blue-600 dark:text-blue-500">Effortless.</span>
                    </motion.h1>

                    <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Find and book secure parking spots in seconds. Save time, money, and fuel with our AI-powered smart parking network.
                    </motion.p>

                    <motion.div variants={fadeInUp} className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-lg mx-auto">
                        <div className="relative group w-full">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-20 dark:opacity-50 group-hover:opacity-100 transition duration-200"></div>
                            <div className="relative flex items-center bg-white dark:bg-black rounded-full p-2 pl-6 shadow-xl dark:shadow-none">
                                <Search className="text-gray-400 mr-3" size={20} />
                                <input
                                    type="text"
                                    placeholder="Where are you going?"
                                    className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder:text-gray-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                />
                                <button
                                    onClick={handleSearch}
                                    className="bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition"
                                >
                                    Go
                                </button>
                            </div>
                        </div>
                    </motion.div>


                </motion.div>
            </section>

            {/* Live Map Section */}
            <section id="map" className="py-20 px-6 relative bg-gray-50 dark:bg-gradient-to-t dark:from-gray-900 dark:to-black">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-green-400 dark:to-blue-500">Live Availability</h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-4">See available spots in real-time across the city.</p>
                    </div>

                    <div className="h-[500px] w-full rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl dark:shadow-2xl dark:shadow-blue-900/20 relative group">
                        <ParkingMap parkings={parkings} />

                        <div className="absolute bottom-6 left-6 z-[400] bg-white/90 dark:bg-black/80 backdrop-blur-xl p-4 rounded-2xl border border-gray-200 dark:border-white/10 max-w-xs shadow-lg">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg text-blue-600 dark:text-blue-400">
                                    <Zap size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">Smart Match</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Our AI suggests the best spot based on your destination and price preferences.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-32 px-6 bg-white dark:bg-black relative transition-colors duration-300">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Shield, title: "100% Secure", desc: "24/7 surveillance and gated access for all premium spots.", color: "text-green-500 dark:text-green-400" },
                            { icon: Clock, title: "Lighting Fast", desc: "Book in under 30 seconds. Scan QR to enter. No tickets.", color: "text-blue-500 dark:text-blue-400" },
                            { icon: CreditCard, title: "Cashless", desc: "Pay via UPI, Card, or Wallet. Automated refunds.", color: "text-purple-500 dark:text-purple-400" }
                        ].map((feature, idx) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                key={idx}
                                className="p-8 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10 hover:shadow-xl dark:hover:bg-white/10 transition-all group"
                            >
                                <div className={`w-14 h-14 rounded-2xl bg-white dark:bg-white/5 flex items-center justify-center mb-6 shadow-sm dark:shadow-none group-hover:scale-110 transition-transform ${feature.color}`}>
                                    <feature.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Premium CTA */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto relative rounded-[3rem] overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-900 dark:to-purple-900 border border-white/10 shadow-2xl">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                    <div className="relative z-10 px-8 py-20 text-center">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Ready to upgrade your commute?</h2>
                        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">Join 10,000+ drivers saving time every day.</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link to="/register" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-2">
                                Get Started Free <ArrowRight size={20} />
                            </Link>
                            <Link to="/login" className="px-8 py-4 bg-black/30 backdrop-blur-md text-white font-bold rounded-full border border-white/20 hover:bg-black/50 transition-colors">
                                View Demo
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-gray-200 dark:border-white/10 text-center text-gray-500 text-sm bg-white dark:bg-black transition-colors duration-300">
                <p>&copy; 2026 ParkEase Systems. Crafted for Excellence.</p>
            </footer>
        </div>
    );
};

export default Landing;
