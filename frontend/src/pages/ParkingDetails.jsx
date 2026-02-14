import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/services/api";
import { createBooking } from "@/services/bookingService";
import PaymentModal from "@/components/PaymentModal";
import { Car, Bike, Zap } from 'lucide-react';

const vehicleOptions = [
    { label: "2 Wheeler", value: "TWO_WHEELER" },
    { label: "4 Seater Car", value: "FOUR_SEATER" },
    { label: "6 Seater Car", value: "SIX_SEATER" },
    { label: "SUV / Large", value: "SUV" },
];

export default function ParkingDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [parking, setParking] = useState(null);
    const [loading, setLoading] = useState(true);

    const [vehicleType, setVehicleType] = useState("FOUR_SEATER");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const [bookingLoading, setBookingLoading] = useState(false);
    const [msg, setMsg] = useState("");
    const [err, setErr] = useState("");

    // Payment Modal State
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    // User Vehicles
    const [userVehicles, setUserVehicles] = useState([]);

    useEffect(() => {
        const fetchParking = async () => {
            try {
                const res = await api.get(`/parkings/${id}`);
                setParking(res.data.parking || res.data);
            } catch (e) {
                setErr(e?.response?.data?.message || "Failed to load parking");
            } finally {
                setLoading(false);
            }
        };

        const fetchUserVehicles = () => {
            const userInfo = localStorage.getItem('userInfo');
            if (userInfo) {
                try {
                    const user = JSON.parse(userInfo);
                    if (user.vehicles) setUserVehicles(user.vehicles);
                } catch (e) { }
            }
        };

        fetchParking();
        fetchUserVehicles();
    }, [id]);

    const hourlyRate = useMemo(() => parking?.pricing?.hourlyRate || 0, [parking]);

    const totalHours = useMemo(() => {
        if (!startTime || !endTime) return 0;
        const s = new Date(startTime);
        const e = new Date(endTime);
        if (!(s < e)) return 0;
        return Math.ceil((e - s) / (1000 * 60 * 60));
    }, [startTime, endTime]);

    const totalAmount = useMemo(() => totalHours * hourlyRate, [totalHours, hourlyRate]);

    const handleBookingInitiate = () => {
        setErr("");
        setMsg("");

        if (!startTime || !endTime) {
            setErr("Select start and end time");
            return;
        }

        if (totalHours <= 0) {
            setErr("End time must be greater than start time");
            return;
        }

        // Open Payment Modal
        setShowPaymentModal(true);
    };

    const processBooking = async () => {
        setBookingLoading(true);
        try {
            const payload = {
                parkingId: parking.id,
                startTime,
                endTime,
                vehicleType,
            };
            const res = await createBooking(payload);
            setMsg(`Booking Successful ✅ Ticket: ${res.data.bookingId}`);

            // Close modal after brief success msg
            setTimeout(() => {
                setShowPaymentModal(false);
                navigate('/bookings'); // Redirect to tickets page
            }, 1000);

        } catch (e) {
            setErr(e?.response?.data?.message || "Booking failed");
            setShowPaymentModal(false);
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) return <div className="p-6 text-white">Loading...</div>;
    if (!parking) return <div className="p-6 text-red-400">{err || "Not found"}</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white p-6 pb-20">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">
                {/* LEFT */}
                <div className="lg:col-span-2 space-y-5">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h1 className="text-2xl font-bold">{parking.title}</h1>
                                <p className="text-white/60 mt-1">
                                    {parking.addressLine}, {parking.city}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-white/70 text-sm">Rate / hour</p>
                                <p className="text-xl font-bold">₹{hourlyRate}</p>
                            </div>
                        </div>
                    </div>

                    {/* Images */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                        <h2 className="font-semibold text-lg mb-4">Parking Images</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {(parking.images || []).map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt="parking"
                                    className="h-32 w-full object-cover rounded-xl border border-white/10"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                        <h2 className="font-semibold text-lg mb-4">Parking Details</h2>
                        <div className="grid md:grid-cols-2 gap-3 text-white/80">
                            <div>
                                <p className="text-white/60 text-sm">Owner Relation</p>
                                <p>{parking.ownershipRelation}</p>
                            </div>
                            <div>
                                <p className="text-white/60 text-sm">Available Time</p>
                                <p>
                                    {parking.availableFrom} - {parking.availableTo}
                                </p>
                            </div>
                            <div>
                                <p className="text-white/60 text-sm">Area</p>
                                <p>
                                    {parking.dimensions?.length}m × {parking.dimensions?.width}m ={" "}
                                    {parking.dimensions?.totalArea} m²
                                </p>
                            </div>
                            <div>
                                <p className="text-white/60 text-sm">Approx Cars</p>
                                <p>{parking.approxTotalCars}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT Booking Panel */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 h-fit sticky top-6">
                    <h2 className="font-semibold text-lg">Book Slot</h2>
                    <p className="text-white/60 text-sm mt-1">
                        Choose timing and confirm booking.
                    </p>

                    <div className="mt-4 space-y-3">
                        {/* Quick Select Vehicles */}
                        {userVehicles.length > 0 && (
                            <div className="mb-2">
                                <p className="text-xs text-white/50 mb-2 uppercase font-bold tracking-wider">My Garage</p>
                                <div className="flex flex-wrap gap-2">
                                    {userVehicles.map((v, i) => (
                                        <button
                                            key={i}
                                            onClick={() => {
                                                // Map basic types, naive mapping
                                                if (v.type === 'Bike') setVehicleType("TWO_WHEELER");
                                                else if (v.type === 'EV') setVehicleType("FOUR_SEATER"); // Assume 4 for now
                                                else setVehicleType("FOUR_SEATER"); // Default car
                                            }}
                                            className="text-xs bg-white/10 border border-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full flex items-center gap-1 transition"
                                        >
                                            {v.type === 'Bike' ? <Bike size={12} /> : <Car size={12} />}
                                            {v.plate}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="text-sm text-white/70">Vehicle Type</label>
                            <select
                                value={vehicleType}
                                onChange={(e) => setVehicleType(e.target.value)}
                                className="w-full mt-1 p-2 rounded-xl bg-black/40 border border-white/10 outline-none text-white"
                            >
                                {vehicleOptions.map((v) => (
                                    <option key={v.value} value={v.value}>
                                        {v.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-sm text-white/70">Start Time</label>
                            <input
                                type="datetime-local"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="w-full mt-1 p-2 rounded-xl bg-black/40 border border-white/10 outline-none text-white"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-white/70">End Time</label>
                            <input
                                type="datetime-local"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="w-full mt-1 p-2 rounded-xl bg-black/40 border border-white/10 outline-none text-white"
                            />
                        </div>

                        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                            <div className="flex justify-between text-white/70 text-sm">
                                <span>Total Hours</span>
                                <span>{totalHours}</span>
                            </div>
                            <div className="flex justify-between text-white/70 text-sm mt-1">
                                <span>Rate/hour</span>
                                <span>₹{hourlyRate}</span>
                            </div>
                            <div className="flex justify-between font-semibold mt-2">
                                <span>Total</span>
                                <span>₹{totalAmount}</span>
                            </div>
                        </div>

                        {err ? <p className="text-red-400 text-sm">{err}</p> : null}
                        {msg ? <p className="text-green-400 text-sm">{msg}</p> : null}

                        <button
                            disabled={bookingLoading}
                            onClick={handleBookingInitiate}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-semibold hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {bookingLoading ? "Processing..." : "Pay & Book"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            <PaymentModal
                isOpen={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                amount={totalAmount}
                onConfirm={processBooking}
            />
        </div>
    );
}
