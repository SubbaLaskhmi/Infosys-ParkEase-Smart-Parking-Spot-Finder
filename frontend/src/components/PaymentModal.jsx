import React, { useState } from 'react';
import { X, CreditCard, Calendar, Lock, CheckCircle, Loader } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, amount, onConfirm }) => {
    const [step, setStep] = useState('input'); // input, processing, success
    const [cardDetails, setCardDetails] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: ''
    });

    // Reset state when closing
    const handleClose = () => {
        setStep('input');
        setCardDetails({ number: '', expiry: '', cvc: '', name: '' });
        onClose();
    };

    const handleProcess = async (e) => {
        e.preventDefault();
        setStep('processing');

        try {
            // Trigger actual booking and wait for it
            await onConfirm();

            // Only show success if booking succeeded
            setStep('success');

            // Close after showing success message
            setTimeout(() => {
                handleClose();
            }, 2000);
        } catch (error) {
            // If booking failed (e.g. no slots), close immediately
            console.error("Payment processing failed:", error);
            handleClose();
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1300] flex items-center justify-center p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-[#1a1f2e] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center p-6 border-b border-white/5 bg-white/5">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <CreditCard className="text-blue-400" />
                            Secure Payment
                        </h3>
                        <button onClick={onClose} disabled={step !== 'input'} className="text-gray-400 hover:text-white disabled:opacity-50">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-6">
                        {step === 'input' && (
                            <form onSubmit={handleProcess} className="space-y-4">
                                <div className="text-center mb-6">
                                    <p className="text-gray-400 text-sm">Total Amount to Pay</p>
                                    <div className="text-3xl font-bold text-white">₹{amount}</div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Card Number</label>
                                    <input
                                        type="text"
                                        placeholder="0000 0000 0000 0000"
                                        maxLength="19"
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none font-mono"
                                        required
                                        value={cardDetails.number}
                                        onChange={e => setCardDetails({ ...cardDetails, number: e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim() })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Expiry</label>
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            maxLength="5"
                                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none font-mono"
                                            required
                                            value={cardDetails.expiry}
                                            onChange={e => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">CVC</label>
                                        <input
                                            type="password"
                                            placeholder="123"
                                            maxLength="3"
                                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none font-mono"
                                            required
                                            value={cardDetails.cvc}
                                            onChange={e => setCardDetails({ ...cardDetails, cvc: e.target.value.replace(/\D/g, '') })}
                                        />
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2">
                                        <Lock size={16} /> Pay ₹{amount}
                                    </button>
                                </div>

                                <div className="flex justify-center items-center gap-4 mt-4 text-gray-500 text-xs">
                                    <span className="flex items-center gap-1"><Lock size={10} /> 256-bit SSL Encrypted</span>
                                </div>
                            </form>
                        )}

                        {step === 'processing' && (
                            <div className="flex flex-col items-center justify-center py-10 space-y-4">
                                <Loader size={48} className="text-blue-500 animate-spin" />
                                <p className="text-gray-300 font-medium">Processing Transaction...</p>
                                <p className="text-xs text-gray-500">Please do not close this window</p>
                            </div>
                        )}

                        {step === 'success' && (
                            <div className="flex flex-col items-center justify-center py-10 space-y-4">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-green-500"
                                >
                                    <CheckCircle size={32} />
                                </motion.div>
                                <p className="text-xl font-bold text-white">Payment Successful!</p>
                                <p className="text-gray-400">Redirecting to your ticket...</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PaymentModal;
