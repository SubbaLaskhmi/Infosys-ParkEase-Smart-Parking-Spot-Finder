import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <AdminSidebar />
            <div className="pl-64">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
