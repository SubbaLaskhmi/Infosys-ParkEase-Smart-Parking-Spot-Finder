import React from 'react';
import { DollarSign, TrendingUp, CreditCard, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Animations
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

// Mock Data
const earningsData = [
    { name: 'Jan', amount: 4000 },
    { name: 'Feb', amount: 3000 },
    { name: 'Mar', amount: 5000 },
    { name: 'Apr', amount: 4500 },
    { name: 'May', amount: 6000 },
    { name: 'Jun', amount: 8000 },
];

export default function OwnerEarnings() {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-6 md:p-8 max-w-7xl mx-auto space-y-8"
        >
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Earnings & Payouts</h1>
                    <p className="text-muted-foreground">Track your revenue and withdrawal history</p>
                </div>
                <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl text-white border border-white/10 transition">
                    <Download size={18} /> Export Report
                </button>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
                {[
                    { label: "Total Earnings", value: "₹30,500", color: "text-green-400", sub: "+12% vs last month" },
                    { label: "Pending Payout", value: "₹5,200", color: "text-yellow-400", sub: "Processing" },
                    { label: "Last Payout", value: "₹8,000", color: "text-blue-400", sub: "Paid on Oct 1" }
                ].map((card, idx) => (
                    <motion.div key={idx} variants={itemVariants} className="glass-card p-6 rounded-2xl border border-white/10 bg-black/40">
                        <p className="text-sm text-gray-400 mb-1">{card.label}</p>
                        <div className={`text-3xl font-bold ${card.color}`}>{card.value}</div>
                        <p className="text-xs text-gray-500 mt-2">{card.sub}</p>
                    </motion.div>
                ))}
            </div>

            <motion.div variants={itemVariants} className="glass-card p-6 rounded-3xl border border-white/10 bg-black/40">
                <h3 className="text-xl font-bold text-white mb-6">Revenue Trend</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={earningsData}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis dataKey="name" stroke="#6b7280" tick={{ fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                            <YAxis stroke="#6b7280" tick={{ fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val}`} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '8px', color: '#fff' }}
                            />
                            <Area type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </motion.div>
    );
}
