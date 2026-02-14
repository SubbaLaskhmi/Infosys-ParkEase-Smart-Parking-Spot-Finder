import { useNavigate } from 'react-router-dom';
import { Filter, Car, Bike, Bus, Zap, Accessibility, Grid, Map as MapIcon, User, ArrowLeft } from 'lucide-react';

const SpotFinderHeader = ({ viewMode, setViewMode }) => {
    const navigate = useNavigate();

    return (
        <div className="absolute top-0 left-0 right-0 z-[1000] bg-[#1a1f2e] text-white px-6 py-3 flex items-center justify-between shadow-xl border-b border-white/5">
            {/* Logo Section */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        Spot Finder
                    </h1>
                    <p className="text-[10px] text-gray-400 tracking-wider uppercase">Live Updates Active</p>
                </div>
            </div>

            {/* Filters Section - Hidden on Mobile, Visible on Desktop */}
            <div className="hidden md:flex items-center gap-4 bg-[#131722] px-4 py-2 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 text-gray-400 text-sm font-medium border-r border-white/10 pr-4">
                    <Filter size={16} />
                    <span>FILTERS</span>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
                    <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                        <Car size={14} /> Car
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                        <Bike size={14} /> Bike
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                        <Bus size={14} /> SUV
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                        <Bus size={14} /> Bus
                    </button>
                </div>

                <div className="w-px h-4 bg-white/10 mx-2"></div>

                <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
                    <button className="hover:text-green-400 transition-colors">Available</button>
                    <button className="flex items-center gap-1.5 hover:text-yellow-400 transition-colors">
                        <Zap size={14} /> EV Charging
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
                        <Accessibility size={14} /> Accessible
                    </button>
                </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
                <div className="flex bg-[#131722] rounded-lg p-1 border border-white/5">
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        <Grid size={18} />
                    </button>
                    <button
                        onClick={() => setViewMode('map')}
                        className={`p-2 rounded-md transition-all ${viewMode === 'map' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        <MapIcon size={18} />
                    </button>
                </div>

                <button className="w-10 h-10 rounded-full bg-[#131722] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all">
                    <User size={18} />
                </button>
            </div>
        </div>
    );
};

export default SpotFinderHeader;
