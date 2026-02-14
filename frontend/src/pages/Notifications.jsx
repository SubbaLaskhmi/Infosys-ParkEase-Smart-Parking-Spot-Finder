import React, { useEffect, useState } from "react";
import { getNotifications, markAllRead, markRead } from "@/services/notificationService";

export default function Notifications() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAll = async () => {
        const res = await getNotifications();
        setList(res.data || []);
    };

    useEffect(() => {
        (async () => {
            setLoading(true);
            await fetchAll();
            setLoading(false);
        })();
    }, []);

    const handleMarkRead = async (id) => {
        await markRead(id);
        fetchAll();
    };

    const handleMarkAll = async () => {
        await markAllRead();
        fetchAll();
    };

    if (loading) return <div className="p-6 text-white text-center">Loading notifications...</div>;

    return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Notifications</h1>
                    <button
                        onClick={handleMarkAll}
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10"
                    >
                        Mark all read
                    </button>
                </div>

                <div className="mt-6 space-y-3">
                    {list.length === 0 ? (
                        <p className="text-white/70">No notifications.</p>
                    ) : (
                        list.map((n) => (
                            <div
                                key={n.id}
                                className={`rounded-2xl border p-4 ${n.read
                                    ? "bg-white/5 border-white/10"
                                    : "bg-blue-600/10 border-blue-500/30"
                                    }`}
                            >
                                <div className="flex justify-between gap-3">
                                    <div>
                                        <p className="font-semibold">{n.title}</p>
                                        <p className="text-white/70 text-sm mt-1">{n.message}</p>
                                        <p className="text-white/40 text-xs mt-2">
                                            {new Date(n.createdAt).toLocaleString()}
                                        </p>
                                    </div>

                                    {!n.read && (
                                        <button
                                            onClick={() => handleMarkRead(n.id)}
                                            className="h-fit px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10"
                                        >
                                            Mark read
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
