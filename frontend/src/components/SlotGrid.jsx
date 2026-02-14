import React, { useState } from 'react';
import { Check, Video, Monitor, X, Accessibility } from 'lucide-react';

const SlotGrid = ({ onSelectSlot }) => {
    // Current Parking Slot Status
    const [slots] = useState([
        { id: 'A1', type: 'standard', status: 'available', icon: null },
        { id: 'A2', type: 'standard', status: 'occupied', icon: null },
        { id: 'A3', type: 'camera', status: 'available', icon: 'camera' },
        { id: 'A4', type: 'accessible', status: 'available', icon: 'accessibility' },
        { id: 'B1', type: 'standard', status: 'available', icon: null },
        { id: 'B2', type: 'standard', status: 'available', icon: null },
        { id: 'B3', type: 'standard', status: 'available', icon: null },
        { id: 'B4', type: 'standard', status: 'occupied', icon: null },
    ]);

    const [selectedSlot, setSelectedSlot] = useState(null);

    const handleSlotClick = (slot) => {
        if (slot.status === 'occupied') return;
        setSelectedSlot(slot.id);
        if (onSelectSlot) onSelectSlot(slot);
    };

    return (
        <div className="glass-card p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Select a Spot</h3>
                <div className="flex gap-4 text-xs">
                    <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500"></div> Available</div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500"></div> Occupied</div>
                    <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-blue-500 border border-white"></div> Selected</div>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {slots.map((slot) => {
                    const isSelected = selectedSlot === slot.id;
                    const isOccupied = slot.status === 'occupied';

                    return (
                        <div
                            key={slot.id}
                            onClick={() => handleSlotClick(slot)}
                            className={`
                                relative h-32 rounded-xl border transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group
                                ${isOccupied
                                    ? 'bg-red-900/10 border-red-500/20 opacity-60 cursor-not-allowed'
                                    : isSelected
                                        ? 'bg-blue-600 border-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.5)] scale-105 z-10'
                                        : 'bg-emerald-900/10 border-emerald-500/20 hover:bg-emerald-900/20 hover:border-emerald-500/50'
                                }
                            `}
                        >
                            {/* Status Dot */}
                            <div className={`absolute top-3 right-3 w-2 h-2 rounded-full ${isOccupied ? 'bg-red-500' : isSelected ? 'bg-white' : 'bg-emerald-500'}`}></div>

                            {/* Icon */}
                            {slot.icon === 'camera' && <Video size={20} className={isSelected ? 'text-white' : 'text-emerald-400'} />}
                            {slot.icon === 'accessibility' && <Accessibility size={20} className={isSelected ? 'text-white' : 'text-blue-400'} />}

                            {/* Slot ID */}
                            <span className={`text-2xl font-bold ${isSelected ? 'text-white' : isOccupied ? 'text-red-400' : 'text-emerald-400'}`}>
                                {slot.id}
                            </span>

                            {/* Label */}
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${isSelected ? 'text-blue-200' : 'text-muted-foreground'}`}>
                                {isOccupied ? 'OCCUPIED' : 'AVAILABLE'}
                            </span>

                            {/* Selection Check */}
                            {isSelected && (
                                <div className="absolute -bottom-3 bg-white text-blue-600 rounded-full p-1 shadow-lg">
                                    <Check size={14} strokeWidth={4} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            {selectedSlot && (
                <div className="mt-4 text-center p-2 bg-blue-600/20 border border-blue-500/30 rounded-lg text-blue-200 text-sm animate-pulse">
                    Selected Slot: <span className="font-bold text-white">{selectedSlot}</span>
                </div>
            )}
        </div>
    );
};

export default SlotGrid;
