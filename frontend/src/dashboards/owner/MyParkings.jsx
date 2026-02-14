import React, { useState, useEffect } from 'react';
import { PlusCircle, MapPin, Edit, Truck, Clock, AlertCircle, CheckCircle, Search, Filter, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { useCallback } from 'react';

const MyParkings = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    const fetchListings = useCallback(async () => {
        setLoading(true);

        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5002/api'}/provider/listings`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setListings(data || []);
        } catch (error) {
            console.error("Error fetching listings", error);
            toast.error("Failed to load your parkings");
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            fetchListings();
        } else {

            setLoading(false);
        }
    }, [token, fetchListings]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this parking listing? This action cannot be undone.")) {
            return;
        }

        try {
            await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:5002/api'}/provider/listings/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Parking spot deleted successfully");
            fetchListings(); // Refresh the list
        } catch (error) {
            console.error("Error deleting listing", error);
            toast.error("Failed to delete parking spot");
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'APPROVED': return <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs flex items-center gap-1"><CheckCircle size={12} /> Approved</span>;
            case 'REJECTED': return <span className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs flex items-center gap-1"><AlertCircle size={12} /> Rejected</span>;
            default: return <span className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 text-xs flex items-center gap-1"><Clock size={12} /> Pending</span>;
        }
    };

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">My Parking Spots</h1>
                    <p className="text-muted-foreground">Manage and edit your listed parking locations</p>
                </div>
                <Link to="/owner/add-parking" className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-xl font-bold hover:bg-blue-700 transition">
                    <PlusCircle size={18} /> Add New
                </Link>
            </div>

            {/* Filters */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search parkings..."
                        className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button className="px-4 py-2 bg-black/20 border border-white/10 rounded-xl flex items-center gap-2 hover:bg-white/5 transition">
                    <Filter size={18} /> Filter
                </button>
            </div>

            {/* Listings Grid */}
            {loading ? (
                <div className="text-center py-20 text-gray-500">Loading listings...</div>
            ) : listings.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                    <Truck size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
                    <p className="text-muted-foreground">No parking spots listed yet.</p>
                    <Link to="/owner/add-parking" className="text-blue-400 hover:underline mt-2 inline-block">Add your first spot</Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {listings.map((spot) => (
                        <div key={spot.id} className="glass-card group hover:bg-white/5 transition border border-white/10 rounded-2xl overflow-hidden relative">
                            <div className="h-40 bg-gray-800 relative">
                                <img src={spot.images?.[0] || 'https://via.placeholder.com/400x200'} alt={spot.title} className="w-full h-full object-cover" />
                                <div className="absolute top-2 right-2">
                                    {getStatusBadge(spot.status)}
                                </div>
                                <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 backdrop-blur rounded text-xs font-mono">
                                    ₹{spot.pricing?.hourlyRate}/hr
                                </div>
                            </div>
                            <div className="p-5 space-y-4">
                                <div>
                                    <h3 className="font-bold text-lg leading-tight mb-1 truncate">{spot.title}</h3>
                                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                                        <MapPin size={14} /> {spot.city}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-sm text-gray-400 bg-black/20 p-3 rounded-lg">
                                    <div>
                                        <span className="block text-xs text-muted-foreground">Capacity</span>
                                        <span className="font-semibold text-white">~{spot.approxTotalCars || spot.vehicleCapacity?.count || '-'}</span>
                                    </div>
                                    <div>
                                        <span className="block text-xs text-muted-foreground">Area</span>
                                        <span className="font-semibold text-white">{spot.dimensions?.totalArea} m²</span>
                                    </div>
                                </div>

                                {spot.status === 'REJECTED' && (
                                    <div className="text-xs bg-red-500/10 text-red-300 p-2 rounded border border-red-500/20">
                                        <strong>Reason:</strong> {spot.rejectionReason}
                                    </div>
                                )}

                                <div className="pt-2 flex gap-2">
                                    <Link to={`/owner/edit-parking/${spot.id}`} className="flex-1 py-2 text-sm font-medium bg-white/5 hover:bg-white/10 rounded-lg transition text-center flex items-center justify-center border border-white/5 hover:border-blue-500/30">
                                        Manage
                                    </Link>
                                    <Link to={`/owner/edit-parking/${spot.id}`} className="p-2 bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg transition border border-blue-500/20" title="Edit Listing">
                                        <Edit size={18} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(spot.id)}
                                        className="p-2 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white rounded-lg transition border border-red-500/20"
                                        title="Delete Listing"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyParkings;
