import React, { useState } from 'react';
import axios from 'axios';
import { QrCode, ArrowLeft, CheckCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CheckInScan = () => {
    const navigate = useNavigate();
    const [bookingId, setBookingId] = useState('');
    const [bookingDetails, setBookingDetails] = useState(null);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');
        setBookingDetails(null);

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

            // Re-using getBookingById. Ideally provider should have access.
            // If getBookingById is restricted to own booking, this might fail unless provider is admin or owns the spot.
            // For MVP, assuming getBookingById allows provider/admin to view.
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5002/api'}/bookings/${bookingId}`, config);
            setBookingDetails(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Booking not found');
        }
    };

    const handleAction = async (action) => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

            await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5002/api'}/bookings/${bookingId}/${action}`, {}, config);

            setSuccessMsg(`Successfully ${action === 'checkin' ? 'Checked In' : 'Checked Out'}!`);
            // Refresh details
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5002/api'}/bookings/${bookingId}`, config);
            setBookingDetails(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Action failed');
        }
    };

    return (
        <div className="min-h-screen p-6 pt-10 flex flex-col items-center max-w-lg mx-auto">
            <button onClick={() => navigate(-1)} className="self-start text-gray-400 hover:text-white mb-6 flex items-center gap-2">
                <ArrowLeft size={16} /> Back
            </button>

            <h1 className="text-3xl font-bold mb-8">Process Booking</h1>

            <div className="glass-card p-8 w-full space-y-6">
                <form onSubmit={handleSearch} className="space-y-4">
                    <label className="block text-sm font-medium">Enter Ticket ID / Booking ID</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={bookingId}
                            onChange={(e) => setBookingId(e.target.value)}
                            placeholder="e.g. 64b3f..."
                            className="flex-1 bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white"
                        />
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-bold">
                            Search
                        </button>
                    </div>
                </form>

                {error && <div className="bg-red-500/20 text-red-300 p-3 rounded text-sm text-center">{error}</div>}
                {successMsg && <div className="bg-green-500/20 text-green-300 p-3 rounded text-sm text-center">{successMsg}</div>}

                {bookingDetails && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                        <div className="border-t border-white/10 pt-6">
                            <h3 className="font-bold text-lg mb-2 text-center text-blue-300">Ticket Found</h3>
                            <div className="bg-white/5 p-4 rounded-lg space-y-2 text-sm">
                                <p><span className="text-gray-400">User:</span> {bookingDetails.user?.name}</p>
                                <p><span className="text-gray-400">Parking:</span> {bookingDetails.parking?.name}</p>
                                <p><span className="text-gray-400">Vehicle:</span> {bookingDetails.vehicleType}</p>
                                <p><span className="text-gray-400">Time:</span> {new Date(bookingDetails.startTime).toLocaleString()} - {new Date(bookingDetails.endTime).toLocaleString()}</p>
                                <p className="flex items-center gap-2 mt-2">
                                    <span className="text-gray-400">Status:</span>
                                    <span className={`px-2 py-0.5 rounded font-bold uppercase text-xs ${bookingDetails.status === 'BOOKED' ? 'bg-green-500/20 text-green-400' :
                                        bookingDetails.status === 'CHECKED_IN' ? 'bg-yellow-500/20 text-yellow-400' :
                                            'bg-gray-500/20 text-gray-400'
                                        }`}>
                                        {bookingDetails.status}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => handleAction('checkin')}
                                disabled={bookingDetails.status !== 'BOOKED'}
                                className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-bold flex flex-col items-center justify-center gap-1"
                            >
                                <CheckCircle size={20} /> Check In
                            </button>
                            <button
                                onClick={() => handleAction('checkout')}
                                disabled={bookingDetails.status !== 'CHECKED_IN'}
                                className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-bold flex flex-col items-center justify-center gap-1"
                            >
                                <LogOut size={20} /> Check Out
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckInScan;
