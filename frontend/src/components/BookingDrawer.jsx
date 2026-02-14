import React from 'react';
import { X, Zap, Shield, Navigation, Clock, CreditCard, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BookingDrawer = ({ isOpen, onClose, spot, onConfirm }) => {
    return (
        <AnimatePresence>
            {isOpen && spot && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed bottom-0 left-0 right-0 z-[1200] bg-[#0f1219] text-white rounded-t-3xl border-t border-white/10 shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto"
                    >
                        {/* Drag Handle */}
                        <div className="flex justify-center pt-3 pb-1" onClick={onClose}>
                            <div className="w-12 h-1.5 bg-white/20 rounded-full cursor-pointer hover:bg-white/40 transition-colors" />
                        </div>

                        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-7xl mx-auto">

                            {/* Left Col: Details */}
                            <div className="space-y-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-3xl font-bold mb-2">{spot.name || "Spot Details"}</h2>
                                        <div className="flex items-center gap-3 text-sm">
                                            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded font-bold uppercase text-xs tracking-wider border border-green-500/30">
                                                Available
                                            </span>
                                            <span className="text-gray-400">• Level 1</span>
                                            <span className="text-gray-400">• EV</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                                    >
                                        <X size={20} className="text-gray-400" />
                                    </button>
                                </div>

                                <div className="bg-[#1a1f2e] rounded-2xl p-6 border border-white/5 space-y-4">
                                    <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                        <span className="text-gray-400">Hourly Rate</span>
                                        <span className="text-2xl font-bold">${spot.pricing?.hourlyRate || 25}<span className="text-sm font-normal text-gray-400">/hr</span></span>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-gray-300">
                                            <Zap size={18} className="text-yellow-400" />
                                            <span>EV Charging Available</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-300">
                                            <Shield size={18} className="text-blue-400" />
                                            <span>24/7 Security Coverage</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-300">
                                            <Navigation size={18} className="text-purple-400" />
                                            <span>Near Entrance A</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Col: Booking Action */}
                            <div className="bg-[#1a1f2e] rounded-3xl p-6 md:p-8 border border-blue-500/20 shadow-lg shadow-blue-500/5 relative overflow-hidden">
                                {/* Gradient Blob */}
                                <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full pointer-events-none" />

                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold mb-1">Ready to park?</h3>
                                    <p className="text-gray-400 text-sm mb-6">
                                        Reserve this spot now to guarantee your parking space. You have 15 minutes to arrive after booking.
                                    </p>

                                    <div className="flex items-center gap-6 mb-8 text-xs text-gray-400 font-medium">
                                        <div className="flex items-center gap-1.5">
                                            <Clock size={14} /> Instant Booking
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <CreditCard size={14} /> Secure Payment
                                        </div>
                                    </div>

                                    <button
                                        onClick={onConfirm}
                                        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 group"
                                    >
                                        Confirm Booking
                                        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default BookingDrawer;
