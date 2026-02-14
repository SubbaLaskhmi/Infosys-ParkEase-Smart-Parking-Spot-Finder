import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, CreditCard, Save, Plus, Car, Trash2, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('userInfo')) || {});
    const [formData, setFormData] = useState({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        password: '',
    });

    // Garage State
    const [vehicles, setVehicles] = useState(user.vehicles || []);
    const [newVehicle, setNewVehicle] = useState({ plate: '', model: '', type: 'Car' });
    const [showAddVehicle, setShowAddVehicle] = useState(false);

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5002/api'}/auth/me`, config);
                setUser(prev => ({ ...prev, ...data })); // Merge with existing token
                localStorage.setItem('userInfo', JSON.stringify({ ...user, ...data }));
                setVehicles(data.vehicles || []);
            } catch (error) {
                console.error("Failed to fetch profile", error);
            }
        };
        fetchProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                },
            };

            const payload = {
                ...formData,
                vehicles: vehicles, // Send updated vehicles array
            };

            const { data } = await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5002/api'}/auth/profile`, payload, config);

            localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);
            setMessage('Profile updated successfully!');
        } catch (err) {
            setError(err.response?.data?.message || 'Update failed');
        }
    };

    const addVehicle = () => {
        if (newVehicle.plate && newVehicle.model) {
            setVehicles([...vehicles, { ...newVehicle, isDefault: vehicles.length === 0 }]);
            setNewVehicle({ plate: '', model: '', type: 'Car' });
            setShowAddVehicle(false);
        }
    };

    const removeVehicle = (index) => {
        const updated = vehicles.filter((_, i) => i !== index);
        setVehicles(updated);
    };

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-8 pb-24">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                My Profile
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Stats & Wallet */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Profile Card */}
                    <div className="glass-card p-6 flex flex-col items-center text-center">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500/20 mb-4 bg-black/40">
                            <img src={user.photo || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-xl font-bold">{user.name}</h3>
                        <p className="text-muted-foreground text-sm mb-4">{user.email}</p>
                        <div className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs uppercase font-bold tracking-wider mb-6">
                            {user.roles?.[0] || 'User'}
                        </div>
                    </div>

                    {/* Wallet Teaser */}
                    <div className="glass-card p-6 bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-500/30">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="text-lg font-bold">Wallet Balance</h4>
                                <p className="text-xs text-blue-200">ParkEase Pass</p>
                            </div>
                            <div className="p-2 bg-blue-500/20 rounded-lg">
                                <Wallet size={20} className="text-blue-400" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">${user.walletBalance || 0}.00</h2>
                        <button
                            onClick={() => navigate('/wallet')} // To be implemented
                            className="w-full bg-white/10 hover:bg-white/20 py-2 rounded-lg font-medium transition text-sm"
                        >
                            Manage Wallet
                        </button>
                    </div>
                </div>

                {/* Right Column: Edit Details & Garage */}
                <div className="lg:col-span-2 space-y-6">
                    <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
                        <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
                            <User className="text-blue-400" size={20} />
                            <h3 className="text-lg font-bold">Personal Details</h3>
                        </div>

                        {message && <div className="bg-green-500/20 text-green-400 p-3 rounded text-center">{message}</div>}
                        {error && <div className="bg-red-500/20 text-red-400 p-3 rounded text-center">{error}</div>}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-muted-foreground mb-1">Full Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-muted-foreground mb-1">Email</label>
                                <input
                                    type="email"
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-muted-foreground mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="+1 234 567 8900"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm text-muted-foreground mb-1">Change Password</label>
                                <input
                                    type="password"
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.password}
                                    placeholder="Leave blank to keep current"
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition">
                                <Save size={18} />
                                Save Changes
                            </button>
                        </div>
                    </form>

                    {/* My Garage */}
                    <div className="glass-card p-6">
                        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                            <div className="flex items-center gap-2">
                                <Car className="text-green-400" size={20} />
                                <h3 className="text-lg font-bold">My Garage</h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowAddVehicle(!showAddVehicle)}
                                className="text-xs bg-green-600/20 text-green-400 hover:bg-green-600/30 px-3 py-1 rounded-full transition flex items-center gap-1 border border-green-600/20"
                            >
                                <Plus size={14} /> Add Vehicle
                            </button>
                        </div>

                        {showAddVehicle && (
                            <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10 animate-in fade-in slide-in-from-top-2">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                                    <input
                                        placeholder="License Plate (e.g. KA-01-AB-1234)"
                                        className="bg-black/40 border border-white/10 rounded px-3 py-2 text-sm outline-none focus:border-green-500"
                                        value={newVehicle.plate}
                                        onChange={(e) => setNewVehicle({ ...newVehicle, plate: e.target.value })}
                                    />
                                    <input
                                        placeholder="Model (e.g. Honda City)"
                                        className="bg-black/40 border border-white/10 rounded px-3 py-2 text-sm outline-none focus:border-green-500"
                                        value={newVehicle.model}
                                        onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                                    />
                                    <select
                                        className="bg-black/40 border border-white/10 rounded px-3 py-2 text-sm outline-none focus:border-green-500"
                                        value={newVehicle.type}
                                        onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })}
                                    >
                                        <option value="Car">Car</option>
                                        <option value="Bike">Bike</option>
                                        <option value="EV">EV</option>
                                    </select>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button onClick={() => setShowAddVehicle(false)} className="text-xs text-muted-foreground hover:text-white px-3">Cancel</button>
                                    <button onClick={addVehicle} className="bg-green-600 hover:bg-green-700 text-white text-xs px-4 py-2 rounded transition">Add to Garage</button>
                                </div>
                            </div>
                        )}

                        <div className="space-y-3">
                            {vehicles.length === 0 ? (
                                <p className="text-center text-muted-foreground py-4">No vehicles added yet.</p>
                            ) : (
                                vehicles.map((v, idx) => (
                                    <div key={idx} className="p-4 rounded-lg bg-gradient-to-r from-gray-900 to-transparent border border-white/5 flex justify-between items-center group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
                                                <Car size={18} className="text-muted-foreground" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-lg tracking-wider">{v.plate}</p>
                                                <p className="text-xs text-muted-foreground">{v.model} • {v.type}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => removeVehicle(idx)} className="text-muted-foreground hover:text-red-400 p-2 transition">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;
