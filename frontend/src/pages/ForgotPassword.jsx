import React, { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg("");
        setError("");
        setLoading(true);

        try {
            const res = await api.post("/auth/forgot-password", { email });
            setMsg(res.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white p-4">
            <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                {/* Decor */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10" />

                <Link to="/login" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-6 text-sm">
                    <ArrowLeft size={16} /> Back to Login
                </Link>

                <h1 className="text-2xl font-bold mb-2">Forgot Password?</h1>
                <p className="text-white/60 mb-6 text-sm">Enter your email address to verify your identity and reset your password.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-white/40" size={20} />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full pl-10 p-3 rounded-xl bg-black/40 border border-white/10 outline-none focus:border-blue-500 transition-colors"
                            required
                        />
                    </div>
                    <button
                        disabled={loading}
                        className="w-full p-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>

                {msg && <div className="mt-4 p-3 bg-green-500/20 text-green-400 rounded-lg text-sm">{msg}</div>}
                {error && <div className="mt-4 p-3 bg-red-500/20 text-red-400 rounded-lg text-sm">{error}</div>}
            </div>
        </div>
    );
}
