import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Mail, Phone, Lock, Save, Camera } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const OwnerProfile = () => {
    const { user: authUser, logout } = useAuth();
    const [user, setUser] = useState(authUser || {});
    const [formData, setFormData] = useState({
        name: authUser?.name || '',
        email: authUser?.email || '',
        phone: authUser?.phone || '',
        password: '',
        photo: authUser?.photo || ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch fresh profile data
        const fetchProfile = async () => {
            try {
                const token = authUser?.token || localStorage.getItem('token');
                if (!token) return;

                const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5002/api'}/auth/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(data);
                setFormData(prev => ({
                    ...prev,
                    name: data.name || '',
                    email: data.email || '',
                    phone: data.phone || '',
                    photo: data.photo || ''
                }));
            } catch (error) {
                console.error("Failed to fetch profile", error);
            }
        };
        fetchProfile();
    }, [authUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = authUser?.token || localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            };

            const payload = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                photo: formData.photo
            };

            if (formData.password) {
                payload.password = formData.password;
            }

            const { data } = await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5002/api'}/auth/profile`, payload, config);

            setUser(data);
            toast.success('Profile updated successfully!');
            setFormData(prev => ({ ...prev, password: '' })); // Clear password field
        } catch (err) {
            toast.error(err.response?.data?.message || 'Update failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in duration-300">
            <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    Owner Profile
                </h1>
                <p className="text-muted-foreground">Manage your account and preferences</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="md:col-span-1 space-y-6">
                    <div className="glass-card p-6 flex flex-col items-center text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500/20 mb-4 bg-black/40 group-hover:border-blue-500/50 transition-colors">
                            {formData.photo ? (
                                <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 text-4xl font-bold">
                                    {formData.name?.charAt(0) || 'O'}
                                </div>
                            )}
                        </div>

                        <h2 className="text-xl font-bold">{formData.name || 'Space Owner'}</h2>
                        <span className="mt-2 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-bold border border-blue-500/30">
                            SPACE OWNER
                        </span>

                        <div className="mt-6 w-full pt-6 border-t border-white/5">
                            <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
                                <span>Account Status</span>
                                <span className="text-green-400 flex items-center gap-1">● Active</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Form */}
                <div className="md:col-span-2">
                    <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                            <User className="text-blue-400" />
                            <h3 className="text-lg font-bold">Account Details</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                                    <input
                                        type="text"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                                    <input
                                        type="email"
                                        disabled
                                        className="w-full bg-white/5 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-gray-500 cursor-not-allowed"
                                        value={formData.email}
                                    />
                                </div>
                                <p className="text-xs text-gray-600 mt-1 ml-1">Email cannot be changed</p>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                                    <input
                                        type="tel"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Profile Photo URL</label>
                                <div className="relative">
                                    <Camera className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                                    <input
                                        type="text"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                                        value={formData.photo}
                                        onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                                        placeholder="https://example.com/photo.jpg"
                                    />
                                </div>
                            </div>

                            <hr className="border-white/5 my-4" />

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Change Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                                    <input
                                        type="password"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="••••••••"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1 ml-1">Leave blank to keep current password</p>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={logout}
                                className="px-6 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium"
                            >
                                Sign Out
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-500/20 transform transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save size={18} />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OwnerProfile;
