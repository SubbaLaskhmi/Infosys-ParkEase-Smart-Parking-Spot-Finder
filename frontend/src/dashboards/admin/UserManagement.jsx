import React, { useState, useEffect } from 'react';
import { Search, Filter, User, Ban } from 'lucide-react';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL'); // ALL, DRIVER, PROVIDER, ADMIN

    useEffect(() => {
        // Mock data for now
        const mockUsers = [
            { id: 1, name: 'John Doe', email: 'john@example.com', role: 'DRIVER', status: 'ACTIVE' },
            { id: 2, name: 'Jane Smith', email: 'jane@parking.com', role: 'PROVIDER', status: 'ACTIVE' },
            { id: 3, name: 'Admin User', email: 'admin@parkease.com', role: 'ADMIN', status: 'ACTIVE' },
            { id: 4, name: 'Banned User', email: 'bad@actor.com', role: 'DRIVER', status: 'BANNED' },
        ];
        setUsers(mockUsers);
        setLoading(false);
    }, []);

    const filteredUsers = filter === 'ALL' ? users : users.filter(u => u.role === filter);

    const getRoleBadge = (role) => {
        switch (role) {
            case 'ADMIN': return <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs font-bold border border-red-500/30">ADMIN</span>;
            case 'PROVIDER': return <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-bold border border-blue-500/30">PROVIDER</span>;
            default: return <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-bold border border-green-500/30">DRIVER</span>;
        }
    };

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">User Management</h1>
                    <p className="text-muted-foreground">Manage accounts, roles, and permissions</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-white focus:outline-none focus:border-blue-500 transition"
                    />
                </div>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500"
                >
                    <option value="ALL">All Roles</option>
                    <option value="DRIVER">Drivers</option>
                    <option value="PROVIDER">Providers</option>
                    <option value="ADMIN">Admins</option>
                </select>
            </div>

            {/* Users Table */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-gray-400 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-white/5 transition">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-bold">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-medium text-white">{user.name}</div>
                                            <div className="text-sm text-gray-400">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {getRoleBadge(user.role)}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${user.status === 'ACTIVE' ? 'text-green-400' : 'text-red-400'}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition" title="View Profile">
                                            <User size={18} />
                                        </button>
                                        <button className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 hover:text-red-300 transition" title="Ban User">
                                            <Ban size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
