import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { Lock, CheckCircle } from "lucide-react";

export default function ResetPassword() {
    const { token } = useParams();
    const nav = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg("");
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const res = await api.post(`/auth/reset-password/${token}`, { password });
            setMsg(res.data.message);
            setTimeout(() => nav("/login"), 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white p-4">
            <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
                <p className="text-white/60 mb-6 text-sm">Enter your new password below.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="New password"
                            className="w-full p-3 rounded-xl bg-black/40 border border-white/10 outline-none focus:border-green-500 transition-colors"
                            required
                            minLength={6}
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            className="w-full p-3 rounded-xl bg-black/40 border border-white/10 outline-none focus:border-green-500 transition-colors"
                            required
                        />
                    </div>

                    <button
                        disabled={loading}
                        className="w-full p-3 rounded-xl bg-green-600 hover:bg-green-700 font-semibold disabled:opacity-50"
                    >
                        {loading ? "Updating..." : "Update Password"}
                    </button>
                </form>

                {msg && <div className="mt-4 p-3 bg-green-500/20 text-green-400 rounded-lg text-sm">{msg}</div>}
                {error && <div className="mt-4 p-3 bg-red-500/20 text-red-400 rounded-lg text-sm">{error}</div>}
            </div>
        </div>
    );
}
