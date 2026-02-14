import React, { useState, useEffect } from 'react';
import { PlusCircle, Truck, Clock, TrendingUp, Users, DollarSign, Wallet, ArrowUpRight, Sparkles, Activity, Crown, Zap } from 'lucide-react';

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import ProviderService from '../../services/providerService';

// --- ANIMATION VARIANTS ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

const hoverScaleWithGlow = {
    scale: 1.02,
    boxShadow: "0 20px 40px -10px rgba(168, 85, 247, 0.2)",
    transition: { duration: 0.3 }
};

// --- MOCK DATA ---
const earningsData = [
    { name: 'Mon', earnings: 1240 },
    { name: 'Tue', earnings: 980 },
    { name: 'Wed', earnings: 1650 },
    { name: 'Thu', earnings: 1400 },
    { name: 'Fri', earnings: 2100 },
    { name: 'Sat', earnings: 3200 },
    { name: 'Sun', earnings: 2800 },
];

const StatCard = ({ title, value, icon: Icon, gradient }) => (
    <motion.div
        variants={itemVariants}
        whileHover={hoverScaleWithGlow}
        className={`p-6 rounded-[24px] bg-gradient-to-br ${gradient} border border-white/10 backdrop-blur-xl relative overflow-hidden group shadow-2xl`}
    >
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform text-white">
            <Icon size={100} className="transform rotate-12 -translate-y-4 translate-x-4" />
        </div>
        <div className="relative z-10 text-white">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4 border border-white/20 backdrop-blur-md shadow-inner">
                <Icon size={24} />
            </div>
            <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
            <div className="text-3xl font-bold tracking-tight">{value}</div>
        </div>
        {/* Alive Indicator */}
        <div className="absolute top-6 right-6 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white/80"></span>
        </div>
    </motion.div>
);

