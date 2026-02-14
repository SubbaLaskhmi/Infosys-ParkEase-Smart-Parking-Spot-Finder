import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    User, Bell, Shield, Moon, Sun, Monitor, LogOut,
    ChevronRight, CreditCard, Lock, Smartphone
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const SettingItem = ({ icon: Icon, title, description, action }) => (
    <div className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-colors cursor-pointer group">
        <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 group-hover:text-blue-300 group-hover:bg-blue-500/20 transition-colors">
                <Icon size={20} />
            </div>
            <div>
                <h4 className="font-semibold text-white">{title}</h4>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
        {action || <ChevronRight size={18} className="text-muted-foreground" />}
    </div>
);

const Toggle = ({ checked, onChange }) => (
    <button
        onClick={() => onChange(!checked)}
        className={`w-12 h-6 rounded-full p-1 transition-colors ${checked ? 'bg-blue-500' : 'bg-gray-600'}`}
    >
        <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
    </button>
);

const AdminSettings = () => {
    const { logout, user } = useAuth();
    const [darkMode, setDarkMode] = useState(true);
    const [notifications, setNotifications] = useState(true);

    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    Settings
                </h1>
                <p className="text-muted-foreground mt-2">Manage your account preferences and global system configurations.</p>
            </div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="space-y-6"
            >
                {/* Profile Section */}
                <motion.div variants={sectionVariants} className="glass-card p-6 rounded-2xl border border-white/10 bg-black/40">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <User size={20} className="text-purple-400" /> Profile
                    </h3>
                    <div className="flex items-center gap-6 mb-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-purple-500/20">
                            {user?.username?.charAt(0).toUpperCase() || 'A'}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">{user?.username || 'Admin User'}</h2>
                            <p className="text-muted-foreground">{user?.email || 'admin@parkease.com'}</p>
                            <span className="inline-block mt-2 px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-full border border-purple-500/20">
                                SUPER ADMIN
                            </span>
                        </div>
                        <button className="ml-auto px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">
                            Edit Profile
                        </button>
                    </div>
                </motion.div>

                {/* Appearance & System */}
                <motion.div variants={sectionVariants} className="glass-card rounded-2xl border border-white/10 bg-black/40 overflow-hidden">
                    <div className="p-4 border-b border-white/10">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Monitor size={20} className="text-blue-400" /> Appearance & System
                        </h3>
                    </div>
                    <div className="p-2 space-y-1">
                        <SettingItem
                            icon={darkMode ? Moon : Sun}
                            title="Dark Mode"
                            description="Toggle system-wide dark theme"
                            action={<Toggle checked={darkMode} onChange={setDarkMode} />}
                        />
                        <SettingItem
                            icon={Bell}
                            title="Notifications"
                            description="Receive system alerts and booking updates"
                            action={<Toggle checked={notifications} onChange={setNotifications} />}
                        />
                        <SettingItem
                            icon={Smartphone}
                            title="App Optimization"
                            description="Enable animations for smoother experience"
                            action={<span className="text-xs font-bold text-green-400">ENABLED</span>}
                        />
                    </div>
                </motion.div>

                {/* Security */}
                <motion.div variants={sectionVariants} className="glass-card rounded-2xl border border-white/10 bg-black/40 overflow-hidden">
                    <div className="p-4 border-b border-white/10">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Shield size={20} className="text-green-400" /> Security
                        </h3>
                    </div>
                    <div className="p-2 space-y-1">
                        <SettingItem icon={Lock} title="Change Password" description="Update your security credentials" />
                        <SettingItem icon={CreditCard} title="Billing & Plans" description="Manage platform subscription tiers" />

                        <div className="border-t border-white/5 my-2" />

                        <div onClick={logout} className="flex items-center justify-between p-4 hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer group">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-red-500/10 rounded-lg text-red-400 group-hover:bg-red-500/20">
                                    <LogOut size={20} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-red-400">Sign Out</h4>
                                    <p className="text-sm text-red-500/60">Securely log out of your session</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default AdminSettings;
