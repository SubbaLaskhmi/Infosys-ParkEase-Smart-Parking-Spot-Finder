import React, { useState } from 'react';
import { Heart, MapPin, Navigation, Star, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Favorites = () => {
    // Use Real Data from AuthContext
    const { user, setUser, token } = useAuth();
    const [loading, setLoading] = useState(true);

    // Favorites are already populated in user object by getMe
    const favorites = user?.favorites || [];

    const removeFavorite = async (id) => {
        try {
            const { data } = await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5002/api'}/auth/favorite/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Update local user state
            const updatedUser = { ...user, favorites: data };
            setUser(updatedUser);
            localStorage.setItem('userInfo', JSON.stringify(updatedUser));
        } catch (error) {
            console.error("Failed to remove favorite", error);
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-8 pb-24">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-red-500/10 rounded-full">
                    <Heart className="text-red-500" size={24} fill="currentColor" />
                </div>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-pink-400">
                    My Favorites
                </h2>
            </div>

            {favorites.length === 0 ? (
                <div className="glass-card p-12 text-center flex flex-col items-center">
                    <Heart size={48} className="text-muted-foreground mb-4 opacity-50" />
                    <h3 className="text-xl font-bold mb-2">No favorites yet</h3>
                    <p className="text-muted-foreground mb-6">Save your favorite parking spots for quick access.</p>
                    <Link to="/find" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg transition">
                        Explore Parking
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((spot) => (
                        <div key={spot.id} className="glass-card group hover:border-red-500/30 transition relative overflow-hidden">
                            <div className="h-32 bg-gray-800 relative">
                                <img src={spot.images?.[0] || 'https://via.placeholder.com/400x200'} alt={spot.title} className="w-full h-full object-cover" />
                                <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/60 to-transparent"></div>
                                <button
                                    onClick={() => removeFavorite(spot.id)}
                                    className="absolute top-3 right-3 p-2 bg-black/40 hover:bg-red-500/20 rounded-full transition text-white/70 hover:text-red-400 backdrop-blur-sm"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg leading-tight text-white">{spot.title}</h3>
                                    {spot.rating && (
                                        <div className="flex items-center gap-1 text-yellow-400 text-xs font-bold bg-yellow-400/10 px-2 py-1 rounded">
                                            <Star size={12} fill="currentColor" /> {spot.rating}
                                        </div>
                                    )}
                                </div>

                                <p className="text-sm text-gray-400 flex items-center gap-1 mb-4 truncate">
                                    <MapPin size={14} /> {spot.addressLine}, {spot.city}
                                </p>

                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                                    <span className="text-green-400 font-bold">₹{spot.pricing?.hourlyRate}/hr</span>
                                    <Link
                                        to={`/parking/${spot.id}`}
                                        className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2"
                                    >
                                        Book Now <Navigation size={14} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
