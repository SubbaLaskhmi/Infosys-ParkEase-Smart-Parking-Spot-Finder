import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'; // Added useMap
import L from 'leaflet';
import axios from 'axios';
import { Search, MapPin, Navigation, Palette, X, ArrowLeft } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import io from 'socket.io-client';
import SuccessAnimation from '../components/SuccessAnimation';

import MagicFind from '../components/MagicFind';
import AIChatbot from '../components/AIChatbot';
import SpotFinderHeader from '../components/SpotFinderHeader';
import BookingDrawer from '../components/BookingDrawer';
import PaymentModal from '../components/PaymentModal';
import NavigationOverlay from '../components/NavigationOverlay';
import QRGenerator from '../components/QRGenerator';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

// Fix for default Leaflet marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// Custom Dark Circle Marker like Screenshot
const createCustomIcon = (price, isSelected) => {
    const displayPrice = price !== undefined && price !== null ? price : '--';
    return L.divIcon({
        className: 'custom-marker',
        html: `<div class="${isSelected ? 'bg-black border-green-500 scale-110' : 'bg-[#0f1219] border-white/20'} w-12 h-12 rounded-full border-2 flex items-center justify-center shadow-2xl transform transition-all hover:scale-110">
                <span class="${isSelected ? 'text-green-500' : 'text-white'} text-[13px] font-bold tracking-tighter">$${displayPrice}</span>
               </div>
               ${isSelected ? '<div class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-t-[8px] border-t-black border-r-[6px] border-r-transparent"></div>' : ''}
               `,
        iconSize: [48, 48], // Matched to w-12 (48px)
        iconAnchor: [24, 24], // Center (24px)
        popupAnchor: [0, -30]
    });
};

function RecenterMap({ center }) {
    const map = useMap();
    useEffect(() => {
        map.flyTo(center, 16, { animate: true, duration: 1.5 });
    }, [center, map]);
    return null;
}

