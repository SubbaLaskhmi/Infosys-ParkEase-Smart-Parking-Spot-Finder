import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Activity, Shield, Server, DollarSign,
    Search, Bell, TrendingUp, Users, MapPin, AlertTriangle, Check
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import AdminService from '../../services/adminService';
import { useToast } from '../../context/ToastContext';

// --- ANIMATION VARIANTS ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

// --- MOCK DATA ---
const userGrowthData = [
    { name: 'Jan', users: 120, revenue: 5000 },
    { name: 'Feb', users: 200, revenue: 8500 },
    { name: 'Mar', users: 350, revenue: 12000 },
    { name: 'Apr', users: 500, revenue: 18500 },
    { name: 'May', users: 750, revenue: 25000 },
    { name: 'Jun', users: 1100, revenue: 38000 },
];

const StatCard = ({ icon: Icon, title, value, subtext, gradient }) => (
    <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.02, boxShadow: '0 20px 40px -10px rgba(59, 130, 246, 0.2)' }}
        className={`p-6 rounded-[24px] bg-gradient-to-br ${gradient} border border-white/10 backdrop-blur-xl relative overflow-hidden group shadow-2xl transition-all`}
    >
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform text-white">
            <Icon size={100} className="transform rotate-12 -translate-y-4 translate-x-4" />
        </div>
        {/* Glass Shine */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

        <div className="relative z-10 text-white">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 border border-white/20 backdrop-blur-md shadow-inner">
                <Icon size={24} />
            </div>
            <h3 className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">{title}</h3>
            <div className="text-3xl font-extrabold mb-2 tracking-tight">{value}</div>
            <div className="flex items-center gap-2 text-xs bg-black/20 w-fit px-2 py-1 rounded-lg border border-white/5">
                <TrendingUp size={12} className="text-green-400" />
                <span className="text-green-300 font-medium">{subtext}</span>
            </div>
        </div>
    </motion.div>
);

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalParkings: 0,
        pendingApprovals: 0,
        activeParkings: 0,
        totalUsers: 0,
        totalProviders: 0,
        totalBookings: 0,
        totalRevenue: 0
    });
    const [pendingListings, setPendingListings] = useState([]);

    const [revenueData, setRevenueData] = useState([]);

    const fetchData = async () => {
        try {
            const [, pending, systemStats, revenue] = await Promise.all([
                AdminService.getAllUsers(),
                AdminService.getPendingListings(),
                AdminService.getSystemStats(),
                AdminService.getRevenueStats()
            ]);

            setStats({
                totalParkings: systemStats.totalSpots || 0,
                pendingApprovals: pending.length,
                activeParkings: systemStats.activeSpots || 0,
                totalUsers: systemStats.totalUsers || 0,
                totalProviders: systemStats.totalProviders || 0,
                totalBookings: systemStats.totalBookings || 0,
                totalRevenue: systemStats.totalRevenue || 0
            });
            setPendingListings(pending);
            setRevenueData(revenue);
        } catch (error) {
            console.error("Failed to fetch admin data", error);
        }
    };

    const { addToast } = useToast();

    useEffect(() => {
        let isMounted = true;
        fetchData().then(() => {
            if (isMounted) {
                // done
            }
        });
        return () => { isMounted = false; };
    }, []);

    const handleApprove = async (id) => {
        try {
            await AdminService.approveListing(id);
            addToast('Listing approved!', 'success');
            fetchData(); // Refresh
        } catch (error) {
            console.error("Failed to approve", error);
            addToast('Failed to approve listing.', 'error');
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30 p-6 md:p-10 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-blue-900/10 blur-[150px] animate-pulse" style={{ animationDuration: '10s' }}></div>
                <div className="absolute bottom-[-20%] right-[20%] w-[60vw] h-[60vw] rounded-full bg-purple-900/10 blur-[150px] animate-pulse" style={{ animationDuration: '12s' }}></div>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-[1600px] mx-auto space-y-10 pb-20"
            >
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <span className="text-green-400 text-xs font-bold tracking-widest uppercase bg-green-900/20 px-2 py-0.5 rounded border border-green-500/20">System Operational</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 tracking-tight">Command Center</h1>
                        <p className="text-gray-400 mt-2 font-light text-lg">Real-time system overview and administration.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-md"
                    >
                        <div className="relative group">
                            <Search className="absolute left-4 top-3 text-gray-500 group-focus-within:text-white transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search system logs..."
                                className="bg-black/20 border border-white/5 rounded-xl pl-12 pr-6 py-2.5 text-sm text-white focus:outline-none focus:bg-white/5 focus:border-blue-500/50 transition-all w-64 placeholder:text-gray-600"
                            />
                        </div>
                        <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition text-gray-400 hover:text-white relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-black animate-pulse"></span>
                        </button>
                    </motion.div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard icon={Users} title="Total Users" value={stats.totalUsers.toLocaleString()} subtext="&nbsp;" gradient="from-blue-600/20 to-cyan-600/20" />
                    <StatCard icon={DollarSign} title="Revenue" value={`₹${(stats.totalRevenue || 0).toLocaleString()}`} subtext="Total Earnings" gradient="from-purple-600/20 to-pink-600/20" />
                    <StatCard icon={MapPin} title="Active Spots" value={stats.activeParkings} subtext="Verified Spots" gradient="from-orange-600/20 to-red-600/20" />
                    <StatCard icon={Server} title="Total Bookings" value={stats.totalBookings} subtext="All Time" gradient="from-green-600/20 to-emerald-600/20" />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Traffic Chart */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-2 p-8 rounded-[32px] bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 relative overflow-hidden"
                    >
                        {/* Decorative header line */}
                        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50"></div>

                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-bold text-white flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-blue-500/20">
                                    <Activity className="text-blue-400" size={20} />
                                </div>
                                Network Traffic
                            </h3>
                            <select className="bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs text-gray-400 focus:outline-none hover:bg-white/5 transition">
                                <option>Last 6 Months</option>
                                <option>Last Year</option>
                            </select>
                        </div>
                        <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={revenueData.length > 0 ? revenueData : userGrowthData}>
                                    <defs>
                                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#ffffff30"
                                        tick={{ fontSize: 12, fill: '#6b7280' }}
                                        axisLine={false}
                                        tickLine={false}
                                        dy={10}
                                    />
                                    <YAxis
                                        stroke="#ffffff30"
                                        tick={{ fontSize: 12, fill: '#6b7280' }}
                                        axisLine={false}
                                        tickLine={false}
                                        dx={-10}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'rgba(5, 5, 5, 0.9)',
                                            border: '1px solid #333',
                                            borderRadius: '12px',
                                            boxShadow: '0 10px 30px -10px rgba(0,0,0,0.8)'
                                        }}
                                        itemStyle={{ color: '#fff' }}
                                        cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '4 4' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorUsers)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Approvals Widget */}
                    <motion.div variants={itemVariants} className="p-8 rounded-[32px] bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 relative flex flex-col h-full">
                        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent opacity-50"></div>

                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-yellow-500/20">
                                <AlertTriangle className="text-yellow-400" size={20} />
                            </div>
                            Pending Approvals
                        </h3>

                        <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                            {pendingListings.length === 0 ? (
                                <p className="text-gray-500 text-center py-4">No pending approvals.</p>
                            ) : (
                                pendingListings.map((listing) => (
                                    <div key={listing.id} className="p-5 rounded-2xl bg-white/5 hover:bg-white/10 transition border border-white/5 flex flex-col gap-3 group">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">{listing.title}</h4>
                                                <p className="text-xs text-gray-500 mt-0.5">{listing.addressLine}</p>
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-wide bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded border border-yellow-500/20">Pending</span>
                                        </div>
                                        <div className="flex gap-2 mt-2">
                                            <button
                                                onClick={() => handleApprove(listing.id)}
                                                className="flex-1 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 text-xs font-bold rounded-lg border border-green-500/20 transition flex items-center justify-center gap-1">
                                                <Check size={12} /> Approve
                                            </button>
                                            <button className="flex-1 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold rounded-lg border border-red-500/20 transition">Reject</button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        {/* View All Overlay */}
                        <div className="mt-4 pt-4 border-t border-white/5 text-center">
                            <button className="text-xs text-gray-500 hover:text-white uppercase font-bold tracking-widest transition-colors">View All Requests</button>
                        </div>
                    </motion.div>
                </div>

            </motion.div>
        </div>
    );
}
