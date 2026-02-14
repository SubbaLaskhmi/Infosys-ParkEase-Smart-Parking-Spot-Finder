import { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, User, CheckCircle, XCircle } from 'lucide-react';
import ProviderService from '../../services/providerService';

const OwnerBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await ProviderService.getProviderBookings();
                setBookings(data);
            } catch (error) {
                console.error("Failed to fetch bookings", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    if (loading) return <div className="p-8 text-center text-white">Loading bookings...</div>;

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Bookings & Reservations</h1>
                    <p className="text-muted-foreground">View and manage upcoming customer arrivals</p>
                </div>
            </div>

            {bookings.length === 0 ? (
                <div className="glass-card p-12 rounded-2xl border border-white/10 text-center text-gray-400">
                    <Calendar size={48} className="mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-bold text-white mb-2">No Bookings Yet</h3>
                    <p>When drivers book your spots, they will appear here.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {bookings.map((booking) => (
                        <div key={booking.id || booking.bookingId} className="p-4 rounded-xl border border-white/10 bg-white/5 flex flex-col md:flex-row justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-semibold text-white">Booking #{booking.bookingId}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                                    <Clock size={14} />
                                    <span>{new Date(booking.startTime).toLocaleString()} - {new Date(booking.endTime).toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                                    <User size={14} />
                                    <span>
                                        {typeof booking.userId === 'object' && booking.userId !== null
                                            ? (booking.userId.name || booking.userId.email || booking.userId.id || 'Unknown User')
                                            : (booking.userId || 'Unknown User')}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${booking.status === 'BOOKED' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                    booking.status === 'CANCELLED' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                        'bg-gray-500/10 text-gray-400 border-gray-500/20'
                                    }`}>
                                    {booking.status}
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-bold text-white">₹{booking.totalAmount}</div>
                                    <div className="text-xs text-gray-500">{booking.vehicleType}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OwnerBookings;
