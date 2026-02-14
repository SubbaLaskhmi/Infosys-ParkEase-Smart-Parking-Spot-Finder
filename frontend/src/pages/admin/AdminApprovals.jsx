import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Check, X, MapPin, Ruler, User } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminApprovals = () => {
    const [pendingListings, setPendingListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(null); // ID of item being processed
    const { token } = useAuth();

    // For rejection dialog
    const [rejectId, setRejectId] = useState(null);
    const [rejectReason, setRejectReason] = useState('');

    const fetchPending = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5002/api'}/admin/parkings/pending`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPendingListings(res.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchPending();
    }, [token]);

    const handleApprove = async (id) => {
        if (!window.confirm("Approve this parking listing?")) return;
        setProcessing(id);
        try {
            await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5002/api'}/admin/parkings/${id}/approve`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Remove from list
            setPendingListings(prev => prev.filter(item => item.id !== id));
            toast.success("Listing approved successfully");
        } catch (error) {
            toast.error("Error approving listing");
        } finally {
            setProcessing(null);
        }
    };

    const handleReject = async () => {
        if (!rejectReason) return toast.error("Please provide a reason");
        setProcessing(rejectId);
        try {
            await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5002/api'}/admin/parkings/${rejectId}/reject`, { reason: rejectReason }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Remove from list
            setPendingListings(prev => prev.filter(item => item.id !== rejectId));
            setRejectId(null);
            setRejectReason('');
            toast.success("Listing rejected");
        } catch (error) {
            toast.error("Error rejecting listing");
        } finally {
            setProcessing(null);
        }
    };

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto pb-20">
            <h1 className="text-3xl font-bold mb-8">Pending Approvals</h1>

            {loading ? (
                <div>Loading...</div>
            ) : pendingListings.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-2xl">
                    <Check className="mx-auto h-12 w-12 text-green-500 mb-4" />
                    <h2 className="text-xl">All caught up!</h2>
                    <p className="text-muted-foreground">No pending listings to review.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {pendingListings.map(item => (
                        <div key={item.id} className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-6">
                            {/* Image Preview */}
                            <div className="w-full md:w-64 h-48 bg-black/50 rounded-xl overflow-hidden shrink-0">
                                <img src={item.images?.[0] || 'https://via.placeholder.com/400'} alt="Preview" className="w-full h-full object-cover" />
                            </div>

                            {/* Details */}
                            <div className="flex-1 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                            <MapPin size={14} /> {item.addressLine}, {item.city} ({item.pincode})
                                        </p>
                                    </div>
                                    <div className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                        Pending
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                                    <div>
                                        <p className="text-xs text-muted-foreground">Provider</p>
                                        <p className="font-medium flex items-center gap-1"><User size={12} /> {item.providerId?.name || 'Unknown'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Dimensions</p>
                                        <p className="font-medium flex items-center gap-1"><Ruler size={12} /> {item.dimensions.length}x{item.dimensions.width}m</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Capacity</p>
                                        <p className="font-medium">~{item.approxTotalCars} Cars</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Pricing</p>
                                        <p className="font-medium text-green-400">₹{item.pricing.hourlyRate}/hr</p>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-300 italic">"{item.description}"</p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-row md:flex-col gap-3 justify-center min-w-[150px]">
                                <button
                                    onClick={() => handleApprove(item.id)}
                                    disabled={processing === item.id}
                                    className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition"
                                >
                                    <Check size={18} /> Approve
                                </button>
                                <button
                                    onClick={() => setRejectId(item.id)}
                                    disabled={processing === item.id}
                                    className="bg-red-600/10 hover:bg-red-600 hover:text-white text-red-500 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition border border-red-500/20"
                                >
                                    <X size={18} /> Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Reject Dialog */}
            {rejectId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#1a1f2e] border border-white/10 p-6 rounded-2xl w-full max-w-md space-y-4">
                        <h3 className="text-xl font-bold">Reject Listing</h3>
                        <p className="text-muted-foreground text-sm">Please provide a reason for rejection.</p>
                        <textarea
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 outline-none focus:ring-2 focus:ring-red-500 h-32 text-white"
                            placeholder="Reason (e.g. Invalid photos, blurry images...)"
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                        />
                        <div className="flex gap-3 pt-2">
                            <button onClick={() => setRejectId(null)} className="flex-1 py-3 text-sm font-bold bg-white/5 hover:bg-white/10 rounded-xl">Cancel</button>
                            <button onClick={handleReject} className="flex-1 py-3 text-sm font-bold bg-red-600 hover:bg-red-700 text-white rounded-xl">Confirm Reject</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminApprovals;
