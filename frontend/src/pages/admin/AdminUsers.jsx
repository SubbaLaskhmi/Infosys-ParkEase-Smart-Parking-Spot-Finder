import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Trash2, Shield, User, Car } from 'lucide-react';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5002/api'}/admin/users`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:5002/api'}/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchUsers(); // Refresh
        } catch (error) {
            alert(error.response?.data?.message || "Delete failed");
        }
    };

    if (loading) return <div className="p-10 text-center text-white">Loading users...</div>;

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 pb-20">
            <h1 className="text-3xl font-bold text-white mb-6">User Management</h1>

            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-white/80">
                    <thead className="bg-white/5 text-xs uppercase text-white/50">
                        <tr>
                            <th className="p-4">User</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Joined</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {users.map((u) => (
                            <tr key={u.id} className="hover:bg-white/5 transition">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                                            {u.name[0]}
                                        </div>
                                        <span className="font-medium text-white">{u.name}</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold flex items-center gap-1 w-fit ${u.role === 'ADMIN' ? 'bg-red-500/20 text-red-400' :
                                        u.role === 'PROVIDER' ? 'bg-purple-500/20 text-purple-400' :
                                            'bg-blue-500/20 text-blue-400'
                                        }`}>
                                        {u.role === 'ADMIN' ? <Shield size={10} /> : u.role === 'PROVIDER' ? <Car size={10} /> : <User size={10} />}
                                        {u.role}
                                    </span>
                                </td>
                                <td className="p-4 text-sm">{u.email}</td>
                                <td className="p-4 text-sm opacity-60">{new Date(u.createdAt).toLocaleDateString()}</td>
                                <td className="p-4 text-right">
                                    <button
                                        onClick={() => handleDelete(u.id)}
                                        className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition"
                                        title="Delete User"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;