export default function OwnerDashboard() {
    const [stats, setStats] = useState({
        totalSpots: 0,
        activeBookings: 0,
        todayEarnings: 0,
        monthlyEarnings: 0
    });
    const { token } = useAuth();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await ProviderService.getDashboardStats();
                setStats({
                    totalSpots: data.totalSpots,
                    activeBookings: data.activeBookings,
                    todayEarnings: data.totalEarnings, // Assuming total is today for MVP or backend aggregates
                    monthlyEarnings: data.totalEarnings // Same for MVP
                });
            } catch (error) {
                console.error("Failed to fetch provider stats", error);
            }
        };
        if (token) {
            fetchStats();
        }
    }, [token]);



    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30 p-6 md:p-10 relative overflow-hidden">
            {/* Tycoon Background - Animated */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-yellow-600/10 blur-[150px] animate-pulse" style={{ animationDuration: '8s' }}></div>
                <div className="absolute bottom-[0%] left-[0%] w-[50vw] h-[50vw] rounded-full bg-purple-900/10 blur-[150px] animate-pulse" style={{ animationDuration: '10s' }}></div>
                <div className="absolute top-[30%] left-[20%] w-[20vw] h-[20vw] rounded-full bg-blue-500/10 blur-[120px]"></div>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-[1600px] mx-auto space-y-12 pb-20"
            >
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-[10px] font-bold tracking-wider text-yellow-400 uppercase flex items-center gap-1">
                                <Crown size={12} /> Pro Provider
                            </div>
                        </div>
                        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 mb-2 leading-tight">My Business</h1>
                        <p className="text-gray-400 text-lg max-w-xl">Manage your parking empire. Your real-time earnings and occupancy stats are ready.</p>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link to="/owner/add-parking" className="group relative px-8 py-4 bg-white text-black font-bold rounded-2xl overflow-hidden transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)] flex items-center gap-3">
                            <span className="relative z-10 flex items-center gap-2"><PlusCircle size={20} /> Add New Spot</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </Link>
                    </motion.div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Total Spots" value={stats.totalSpots} icon={Truck} gradient="from-blue-900/40 to-cyan-900/40" />
                    <StatCard title="Live Bookings" value={stats.activeBookings} icon={Clock} gradient="from-purple-900/40 to-fuchsia-900/40" />
                    <StatCard title="Today's Earnings" value={`₹${stats.todayEarnings}`} icon={DollarSign} gradient="from-yellow-900/40 to-amber-900/40" />
                    <StatCard title="Month To Date" value={`₹${(stats.monthlyEarnings / 1000).toFixed(1)}k`} icon={Wallet} gradient="from-emerald-900/40 to-green-900/40" />
                </div>

                {/* Earnings Chart Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-2 p-8 rounded-[32px] bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/5 relative overflow-hidden"
                    >
                        {/* Shine Effect */}
                        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                        <div className="flex justify-between items-end mb-8 relative z-10">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2"><Activity className="text-yellow-500" size={20} /> Revenue Trends</h3>
                                <p className="text-sm text-gray-400">Daily earnings performance audit</p>
                            </div>
                            <div className="text-right bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                                <div className="text-2xl font-bold text-green-400 flex items-center gap-1 justify-end">
                                    <ArrowUpRight size={24} /> +18.5%
                                </div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">vs Last Week</p>
                            </div>
                        </div>

                        <div className="h-[350px] min-h-[350px] relative z-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={earningsData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#ffffff30"
                                        tick={{ fontSize: 12, fill: '#6b7280' }}
                                        axisLine={false}
                                        tickLine={false}
                                        dy={20}
                                    />
                                    <YAxis
                                        stroke="#ffffff30"
                                        tick={{ fontSize: 12, fill: '#6b7280' }}
                                        axisLine={false}
                                        tickLine={false}
                                        tickFormatter={(value) => `₹${value}`}
                                        dx={-10}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#ffffff05' }}
                                        contentStyle={{
                                            backgroundColor: '#1a1a1a',
                                            border: '1px solid #333',
                                            borderRadius: '16px',
                                            boxShadow: '0 10px 40px -10px rgba(0,0,0,0.5)'
                                        }}
                                        itemStyle={{ color: '#fbbf24', fontWeight: 'bold' }}
                                        formatter={(value) => [`₹${value}`, 'Earnings']}
                                    />
                                    <Bar dataKey="earnings" radius={[8, 8, 8, 8]} barSize={50} animationDuration={1500}>
                                        {earningsData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={index === 5 ? 'url(#activeBar)' : '#ffffff10'}
                                                className="transition-all duration-500 hover:opacity-80"
                                            />
                                        ))}
                                    </Bar>
                                    <defs>
                                        <linearGradient id="activeBar" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#fbbf24" />
                                            <stop offset="100%" stopColor="#b45309" />
                                        </linearGradient>
                                    </defs>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Quick Actions / Tips */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <div className="p-8 rounded-[32px] bg-gradient-to-br from-[#1a1033] to-[#0a0a0a] border border-white/5 backdrop-blur-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-[50px] pointer-events-none group-hover:bg-purple-500/30 transition-colors"></div>

                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Sparkles className="text-purple-400" size={20} /> Tycoon Tips</h3>
                            <ul className="space-y-5">
                                <li className="flex gap-4 items-start p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                                        <TrendingUp size={14} className="text-green-400" />
                                    </div>
                                    <span className="text-sm text-gray-300 leading-relaxed">Weekend demand is up <span className="text-green-400 font-bold">40%</span>. Consider a dynamic price increase.</span>
                                </li>
                                <li className="flex gap-4 items-start p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                                        <Zap size={14} className="text-blue-400" />
                                    </div>
                                    <span className="text-sm text-gray-300 leading-relaxed">Add <span className="text-blue-400 font-bold">EV Charging</span> to Spot #3 to boost value by 15%.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-8 rounded-[32px] bg-[#0a0a0a] border border-white/5 backdrop-blur-xl text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                            <div className="relative z-10">
                                <div className="w-20 h-20 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                                    <Users size={32} className="text-gray-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Driver Feed</h3>
                                <p className="text-gray-500 text-sm">No active reviews to display today.</p>
                                <button className="mt-6 text-xs font-bold text-purple-400 uppercase tracking-widest hover:text-purple-300 transition-colors">View History</button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
