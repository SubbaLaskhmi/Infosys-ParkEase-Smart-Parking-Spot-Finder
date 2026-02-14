import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getMyTickets, cancelBooking } from '../../services/bookingService';
import { MapPin, Navigation, Clock, XCircle, QrCode } from 'lucide-react';

const MyBookings = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTickets = async () => {
        try {
            // The original instruction snippet for fetchTickets seems to be incorrect
            // and refers to a booking creation flow rather than fetching tickets.
            // Assuming the intent was to keep the ticket fetching logic,
            // but if there was a specific "data access" fix intended, it's not clear from the snippet.
            // For now, retaining the original correct logic for fetching tickets.
            const res = await getMyTickets();

            setTickets(res.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);


    const handleCancel = async (id) => {
        if (!window.confirm("Are you sure you want to cancel this booking?")) return;
        try {
            await cancelBooking(id);
            toast.success("Booking cancelled successfully");
            fetchTickets(); // Refresh
        } catch (error) {
            console.error(error);
            toast.error("Cancel failed");
        }
    };

    const handleNavigate = (lat, lng) => {
        const url = `https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=${lat},${lng}&travelmode=driving`;
        window.open(url, "_blank");
    };

    return (
        <div className="p-6 md:p-8 max-w-5xl mx-auto pb-20">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <QrCode className="text-green-400" /> Active Tickets
            </h1>

            {loading ? (
                <div>Loading tickets...</div>
            ) : (!Array.isArray(tickets) || tickets.length === 0) ? (
                <div className="text-center py-20 bg-white/5 rounded-2xl">
                    <p className="text-muted-foreground">No active bookings.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {tickets.map(ticket => (
                        <div key={ticket.id} className="glass-card p-0 rounded-2xl overflow-hidden flex flex-col border border-white/10">
                            {/* Top Color Bar */}
                            <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500" />

                            <div className="p-6 flex gap-6">
                                {/* Left: Info */}
                                <div className="flex-1 space-y-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">{ticket.parkingId?.title}</h3>
                                        <p className="text-sm text-gray-400 flex items-center gap-1">
                                            <MapPin size={14} /> {ticket.parkingId?.addressLine}
                                        </p>
                                    </div>

                                    <div className="bg-black/30 p-3 rounded-lg space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">From</span>
                                            <span className="font-mono text-white">{new Date(ticket.startTime).toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">To</span>
                                            <span className="font-mono text-white">{new Date(ticket.endTime).toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm pt-2 border-t border-white/5">
                                            <span className="text-gray-500">Vehicle</span>
                                            <span className="text-blue-400 font-bold text-xs">{ticket.vehicleType}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleNavigate(ticket.parkingId.location.lat, ticket.parkingId.location.lng)}
                                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition"
                                        >
                                            <Navigation size={16} /> Navigate
                                        </button>
                                        <button
                                            onClick={() => handleCancel(ticket.id)}
                                            className="px-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition"
                                        >
                                            <XCircle size={20} />
                                        </button>
                                    </div>
                                </div>

                                {/* Right: QR & ID */}
                                <div className="flex flex-col items-center justify-center border-l border-white/10 pl-6 gap-2">
                                    <div className="bg-white p-2 rounded-xl">
                                        <img src={ticket.qrCodeDataUrl} alt="QR Code" className="w-24 h-24" />
                                    </div>
                                    <span className="font-mono text-xs text-gray-400 tracking-wider">{ticket.bookingId}</span>
                                    <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-[10px] font-bold uppercase">
                                        {ticket.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;
