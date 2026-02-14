import React, { useState } from 'react';
import { Sparkles, DollarSign, MapPin, Star, X, MessageCircle } from 'lucide-react'; // Added MessageCircle for the icon in screenshot
import { motion, AnimatePresence } from 'framer-motion';

const MagicFind = ({ onSort }) => {
    const [isOpen, setIsOpen] = useState(false);

    const options = [
        { id: 'cheapest', label: 'Cheapest', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-200' },
        { id: 'closest', label: 'Closest', icon: MapPin, color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-200' },
        { id: 'rating', label: 'Top Rated', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-200' },
    ];

    const handleSort = (type) => {
        onSort(type);
        setIsOpen(false);
    };

    return (
        <div className="fixed bottom-8 right-32 z-[500] flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        transition={{ duration: 0.15, staggerChildren: 0.05 }}
                        className="flex flex-col gap-3 mb-2"
                    >
                        {options.map((option) => (
                            <motion.button
                                key={option.id}
                                onClick={() => handleSort(option.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-4 bg-[#eef0f5] hover:bg-white text-gray-900 pr-6 pl-2 py-2 rounded-full shadow-xl border border-white/60 backdrop-blur-md transition-all group"
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${option.bg} ${option.border} border shadow-sm group-hover:shadow-md transition-all`}>
                                    <option.icon size={18} className={option.color} />
                                </div>
                                <span className="font-bold text-sm tracking-wide">{option.label}</span>
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main FAB */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`
                    w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 relative overflow-hidden z-50
                    ${isOpen ? 'bg-[#ff4757] rotate-90' : 'bg-gradient-to-tr from-[#3b82f6] to-[#8b5cf6] hover:shadow-blue-500/50'}
                `}
            >
                {/* Visual Flair */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>

                {isOpen ? (
                    <X size={28} className="text-white relative z-10" />
                ) : (
                    <MessageCircle size={28} className="text-white fill-white/20 relative z-10" />
                )}
            </motion.button>
        </div>
    );
};

export default MagicFind;
