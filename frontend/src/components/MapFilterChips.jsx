import React from 'react';
import { Car, Bike, Bus, Zap, Accessibility, Clock } from 'lucide-react';

const MapFilterChips = () => {
    return (
        <div className="absolute top-4 left-4 z-[400] flex flex-wrap gap-2 max-w-[80%]">
            <div className="bg-white rounded-lg shadow-lg p-2 flex gap-2 overflow-x-auto no-scrollbar">

                {/* Vehicle Type Group */}
                <div className="flex gap-2 border-r border-gray-200 pr-2 mr-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider self-center hidden md:block">Vehicle</span>
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-black hover:text-white transition text-xs font-medium text-gray-700">
                        <Car size={14} /> Car
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-black hover:text-white transition text-xs font-medium text-gray-700">
                        <Bike size={14} /> Bike
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-black hover:text-white transition text-xs font-medium text-gray-700">
                        <Bus size={14} /> SUV
                    </button>
                </div>

                {/* Features Group */}
                <div className="flex gap-2">
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 hover:border-green-500 hover:text-green-600 transition text-xs font-bold text-gray-600">
                        Available Only
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 hover:border-yellow-500 hover:text-yellow-600 transition text-xs font-medium text-gray-600">
                        <Zap size={14} /> EV Charging
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 hover:border-blue-500 hover:text-blue-600 transition text-xs font-medium text-gray-600">
                        <Accessibility size={14} /> Accessible
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MapFilterChips;
