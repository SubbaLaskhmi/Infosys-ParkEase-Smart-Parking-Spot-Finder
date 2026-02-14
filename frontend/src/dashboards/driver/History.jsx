import React, { useEffect, useState } from "react";
import { getMyHistory } from "@/services/bookingService";

const statusBadge = (status) => {
    if (status === "CHECKED_OUT") return "bg-green-600/20 text-green-400 border-green-500/30";
    if (status === "CANCELLED") return "bg-red-600/20 text-red-400 border-red-500/30";
    if (status === "EXPIRED") return "bg-yellow-600/20 text-yellow-400 border-yellow-500/30";
    return "bg-white/10 text-white border-white/10";
};

export default function History() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [err, setErr] = useState("");

    useEffect(() => {
        const run = async () => {
            try {
                setLoading(true);
                const res = await getMyHistory();
                setItems(res.data || []);
            } catch (e) {
                setErr(e?.response?.data?.message || "Failed to load history");
            } finally {
                setLoading(false);
            }
        };
        run();
    }, []);

    if (loading) return <div className="p-6 text-white text-center">Loading history...</div>;
    if (err) return <div className="p-6 text-red-400 text-center">{err}</div>;

    return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white pb-20">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold">Booking History</h1>
                <p className="text-white/60 mt-1">Past bookings and completed tickets.</p>

                <div className="mt-6 space-y-4">
                    {items.length === 0 ? (
                        <div className="text-white/70">No history yet.</div>
                    ) : (
                        items.map((b) => (
                            <div
                                key={b.id}
                                className="rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col md:flex-row md:items-center gap-4"
                            >
                                <div className="flex-1">
                                    <h2 className="font-semibold text-lg">{b.parkingId?.title || "Parking"}</h2>
                                    <p className="text-white/60 text-sm">
                                        {b.parkingId?.addressLine}, {b.parkingId?.city}
                                    </p>

                                    <div className="mt-2 text-white/70 text-sm">
                                        <p>
                                            <span className="text-white/60">Booking:</span>{" "}
                                            <span className="font-semibold">{b.bookingId}</span>
                                        </p>
                                        <p>
                                            <span className="text-white/60">Vehicle:</span> {b.vehicleType}
                                        </p>
                                        <p>
                                            <span className="text-white/60">From:</span>{" "}
                                            {new Date(b.startTime).toLocaleString()}
                                        </p>
                                        <p>
                                            <span className="text-white/60">To:</span>{" "}
                                            {new Date(b.endTime).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="text-white/60 text-xs">Total Paid</p>
                                    <p className="text-xl font-bold">₹{b.totalAmount}</p>

                                    <span
                                        className={`inline-block mt-2 px-3 py-1 rounded-full border text-xs ${statusBadge(
                                            b.status
                                        )}`}
                                    >
                                        {b.status}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
