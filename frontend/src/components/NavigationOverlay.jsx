import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Car, Footprints } from 'lucide-react';

const NavigationOverlay = ({ isNavigating, destination, onStopNavigation }) => {
    const [mode, setMode] = useState('car'); // 'car' or 'walk'

    return (
        <AnimatePresence>
            {isNavigating && destination && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-md px-4"
                >
                    <div className="bg-[#1a1f2e] text-white p-4 rounded-2xl shadow-2xl border border-white/10 flex items-center justify-between gap-4">

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-400 mb-0.5">Navigating to</p>
                            <h3 className="font-bold text-lg truncate">{destination.name || "Destination"}</h3>
                        </div>

                        {/* Mode Toggle */}
                        <div className="flex bg-black/20 rounded-lg p-1">
                            <button
                                onClick={() => setMode('walk')}
                                className={`p-2 rounded-md transition-colors ${mode === 'walk' ? 'bg-green-500 text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                <Footprints size={18} />
                            </button>
                            <button
                                onClick={() => setMode('car')}
                                className={`p-2 rounded-md transition-colors ${mode === 'car' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                <Car size={18} />
                            </button>
                        </div>

                        {/* Close */}
                        <button
                            onClick={onStopNavigation}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default NavigationOverlay;
