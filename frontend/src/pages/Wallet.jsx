import React, { useState } from 'react';
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, CreditCard, History, Banknote } from 'lucide-react';
import api from '../services/api';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

const WalletPage = () => {
    const { user, setUser } = useAuth();
    const [amount, setAmount] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [wLoading, setWLoading] = useState(false);
    const { addToast } = useToast();

    const handleAddMoney = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post('/auth/wallet/add', {
                amount: Number(amount)
            });

            setUser(data);
            addToast(`Successfully added ₹${amount}!`, 'success');
            setAmount('');
        } catch (error) {
            console.error(error);
            addToast(error.response?.data?.message || 'Failed to add funds.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleWithdrawMoney = async (e) => {
        e.preventDefault();
        setWLoading(true);
        try {
            const { data } = await api.post('/auth/wallet/withdraw', {
                amount: Number(withdrawAmount)
            });

            setUser(data);
            addToast(`Successfully withdrawn ₹${withdrawAmount}!`, 'success');
            setWithdrawAmount('');
        } catch (error) {
            console.error(error);
            addToast(error.response?.data?.message || 'Failed to withdraw funds.', 'error');
        } finally {
            setWLoading(false);
        }
    };

    if (!user) return <div className="p-6 text-center">Please login to view wallet.</div>;

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-8 pb-24">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Payment Wallet
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Balance & Actions */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="glass-card p-8 bg-gradient-to-br from-blue-900/60 to-purple-900/60 border-blue-500/30 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h4 className="text-sm font-medium text-blue-200 uppercase tracking-wider">Total Balance</h4>
                                    <h2 className="text-5xl font-bold text-white mt-2">₹{user.walletBalance || 0}.00</h2>
                                </div>
                                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                                    <Wallet size={32} className="text-white" />
                                </div>
                            </div>

                            {/* Add Funds Form */}
                            <form onSubmit={handleAddMoney} className="space-y-4 mb-8">
                                <label className="text-xs font-bold text-blue-300 uppercase">Add Money</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                                    <input
                                        type="number"
                                        placeholder="Enter amount"
                                        className="w-full bg-black/40 border border-white/10 rounded-xl pl-8 pr-4 py-3 outline-none focus:border-blue-500 transition"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        min="1"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition flex items-center justify-center gap-2"
                                >
                                    {loading ? 'Processing...' : <><Plus size={20} /> Add Funds</>}
                                </button>
                            </form>

                            {/* Withdraw Funds Form */}
                            <form onSubmit={handleWithdrawMoney} className="space-y-4 pt-4 border-t border-white/10">
                                <label className="text-xs font-bold text-purple-300 uppercase">Withdraw Money</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                                    <input
                                        type="number"
                                        placeholder="Amount to withdraw"
                                        className="w-full bg-black/40 border border-white/10 rounded-xl pl-8 pr-4 py-3 outline-none focus:border-purple-500 transition"
                                        value={withdrawAmount}
                                        onChange={(e) => setWithdrawAmount(e.target.value)}
                                        min="1"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={wLoading}
                                    className="w-full bg-purple-600/20 text-purple-200 border border-purple-500/30 font-bold py-3 rounded-xl hover:bg-purple-600/40 transition flex items-center justify-center gap-2"
                                >
                                    {wLoading ? 'Processing...' : <><Banknote size={20} /> Withdraw</>}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Transactions */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card p-6 min-h-[500px]">
                        <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                            <History className="text-blue-400" size={24} />
                            <h3 className="text-xl font-bold">Transaction History</h3>
                        </div>

                        <div className="space-y-4">
                            {(user.transactions && user.transactions.length > 0) ? (
                                [...user.transactions].reverse().map((tx, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition group">
                                        <div className="flex items-center gap-4">
                                            {tx.type === 'credit' ? (
                                                <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
                                                    <ArrowDownLeft size={20} />
                                                </div>
                                            ) : (
                                                <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                                                    <ArrowUpRight size={20} />
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-bold text-lg">{tx.description || tx.desc}</p>
                                                <p className="text-sm text-muted-foreground">{new Date(tx.date).toLocaleDateString()} {new Date(tx.date).toLocaleTimeString()}</p>
                                            </div>
                                        </div>
                                        <span className={`text-lg font-bold ${tx.type === 'credit' ? 'text-green-400' : 'text-purple-400'
                                            }`}>
                                            {tx.type === 'credit' ? '+' : '-'}₹{tx.amount}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20">
                                    <p className="text-gray-500">No transactions recorded yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletPage;