const Home = () => {
    const navigate = useNavigate();
    const [parkingSpots, setParkingSpots] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    // const [loading, setLoading] = useState(true); // Unused
    const [userLocation, setUserLocation] = useState(null);
    const [center, setCenter] = useState([12.9716, 77.5946]); // Default: Bangalore
    const [sortType, setSortType] = useState(null); // Added sort state setter

    // UI State
    const [viewMode, setViewMode] = useState('map'); // 'map' or 'list'
    const [selectedSpot, setSelectedSpot] = useState(null); // For Booking Drawer
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [isQROpen, setIsQROpen] = useState(false);
    const [currentBooking, setCurrentBooking] = useState(null);
    const [navDestination, setNavDestination] = useState(null); // For Navigation Overlay
    const { addToast } = useToast();
    const { token } = useAuth(); // REPLACED: const { user, token } = useAuth();

    useEffect(() => {
        const socket = io(import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5002');
        socket.on('parking_update', () => { // Removed unused data param
            axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5002/api'}/parkings`)
                .then(({ data }) => {
                    setParkingSpots(data);
                });
        });
        return () => socket.disconnect();
    }, []);

    // Initial Fetch
    useEffect(() => {
        const fetchParkingSpots = async () => {
            try {
                // Fetch approved parkings from backend
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5002/api'}/parkings`);
                setParkingSpots(data);
            } catch (error) {
                console.error("Error fetching parkings", error);
            }
        };

        fetchParkingSpots();
    }, []);

    // Get User Location
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => setUserLocation([position.coords.latitude, position.coords.longitude]),
                (error) => console.error("Location error", error)
            );
        }
    }, []);

    // Unified Filter & Sort Logic (useMemo)
    const filteredSpots = React.useMemo(() => {
        let result = [...parkingSpots];

        // 1. Filter
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            result = result.filter(spot =>
                (spot.title?.toLowerCase().includes(lowerQuery) || false) ||
                (spot.addressLine?.toLowerCase().includes(lowerQuery) || false) ||
                (spot.city?.toLowerCase().includes(lowerQuery) || false)
            );
        }

        // 2. Sort
        if (sortType === 'cheapest') {
            result.sort((a, b) => {
                const priceA = (a.pricing && a.pricing.hourlyRate !== undefined && a.pricing.hourlyRate !== null) ? Number(a.pricing.hourlyRate) : Infinity;
                const priceB = (b.pricing && b.pricing.hourlyRate !== undefined && b.pricing.hourlyRate !== null) ? Number(b.pricing.hourlyRate) : Infinity;
                return priceA - priceB;
            });
        } else if (sortType === 'rating') {
            result.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
        } else if (sortType === 'closest') {
            if (userLocation) {
                const getDist = (spot) => {
                    if (!spot.location) return Infinity;
                    const { lat, lng } = spot.location;
                    return Math.sqrt(Math.pow(lat - userLocation[0], 2) + Math.pow(lng - userLocation[1], 2));
                };
                result.sort((a, b) => getDist(a) - getDist(b));
            }
        }
        return result;
    }, [searchQuery, parkingSpots, sortType, userLocation]);

    // Magic Sort Logic
    const handleMagicSort = (type) => {
        setSortType(type);

        // Immediate visual feedback computing
        // Since filteredSpots is memoized and won't update until next render, we re-calculate
        // the top result here just for the purpose of centering the map.
        let potentialSorted = [...(parkingSpots || [])];

        // Apply current search filter first
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            potentialSorted = potentialSorted.filter(spot =>
                (spot.title?.toLowerCase().includes(lowerQuery) || false) ||
                (spot.addressLine?.toLowerCase().includes(lowerQuery) || false) ||
                (spot.city?.toLowerCase().includes(lowerQuery) || false)
            );
        }

        if (type === 'cheapest') {
            potentialSorted.sort((a, b) => {
                const priceA = (a.pricing && a.pricing.hourlyRate !== undefined && a.pricing.hourlyRate !== null) ? Number(a.pricing.hourlyRate) : Infinity;
                const priceB = (b.pricing && b.pricing.hourlyRate !== undefined && b.pricing.hourlyRate !== null) ? Number(b.pricing.hourlyRate) : Infinity;
                return priceA - priceB;
            });
        } else if (type === 'rating') {
            potentialSorted.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
        } else if (type === 'closest') {
            if (!userLocation) {
                alert("Please enable location to find closest spots.");
                return;
            }
            const getDist = (spot) => {
                if (!spot.location) return Infinity;
                const { lat, lng } = spot.location;
                return Math.sqrt(Math.pow(lat - userLocation[0], 2) + Math.pow(lng - userLocation[1], 2));
            };
            potentialSorted.sort((a, b) => getDist(a) - getDist(b));
        }

        // Visual Feedback: Fly to top result
        if (potentialSorted.length > 0) {
            const bestSpot = potentialSorted[0];
            if (bestSpot.location) {
                setCenter([bestSpot.location.lat, bestSpot.location.lng]);
            }
        }
    };

    // Handlers
    const handleSpotClick = (spot) => {
        setSelectedSpot(spot);
    };

    const handleReserveClick = (spot) => {
        if (!token) {
            addToast("Please login to book a spot", "error");
            navigate('/login');
            return;
        }
        setSelectedSpot(spot);
        setIsBookingOpen(true);
    };

    const handleShowRoute = (spot) => {
        setNavDestination(spot);
        setIsBookingOpen(false); // Close booking if open
    };

    const handleConfirmBooking = () => {
        setIsBookingOpen(false);
        setIsPaymentOpen(true);
    };

    const handlePaymentSuccess = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, // Use token from context
                    'Content-Type': 'application/json'
                },
            };

            const bookingData = {
                parkingId: selectedSpot.id,
                startTime: new Date(),
                endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // Default 2 hours
                totalAmount: selectedSpot.pricing?.hourlyRate * 2 || 50,
                vehicleType: 'FOUR_SEATER'
            };

            const { data } = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5002/api'}/bookings`, bookingData, config);

            addToast(`Booking Confirmed for ${selectedSpot.name}!`, 'success');
            // setIsPaymentOpen(false); // Handled by PaymentModal on success

            // Show QR Ticket
            setCurrentBooking({
                ...data,
                bookingId: data.id || data.bookingId || `BK-${Date.now()}`,
                parkingName: selectedSpot.name,
                amount: selectedSpot.pricing?.hourlyRate * 2 || 50,
                location: selectedSpot.location
            });
            setIsQROpen(true);
        } catch (error) {
            console.error(error);
            addToast(error.response?.data?.message || 'Booking failed', 'error');
            throw error; // Re-throw so PaymentModal knows it failed
        }
    };

    return (
        <div className="h-screen w-full flex flex-col relative bg-[#0f1219] overflow-hidden">

            {/* Header */}
            <SpotFinderHeader viewMode={viewMode} setViewMode={setViewMode} />

            {/* Back Button (Desktop) - Removed as it's now in Header */}

            {/* Main Content Area */}
            <div className="flex-1 relative">

                {/* Search Bar - Floating Glass Overlay */}
                <div className="absolute top-24 left-1/2 -translate-x-1/2 z-[400] w-[92%] md:w-full max-w-xl px-0 md:px-4">
                    <div className="relative flex items-center bg-white/80 backdrop-blur-xl rounded-full shadow-2xl px-6 py-4 border border-white/40 ring-1 ring-black/5 transition-all hover:scale-[1.01] hover:bg-white/90 group">
                        <Search className="text-gray-500 group-focus-within:text-purple-600 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search locations, cities, or parking hubs..."
                            className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder:text-gray-400 font-medium"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div className="w-px h-6 bg-gray-200 mx-3"></div>
                        <button className="bg-gray-50 p-2 rounded-full hover:bg-gray-100 transition border border-gray-200">
                            <Search size={16} className="text-gray-500" />
                        </button>
                    </div>
                </div>

                {viewMode === 'map' ? (
                    <div className="h-full w-full relative z-0">
                        <MapContainer center={center} zoom={14} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                            <RecenterMap center={center} />
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                            />

                            {/* Navigation Route Line (Simulated) */}
                            {navDestination && userLocation && (
                                <Polyline
                                    positions={[
                                        userLocation,
                                        [navDestination.location.lat, navDestination.location.lng]
                                    ]}
                                    pathOptions={{ color: '#3b82f6', weight: 6, opacity: 0.9 }}
                                />
                            )}

                            {filteredSpots.map((spot) => (
                                spot.location && spot.location.lat && (
                                    <Marker
                                        key={`${spot.id}-${spot.pricing?.hourlyRate}`}
                                        position={[spot.location.lat, spot.location.lng]}
                                        icon={createCustomIcon(spot.pricing?.hourlyRate, selectedSpot?.id === spot.id)}
                                        eventHandlers={{
                                            click: () => handleSpotClick(spot),
                                        }}
                                    >
                                        <Popup className="glass-popup" minWidth={260} closeButton={false}>
                                            <div className="bg-[#131722] text-white p-5 rounded-2xl shadow-2xl border border-white/5 -m-[1px] relative overflow-hidden">
                                                <button className="absolute top-3 right-3 text-gray-500 hover:text-white" onClick={() => {
                                                    // e.stopPropagation(); 
                                                }}>
                                                    <X size={16} />
                                                </button>

                                                <h3 className="font-bold text-xl leading-tight mb-1 pr-4">{spot.name}</h3>
                                                <p className="text-xs text-gray-400 mb-4">{spot.city}</p>

                                                <div className="flex items-center gap-3 mb-5">
                                                    <span className="text-blue-400 font-bold text-xl">₹{spot.pricing?.hourlyRate}<span className="text-sm text-gray-500 font-normal">/hr</span></span>
                                                    <span className="bg-[#1c3a2f] text-[#34d399] text-[10px] font-bold px-2 py-1 rounded tracking-wider uppercase">
                                                        {spot.status || 'AVAILABLE'}
                                                    </span>
                                                </div>

                                                <div className="flex flex-col gap-2.5">
                                                    <button
                                                        onClick={() => handleReserveClick(spot)}
                                                        className="w-full bg-[#1e2330] hover:bg-[#252b3b] border border-white/5 text-white py-2.5 rounded-lg text-sm font-semibold transition-colors"
                                                    >
                                                        Details
                                                    </button>
                                                    <button
                                                        onClick={() => handleShowRoute(spot)}
                                                        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-blue-600/20 transition-all"
                                                    >
                                                        Show Route
                                                    </button>
                                                </div>
                                            </div>
                                        </Popup>
                                    </Marker>
                                )
                            ))}

                            {/* User Location Marker */}
                            {userLocation && (
                                <Marker position={userLocation} icon={L.divIcon({
                                    className: 'user-marker',
                                    html: '<div class="w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow-lg pulse-ring"></div>',
                                    iconSize: [20, 20]
                                })} />
                            )}

                        </MapContainer>
                    </div>
                ) : (
                    <div className="h-full w-full overflow-y-auto bg-[#0f1219] p-4 pt-20 pb-32">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-2xl font-bold text-white mb-6">Available Spots ({filteredSpots.length})</h2>

                            {filteredSpots.length === 0 ? (
                                <div className="text-center py-20">
                                    <div className="bg-white/5 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                                        <Search className="text-gray-500" size={32} />
                                    </div>
                                    <h3 className="text-white text-lg font-semibold">No spots found</h3>
                                    <p className="text-gray-400">Try adjusting your filters or search area</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {filteredSpots.map((spot) => (
                                        <div key={spot.id} className="bg-[#1a1f2e] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all group">
                                            {/* Image Placeholder or Map Preview */}
                                            <div className="h-48 bg-[#131722] relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f2e] to-transparent z-10"></div>
                                                {/* You could add a mini map here or a placeholder image */}
                                                <div className="w-full h-full flex items-center justify-center text-gray-600">
                                                    <MapPin size={48} className="opacity-20" />
                                                </div>

                                                <div className="absolute top-3 right-3 z-20">
                                                    <span className="bg-[#1c3a2f] text-[#34d399] text-[10px] font-bold px-2 py-1 rounded tracking-wider uppercase border border-[#34d399]/20">
                                                        {spot.status || 'AVAILABLE'}
                                                    </span>
                                                </div>

                                                <div className="absolute bottom-3 left-3 z-20">
                                                    <h3 className="text-white font-bold text-lg leading-tight">{spot.name}</h3>
                                                    <p className="text-gray-400 text-xs truncate max-w-[200px]">{spot.addressLine}, {spot.city}</p>
                                                </div>
                                            </div>

                                            <div className="p-4">
                                                <div className="flex justify-between items-end mb-4">
                                                    <div>
                                                        <p className="text-gray-400 text-xs uppercase tracking-wider font-bold mb-1">Price</p>
                                                        <div className="flex items-baseline gap-1">
                                                            <span className="text-2xl font-bold text-white">₹{spot.pricing?.hourlyRate}</span>
                                                            <span className="text-sm text-gray-500">/hr</span>
                                                        </div>
                                                    </div>

                                                    {userLocation && spot.location && (
                                                        <div className="text-right">
                                                            <p className="text-gray-400 text-xs uppercase tracking-wider font-bold mb-1">Distance</p>
                                                            <span className="text-blue-400 font-bold">
                                                                {(() => {
                                                                    const dist = Math.sqrt(
                                                                        Math.pow(spot.location.lat - userLocation[0], 2) +
                                                                        Math.pow(spot.location.lng - userLocation[1], 2)
                                                                    ) * 111; // Approx km
                                                                    return dist.toFixed(1);
                                                                })()} km
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-2 gap-3">
                                                    <button
                                                        onClick={() => handleShowRoute(spot)}
                                                        className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                                                    >
                                                        <Navigation size={16} />
                                                        Route
                                                    </button>
                                                    <button
                                                        onClick={() => handleReserveClick(spot)}
                                                        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-lg shadow-blue-600/20 transition-all"
                                                    >
                                                        Book Now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Overlays */}
                <BookingDrawer
                    isOpen={isBookingOpen}
                    onClose={() => setIsBookingOpen(false)}
                    spot={selectedSpot}
                    onConfirm={handleConfirmBooking}
                />

                <NavigationOverlay
                    isNavigating={!!navDestination}
                    destination={navDestination}
                    onStopNavigation={() => setNavDestination(null)}
                />

                <PaymentModal
                    isOpen={isPaymentOpen}
                    onClose={() => setIsPaymentOpen(false)}
                    amount={selectedSpot?.pricing?.hourlyRate * 2 || 50}
                    onConfirm={handlePaymentSuccess}
                />

                <QRGenerator
                    isOpen={isQROpen}
                    onClose={() => setIsQROpen(false)}
                    booking={currentBooking}
                />

                {/* Magic Find Button (Smart Sort) */}
                <MagicFind onSort={handleMagicSort} />

                {/* AI Chatbot (ParkGenie) */}
                <AIChatbot />

            </div>
        </div>
    );
};

export default Home;

