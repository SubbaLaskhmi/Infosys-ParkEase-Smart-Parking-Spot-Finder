import React, { useState, useEffect } from 'react';
import {
    MapPin, CreditCard, Clock, ChevronRight, Car, Navigation, Ticket, Zap,
    TrendingUp, Shield, Bell, Search, Menu, Calendar, Filter, Gift, AlertCircle,
    BarChart3, Map as MapIcon, Layers, Sparkles, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import ParkingMap from '../../components/ParkingMap';
import ParkingService from '../../services/parkingService';

// --- ANIMATION VARIANTS ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 50, damping: 15 }
    }
};

const hoverScaleWithGlow = {
    scale: 1.02,
    boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.2)",
    transition: { duration: 0.3 }
};

// --- COMPONENTS ---

const StatsCard = ({ title, value, subtext, icon: Icon, gradient, index }) => (
    <motion.div
        variants={itemVariants}
        whileHover={hoverScaleWithGlow}
        className={`relative p-6 rounded-3xl overflow-hidden border border-white/10 backdrop-blur-2xl bg-gradient-to-br ${gradient} shadow-2xl group`}
    >
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
            <Icon size={120} className="text-white transform rotate-12 -translate-y-4 translate-x-4" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-white/10 border border-white/20 shadow-inner backdrop-blur-md`}>
                    <Icon size={22} className="text-white" />
                </div>
                {index === 0 && (
                    <div className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1 animate-pulse">
                        <Activity size={10} /> +12%
                    </div>
                )}
            </div>

            <div className="mt-6">
                <h3 className="text-blue-100/60 text-xs font-semibold uppercase tracking-wider mb-1">{title}</h3>
                <div className="text-3xl font-bold text-white mb-2 tracking-tight">{value}</div>
                <div className="flex items-center gap-1.5 text-xs text-white/50">
                    {subtext}
                </div>
            </div>
        </div>
    </motion.div>
);

const TodayPanel = () => (
    <motion.div
        variants={itemVariants}
        whileHover={hoverScaleWithGlow}
        className="col-span-1 md:col-span-2 relative rounded-3xl p-1 overflow-hidden group"
    >
        {/* Animated Border Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-30 blur-xl group-hover:opacity-60 transition-opacity duration-700 animate-gradient-x"></div>

        <div className="relative h-full bg-[#0a0a0a]/90 backdrop-blur-xl rounded-[22px] p-6 border border-white/10 overflow-hidden">
            {/* Live Indicator */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                        Today's Session
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                    </h3>
                    <p className="text-sm text-gray-400 font-medium">Live Parking Status</p>
                </div>
                <div className="px-4 py-1.5 rounded-full bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20 shadow-[0_0_15px_-3px_rgba(74,222,128,0.3)]">
                    ACTIVE NOW
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8 relative z-10">
                <div className="flex flex-col">
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Duration</span>
                    <span className="text-4xl font-mono text-white tracking-widest font-light">02:14:30</span>
                </div>
                <div className="flex flex-col relative">
                    <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Current Cost</span>
                    <span className="text-4xl font-mono text-blue-400 font-medium">₹120.50</span>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-gray-400 border border-white/5">
                        <MapPin size={18} />
                    </div>
                    <div>
                        <div className="text-white font-medium">Phoenix Marketcity</div>
                        <div className="text-gray-500 text-xs">Floor B2, Slot A-12</div>
                    </div>
                </div>
                <button className="px-6 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-sm font-bold rounded-xl border border-red-500/20 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_-5px_rgba(239,68,68,0.3)]">
                    End Session
                </button>
            </div>
        </div>
    </motion.div>
);

const DriverDashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('map'); // map, stats, heatmap
    const [parkings, setParkings] = useState([]);

    useEffect(() => {
        const fetchParkings = async () => {
            try {
                const data = await ParkingService.getAllParkings();
                setParkings(data);
            } catch (error) {
                console.error("Failed to fetch parkings:", error);
            }
        };

        if (activeTab === 'map') {
            fetchParkings();
        }
    }, [activeTab]);

    // Optimized greeting
    const [greeting] = useState(() => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    });

    const spendingData = [
        { name: 'Mon', amount: 120 }, { name: 'Tue', amount: 80 },
        { name: 'Wed', amount: 150 }, { name: 'Thu', amount: 90 },
        { name: 'Fri', amount: 200 }, { name: 'Sat', amount: 350 },
        { name: 'Sun', amount: 180 },
    ];

    const tabs = [
        { id: 'map', label: 'Live Map', icon: MapIcon },
        { id: 'stats', label: 'Analytics', icon: BarChart3 },
        { id: 'heatmap', label: 'Heatmap', icon: Layers },
    ];

    return (
        <div className="w-full text-white font-sans selection:bg-blue-500/30 relative min-h-screen">
            {/* Ultra-Premium Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                {/* Radial gradient background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black" />

                {/* Animated Orbs */}
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/5 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }}></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-600/5 blur-[120px] animate-pulse" style={{ animationDuration: '10s' }}></div>
                <div className="absolute top-[40%] left-[40%] w-[30vw] h-[30vw] rounded-full bg-emerald-500/5 blur-[150px] opacity-50"></div>
            </div>

            <div className="relative z-10 max-w-[1600px] mx-auto space-y-8">

                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-4">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold tracking-wider text-blue-300 uppercase">Driver Portal v2.0</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">
                            {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{user?.name?.split(' ')[0] || 'Driver'}</span>
                        </h1>
                        <p className="text-gray-400 text-lg">Your parking command center is ready.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-4 bg-black/40 backdrop-blur-md p-2 rounded-2xl border border-white/10"
                    >
                        <div className="hidden md:flex items-center gap-3 bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm text-gray-300">
                            <MapPin size={18} className="text-blue-400" />
                            <span className="font-medium">Bengaluru, India</span>
                        </div>
                        <button className="relative w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-white/10 hover:text-white transition-all hover:scale-105 active:scale-95 group">
                            <Bell size={20} className="group-hover:swing" />
                            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-black animate-pulse"></span>
                        </button>
                    </motion.div>
                </header>

                {/* Dashboard Content */}
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 pb-12">

                    {/* Top Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <TodayPanel />
                        <StatsCard index={1} title="Wallet Balance" value={`₹${user?.walletBalance?.toFixed(2) || '0.00'}`} subtext="Available Funds" icon={CreditCard} gradient="from-indigo-600/20 to-blue-900/20" />
                        <StatsCard index={2} title="ParkPoints™" value="1,250" subtext="250 pts to reward" icon={Gift} gradient="from-amber-600/20 to-orange-900/20" />
                    </div>

                    {/* Main Content Area */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 rounded-[32px] p-2 shadow-2xl relative overflow-hidden flex flex-col h-[700px] min-h-[700px]"
                    >
                        {/* Glass Overlay Effect */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                        {/* Toolbar */}
                        <div className="flex flex-col md:flex-row items-center justify-between p-6 gap-6">
                            {/* Floating Tab Bar */}
                            <div className="flex p-1.5 bg-black/40 rounded-2xl border border-white/5 backdrop-blur-md shadow-lg">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`
                                                relative flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300
                                                ${isActive
                                                    ? 'text-white shadow-lg'
                                                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                                                }
                                            `}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeTab"
                                                    className="absolute inset-0 bg-blue-600 rounded-xl"
                                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                />
                                            )}
                                            <span className="relative z-10 flex items-center gap-2">
                                                <Icon size={18} />
                                                {tab.label}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition border border-white/5 text-sm font-medium">
                                    <Filter size={18} /> Filter
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition border border-white/5 text-sm font-medium">
                                    <Calendar size={18} /> Today
                                </button>
                            </div>
                        </div>

                        {/* Content Viewport */}
                        <div className="flex-1 rounded-[24px] overflow-hidden bg-black/20 border border-white/5 relative mx-2 mb-2">
                            <AnimatePresence mode='wait'>
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full h-full"
                                >
                                    {activeTab === 'map' && (
                                        <div className="w-full h-full relative group">
                                            {/* Map Decoration: Scanner Lines */}
                                            <div className="absolute inset-0 pointer-events-none z-10 border-[1px] border-white/5 m-4 rounded-xl opacity-50">
                                                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-500/50 rounded-tl-lg"></div>
                                                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-500/50 rounded-tr-lg"></div>
                                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-500/50 rounded-bl-lg"></div>
                                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-500/50 rounded-br-lg"></div>
                                            </div>
                                            <ParkingMap parkings={parkings} height="100%" />
                                        </div>
                                    )}

                                    {activeTab === 'stats' && (
                                        <div className="w-full h-full p-8 flex flex-col">
                                            <div className="mb-6 flex justify-between items-end">
                                                <div>
                                                    <h3 className="text-2xl font-bold text-white mb-2">Weekly Expenditure</h3>
                                                    <p className="text-gray-400">Analysis of your parking spending trends</p>
                                                </div>
                                                <div className="px-4 py-2 bg-blue-500/10 rounded-lg border border-blue-500/20 text-blue-400 text-sm font-code">
                                                    Avg: ₹142/day
                                                </div>
                                            </div>
                                            <div className="flex-1 w-full min-h-[400px]">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <AreaChart data={spendingData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                                        <defs>
                                                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6} />
                                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                                            </linearGradient>
                                                        </defs>
                                                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                                        <XAxis
                                                            dataKey="name"
                                                            stroke="#666"
                                                            tickLine={false}
                                                            axisLine={false}
                                                            dy={10}
                                                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                                                        />
                                                        <YAxis
                                                            stroke="#666"
                                                            tickLine={false}
                                                            axisLine={false}
                                                            dx={-10}
                                                            tickFormatter={(value) => `₹${value}`}
                                                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                                                        />
                                                        <Tooltip
                                                            contentStyle={{
                                                                backgroundColor: 'rgba(0,0,0,0.8)',
                                                                border: '1px solid #333',
                                                                borderRadius: '12px',
                                                                backdropFilter: 'blur(8px)',
                                                                boxShadow: '0 10px 30px -5px rgba(0,0,0,0.5)'
                                                            }}
                                                            itemStyle={{ color: '#fff' }}
                                                            cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '4 4' }}
                                                        />
                                                        <Area
                                                            type="monotone"
                                                            dataKey="amount"
                                                            stroke="#3b82f6"
                                                            strokeWidth={4}
                                                            fillOpacity={1}
                                                            fill="url(#colorValue)"
                                                        />
                                                    </AreaChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'heatmap' && (
                                        <div className="w-full h-full flex items-center justify-center flex-col gap-6 relative overflow-hidden">
                                            {/* Decorative Background */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/5 to-transparent opacity-50"></div>

                                            <div className="relative z-10 w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                                <div className="absolute inset-0 rounded-full border border-orange-500/30 animate-ping" style={{ animationDuration: '3s' }}></div>
                                                <Layers size={48} className="text-orange-400 opacity-80" />
                                            </div>
                                            <div className="text-center relative z-10">
                                                <h3 className="text-2xl font-bold text-white mb-2">Demand Heatmap</h3>
                                                <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
                                                    Data visualization is aggregating real-time traffic sources. <br />
                                                    Check back in approx <span className="text-orange-400 font-mono">15m</span>.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </div>
    );
};

export default DriverDashboard;
