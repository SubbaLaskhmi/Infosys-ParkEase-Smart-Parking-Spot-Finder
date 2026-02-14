import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { NAV_ITEMS } from '../config/navConfig';
// import Background3D from './Background3D';

const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();

    // Default to USER items if no role (though protected route should catch this)
    // If not logged in (landing page etc), maybe show nothing? But Layout is usually for authed pages.
    const menuItems = NAV_ITEMS[user?.role] || NAV_ITEMS['USER'];

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-[#0b0e14] flex text-foreground font-sans overflow-hidden">
            {/* Mobile Sidebar Toggle */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-[2000] p-2 bg-white/10 backdrop-blur rounded-lg text-white"
            >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <aside className={`
                fixed lg:relative top-0 left-0 h-screen w-72 bg-[#0b0e14] border-r border-white/5
                transform transition-transform duration-300 z-[1500] flex flex-col
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-12 px-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <span className="text-white font-bold text-xl">P</span>
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                            ParkEase
                        </span>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-2 flex-1">
                        {menuItems.map((item) => {
                            const active = isActive(item.path);
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`
                                        flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group relative
                                        ${active
                                            ? 'text-blue-400 font-medium'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'}
                                    `}
                                >
                                    {/* Active Indicator & Glow */}
                                    {active && (
                                        <div className="absolute inset-0 bg-blue-500/10 rounded-xl border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]"></div>
                                    )}

                                    <item.icon size={22} className={`relative z-10 transition-colors ${active ? 'text-blue-400' : 'group-hover:text-white'}`} />
                                    <span className="relative z-10 text-base">{item.label}</span>
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Logout */}
                    <div className="pt-6 border-t border-white/5">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors group"
                        >
                            <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 h-screen overflow-hidden relative bg-[#0f1219]">
                {/* 3D Background - Optional, keeping it subtle or hidden since we have a map usually */}
                {/* <Background3D /> */}
                <div className="h-full w-full overflow-y-auto custom-scrollbar">
                    {children}
                </div>
            </main>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1400] lg:hidden"
                />
            )}
        </div>
    );
};

export default Layout;
