import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Navbar from '../components/SpotFinderHeader'; // Assuming this is the Navbar
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    Ticket,
    Clock,
    Wallet,
    User,
    Search,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const DriverSidebar = ({ isOpen, setIsOpen }) => {
    const location = useLocation();
    const { logout } = useAuth();

    const menuItems = [
        { path: '/driver/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/find', label: 'Find Parking', icon: Search },
        { path: '/driver/bookings', label: 'My Bookings', icon: Ticket },
        { path: '/driver/tickets', label: 'Active Ticket', icon: Ticket },
        { path: '/driver/history', label: 'History', icon: Clock },
        { path: '/driver/wallet', label: 'Wallet', icon: Wallet },
        { path: '/driver/profile', label: 'Profile', icon: User },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed top-0 left-0 h-full w-64 bg-black/90 border-r border-white/10 z-50 transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        ParkEase Driver
                    </h2>
                    <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <nav className="p-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <Icon size={20} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-white/10">
                    <button
                        onClick={logout}
                        className="flex items-center space-x-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 w-full px-4 py-3 rounded-xl transition-all"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default function DriverLayout() {
    const { user, loading } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    if (loading) {
        return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
    }

    if (!user || user.role !== 'USER') {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white flex">
            <DriverSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="flex-1 lg:ml-64 flex flex-col min-h-screen transition-all">
                {/* Mobile Header */}
                <header className="lg:hidden p-4 bg-black/40 backdrop-blur-md border-b border-white/10 sticky top-0 z-30 flex items-center justify-between">
                    <button onClick={() => setIsSidebarOpen(true)} className="text-gray-400 hover:text-white">
                        <Menu size={24} />
                    </button>
                    <span className="font-bold text-lg">ParkEase</span>
                    <div className="w-8" />
                </header>

                <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
