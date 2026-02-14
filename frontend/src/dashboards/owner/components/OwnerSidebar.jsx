import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Car, Calendar, DollarSign, User, LogOut } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const OwnerSidebar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { path: '/owner/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/owner/parkings', icon: <Car size={20} />, label: 'My Parkings' },
        { path: '/owner/bookings', icon: <Calendar size={20} />, label: 'Bookings' },
        { path: '/owner/earnings', icon: <DollarSign size={20} />, label: 'Earnings' },
        { path: '/owner/profile', icon: <User size={20} />, label: 'Profile' },
    ];

    return (
        <div className="h-screen w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 fixed left-0 top-0 flex flex-col z-50">
            {/* Logo Area */}
            <div className="p-6 border-b border-white/10">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    ParkEase <span className="text-xs text-gray-400 absolute top-2">Owner</span>
                </h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`
                        }
                    >
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-white/10">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default OwnerSidebar;
