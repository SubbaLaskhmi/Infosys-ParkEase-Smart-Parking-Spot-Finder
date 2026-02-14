import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Upload, MapPin, Trash } from 'lucide-react';

import { useAuth } from '../context/AuthContext';

const AddParking = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        latitude: '',
        longitude: '',
        ownership: 'SELF',
        timings: { from: '08:00', to: '22:00' },
        hourlyRate: '',
        dimensions: { width: '', length: '', totalArea: '' },
        images: []
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState('');

    // Fetch existing data if in Edit mode
    useEffect(() => {
        if (id && token) {
            const fetchListing = async () => {
                setFetching(true);
                try {
                    const res = await axios.get(
                        `${import.meta.env.VITE_API_URL || 'http://localhost:5002/api'}/provider/listings/${id}`,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    const spot = res.data.parking || res.data;
                    setFormData({
                        name: spot.title,
                        address: spot.addressLine,
                        city: spot.city,
                        latitude: spot.location?.lat?.toString() || '',
                        longitude: spot.location?.lng?.toString() || '',
                        ownership: spot.ownershipRelation || 'SELF',
                        timings: { from: spot.availableFrom || '08:00', to: spot.availableTo || '22:00' },
                        hourlyRate: spot.pricing?.hourlyRate?.toString() || '',
                        dimensions: {
                            width: spot.dimensions?.width?.toString() || '',
                            length: spot.dimensions?.length?.toString() || '',
                            totalArea: spot.dimensions?.totalArea?.toString() || ''
                        },
                        images: spot.images || []
                    });
                } catch (err) {
                    console.error("Fetch error:", err);
                    setError("Failed to load parking details");
                } finally {
                    setFetching(false);
                }
            };
            fetchListing();
        }
    }, [id, token]);

    // Image Upload Handling
    const [imageUrl, setImageUrl] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleAddImage = () => {
        if (imageUrl) {
            setFormData(prev => ({ ...prev, images: [...prev.images, imageUrl] }));
            setImageUrl('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const payload = {
                title: formData.name,
                description: "Parking space at " + formData.address,
                addressLine: formData.address,
                city: formData.city,
                location: {
                    lat: parseFloat(formData.latitude),
                    lng: parseFloat(formData.longitude)
                },
                pricing: {
                    hourlyRate: parseFloat(formData.hourlyRate)
                },
                availableFrom: formData.timings.from,
                availableTo: formData.timings.to,
                dimensions: {
                    width: parseFloat(formData.dimensions.width || 0),
                    length: parseFloat(formData.dimensions.length || 0),
                    totalArea: parseFloat(formData.dimensions.totalArea || 0)
                },
                images: formData.images,
                ownershipRelation: formData.ownership
            };

            const url = id
                ? `${import.meta.env.VITE_API_URL || 'http://localhost:5002/api'}/provider/listings/${id}`
                : `${import.meta.env.VITE_API_URL || 'http://localhost:5002/api'}/provider/listings`;

            const method = id ? 'put' : 'post';

            await axios[method](
                url,
                payload,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            navigate('/owner/parkings');
        } catch (err) {
            setError(err.response?.data?.message || `Failed to ${id ? 'update' : 'create'} parking`);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="p-20 text-center text-white">Loading parking details...</div>;

    return (
        <div className="p-6 md:p-8 max-w-4xl mx-auto">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </button>

            <div className="glass-card p-8 rounded-2xl">
                <h1 className="text-2xl font-bold mb-6">{id ? 'Edit' : 'Add New'} Parking</h1>

                {error && <div className="bg-red-500/20 text-red-400 p-4 rounded-xl mb-6">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Parking Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2" required placeholder="e.g. Downtown Secure Spot" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">City</label>
                            <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2" required placeholder="e.g. Mumbai" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">Full Address</label>
                            <textarea name="address" value={formData.address} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2" required rows="2" placeholder="Street address, landmark" />
                        </div>
                    </div>

                    <hr className="border-white/5" />

                    {/* Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Latitude</label>
                            <input type="number" step="any" name="latitude" value={formData.latitude} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2" required placeholder="e.g. 19.0760" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Longitude</label>
                            <input type="number" step="any" name="longitude" value={formData.longitude} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2" required placeholder="e.g. 72.8777" />
                        </div>
                        <div className="md:col-span-2 text-xs text-gray-400">
                            * You can copy these from Google Maps (Right click &gt; First option)
                        </div>
                    </div>

                    <hr className="border-white/5" />

                    {/* Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Hourly Rate (₹)</label>
                            <input type="number" name="hourlyRate" value={formData.hourlyRate} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2" required placeholder="e.g. 50" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Ownership</label>
                            <select name="ownership" value={formData.ownership} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white">
                                <option value="SELF">Self Owned</option>
                                <option value="FATHER">Father's Property</option>
                                <option value="WIFE">Wife's Property</option>
                                <option value="OTHER">Other Relative</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Total Area (sq ft/m)</label>
                            <input type="number" name="dimensions.totalArea" value={formData.dimensions.totalArea} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2" placeholder="e.g. 200" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Timing From</label>
                            <input type="time" name="timings.from" value={formData.timings.from} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 appearance-none text-white" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Timing To</label>
                            <input type="time" name="timings.to" value={formData.timings.to} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 appearance-none text-white" required />
                        </div>
                    </div>

                    <hr className="border-white/5" />

                    {/* Images */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Images (URL)</label>
                        <div className="flex gap-2">
                            <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="flex-1 bg-black/20 border border-white/10 rounded-lg px-4 py-2" placeholder="Paste image URL here..." />
                            <button type="button" onClick={handleAddImage} className="bg-blue-600 hover:bg-blue-700 px-4 rounded-lg text-white">Add</button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {formData.images.map((img, idx) => (
                                <div key={idx} className="relative group w-24 h-24 rounded-lg overflow-hidden border border-white/10">
                                    <img src={img} alt="preview" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => setFormData(p => ({ ...p, images: p.images.filter((_, i) => i !== idx) }))}
                                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-red-400 transition-opacity"
                                    >
                                        <Trash className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all transform hover:scale-[1.01]">
                        {loading ? `${id ? 'Updating' : 'Creating'} Listing...` : `${id ? 'Update' : 'Submit'} Listing`}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddParking;
