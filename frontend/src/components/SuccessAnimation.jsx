import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const SuccessAnimation = ({ isVisible, onClose, message = "Booking Confirmed!" }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-md"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="bg-[#1a1f2e] p-8 rounded-3xl border border-green-500/20 shadow-2xl shadow-green-500/10 text-center relative overflow-hidden max-w-sm w-full mx-4"
                    >
                        {/* Background Glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-green-500/20 blur-[50px] rounded-full pointer-events-none" />

                        {/* Animated Checkmark Circle */}
                        <div className="relative z-10 mx-auto w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                                className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/40"
                            >
                                <motion.div
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                    <Check size={32} className="text-white stroke-[3]" />
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Text */}
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-2xl font-bold text-white mb-2"
                        >
                            {message}
                        </motion.h2>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-gray-400 text-sm mb-6"
                        >
                            You have 15 minutes to arrive. Drive safely!
                        </motion.p>

                        <motion.button
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            onClick={onClose}
                            className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors"
                        >
                            Awesome
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SuccessAnimation;
