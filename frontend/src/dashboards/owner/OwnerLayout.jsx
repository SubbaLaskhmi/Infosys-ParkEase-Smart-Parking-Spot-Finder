import React from 'react';
import { Outlet } from 'react-router-dom';
import OwnerSidebar from './components/OwnerSidebar';

const OwnerLayout = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <OwnerSidebar />
            <div className="pl-64">
                <Outlet />
            </div>
        </div>
    );
};

export default OwnerLayout;
