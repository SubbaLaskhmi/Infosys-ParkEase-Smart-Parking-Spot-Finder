import React, { useEffect, useState } from "react";
import { cancelBooking, getMyTickets, extendBooking } from "@/services/bookingService";

const timeLeftText = (endTime) => {
    const end = new Date(endTime).getTime();
    const now = Date.now();
    const diff = end - now;
    if (diff <= 0) return "Expired";

    const mins = Math.floor(diff / (1000 * 60));
    const hrs = Math.floor(mins / 60);
    const remMin = mins % 60;

    if (hrs <= 0) return `${remMin} min left`;
    return `${hrs}h ${remMin}m left`;
};

export default function Tickets() {
    const [loading, setLoading] = useState(true);
    const [tickets, setTickets] = useState([]);
    const [err, setErr] = useState("");

    const fetchTickets = async () => {
        try {
            setLoading(true);
            const res = await getMyTickets();
            setTickets(res.data || []);
        } catch (e) {
            setErr(e?.response?.data?.message || "Failed to fetch tickets");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const handleCancel = async (id) => {
        if (!confirm("Cancel this booking?")) return;
        try {
            await cancelBooking(id);
            fetchTickets();
        } catch (e) {
            alert(e?.response?.data?.message || "Cancel failed");
        }
    };

    if (loading) return <div className="p-6 text-white text-center">Loading tickets...</div>;
    if (err) return <div className="p-6 text-red-400 text-center">{err}</div>;

    return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white pb-20">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold">My Tickets</h1>
                <p className="text-white/60 mt-1">Active bookings & QR tickets.</p>

                <div className="mt-6 grid md:grid-cols-2 gap-5">
                    {(!Array.isArray(tickets) || tickets.length === 0) ? (
                        <div className="text-white/70">No active tickets.</div>
                    ) : (
                        tickets.map((t) => {
                            const p = t.parkingId;
                            const lat = p?.location?.lat;
                            const lng = p?.location?.lng;

                            const navUrl =
                                lat && lng
                                    ? `https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=${lat},${lng}&travelmode=driving`
                                    : null;

                            return (
                                <div
                                    key={t.id}
                                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <h2 className="font-semibold text-lg">{p?.title || "Parking"}</h2>
                                            <p className="text-white/60 text-sm">
                                                {p?.addressLine}, {p?.city}
                                            </p>
                                            <p className="text-white/70 text-sm mt-2">
                                                <span className="font-semibold">{t.bookingId}</span> •{" "}
                                                {timeLeftText(t.endTime)}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white/60 text-xs">Total</p>
                                            <p className="font-bold text-lg">₹{t.totalAmount}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex gap-4">
                                        <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                                            <img
                                                src={t.qrCodeDataUrl}
                                                alt="QR"
                                                className="w-28 h-28 rounded-lg"
                                            />
                                            <p className="text-white/60 text-xs mt-2 text-center">QR Ticket</p>
                                        </div>

                                        <div className="flex-1 text-sm text-white/75 space-y-1">
                                            <p>
                                                <span className="text-white/60">Vehicle:</span> {t.vehicleType}
                                            </p>
                                            <p>
                                                <span className="text-white/60">Start:</span>{" "}
                                                {new Date(t.startTime).toLocaleString()}
                                            </p>
                                            <p>
                                                <span className="text-white/60">End:</span>{" "}
                                                {new Date(t.endTime).toLocaleString()}
                                            </p>
                                            <p>
                                                <span className="text-white/60">Hours:</span> {t.totalHours}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex flex-wrap gap-3">
                                        <button
                                            onClick={() => handleCancel(t.id)}
                                            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-red-400"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            onClick={async () => {
                                                if (!confirm("Extend by 1 hour?")) return;
                                                try { await extendBooking(t.id, 1); fetchTickets(); } catch (e) { alert(e.response?.data?.message || "Failed"); }
                                            }}
                                            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-blue-300"
                                        >
                                            +1h
                                        </button>

                                        <button
                                            onClick={async () => {
                                                if (!confirm("Extend by 2 hours?")) return;
                                                try { await extendBooking(t.id, 2); fetchTickets(); } catch (e) { alert(e.response?.data?.message || "Failed"); }
                                            }}
                                            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-blue-300"
                                        >
                                            +2h
                                        </button>

                                        <button
                                            disabled={!navUrl}
                                            onClick={() => window.open(navUrl, "_blank")}
                                            className="ml-auto px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-semibold hover:opacity-90 disabled:opacity-50"
                                        >
                                            Navigate
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
