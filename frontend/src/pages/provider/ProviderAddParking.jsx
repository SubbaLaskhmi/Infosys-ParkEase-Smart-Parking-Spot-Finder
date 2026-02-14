import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, MapPin, Clock, DollarSign, Calculator, Info } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const ProviderAddParking = () => {
    const navigate = useNavigate();
    const { token } = useAuth();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        ownershipRelation: 'SELF',
        addressLine: '',
        city: '',
        pincode: '',
        location: { lat: 0, lng: 0 },
        availableFrom: '08:00',
        availableTo: '20:00',
        dimensions: { length: 10, width: 5 }, // Default meters
        pricing: { hourlyRate: 50 },
        images: [] // Storing Base64 strings for simplicity in this demo, or URLs
    });

    const [loading, setLoading] = useState(false);
    const [calculated, setCalculated] = useState({
        totalArea: 50,
        approxTotalCars: 4,
        vehicleCapacity: {
            twoWheeler: 25,
            fourWheeler: 4,
            car4Seater: 4,
            car6Seater: 2,
            suv: 2
        }
    });

    // Auto-calculate capacities locally to show immediate feedback
    useEffect(() => {
        const { length, width } = formData.dimensions;
        const totalArea = length * width;
        const approxTotalCars = Math.max(1, Math.floor(totalArea / 12));

        setCalculated({
            totalArea,
            approxTotalCars,
            vehicleCapacity: {
                twoWheeler: Math.floor(totalArea / 2),
                fourWheeler: approxTotalCars,
                car4Seater: approxTotalCars,
                car6Seater: Math.max(1, Math.floor(approxTotalCars * 0.7)),
                suv: Math.max(1, Math.floor(approxTotalCars * 0.5)),
            }
        });
    }, [formData.dimensions]);

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

    const handleLocationChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            location: { ...prev.location, [name]: parseFloat(value) }
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, reader.result]
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                ...formData,
                vehicleCapacity: calculated.vehicleCapacity,
                approxTotalCars: calculated.approxTotalCars
            };

            await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5002/api'}/provider/listings`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/owner/dashboard');
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Error submitting listing');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            {/* Header */}
            <div className="bg-card border-b border-border p-4 sticky top-0 z-10 backdrop-blur-md bg-opacity-80">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-accent rounded-full text-muted-foreground transition">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        Add New Parking
                    </h1>
                </div>
            </div>

            <main className="max-w-4xl mx-auto p-4 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Section 1: Basic Info & Ownership */}
                    <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-3 text-lg font-semibold text-blue-400 mb-4">
                            <Info size={20} />
                            <h2>Basic Details</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-muted-foreground">Title</label>
                                <input type="text" name="title" required
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="e.g. Spacious Driveway in Downtown"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-muted-foreground">Ownership Relation</label>
                                <select name="ownershipRelation" className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:ring-2 outline-none" onChange={handleChange}>
                                    <option value="SELF">Self</option>
                                    <option value="FATHER">Father</option>
                                    <option value="MOTHER">Mother</option>
                                    <option value="WIFE">Wife</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-muted-foreground">Description</label>
                            <textarea name="description" rows="3"
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Describe access, security, landmarks..."
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    </div>

                    {/* Section 2: Location */}
                    <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-3 text-lg font-semibold text-purple-400 mb-4">
                            <MapPin size={20} />
                            <h2>Location</h2>
                        </div>
                        <div className="space-y-4">
                            <input type="text" name="addressLine" placeholder="Address Line" required className="w-full bg-black/20 border border-white/10 rounded-lg p-3 outline-none" onChange={handleChange} />
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" name="city" placeholder="City" required className="bg-black/20 border border-white/10 rounded-lg p-3 outline-none" onChange={handleChange} />
                                <input type="text" name="pincode" placeholder="Pincode" className="bg-black/20 border border-white/10 rounded-lg p-3 outline-none" onChange={handleChange} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input type="number" step="any" name="lat" placeholder="Latitude (e.g. 28.7041)" required className="bg-black/20 border border-white/10 rounded-lg p-3 outline-none" onChange={handleLocationChange} />
                                <input type="number" step="any" name="lng" placeholder="Longitude (e.g. 77.1025)" required className="bg-black/20 border border-white/10 rounded-lg p-3 outline-none" onChange={handleLocationChange} />
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Dimensions & Capacity (The Magic Part) */}
                    <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-3 text-lg font-semibold text-green-400 mb-4">
                            <Calculator size={20} />
                            <h2>Dimensions & Capacity</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 items-start">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="flex justify-between text-sm">
                                        <span>Length (meters)</span>
                                        <span className="text-blue-400">{formData.dimensions.length}m</span>
                                    </label>
                                    <input type="range" name="dimensions.length" min="2" max="50" value={formData.dimensions.length}
                                        onChange={handleChange} className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                                </div>
                                <div className="space-y-2">
                                    <label className="flex justify-between text-sm">
                                        <span>Width (meters)</span>
                                        <span className="text-purple-400">{formData.dimensions.width}m</span>
                                    </label>
                                    <input type="range" name="dimensions.width" min="2" max="50" value={formData.dimensions.width}
                                        onChange={handleChange} className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl text-center">
                                    <p className="text-sm text-muted-foreground">Total Area</p>
                                    <p className="text-2xl font-bold">{calculated.totalArea} <span className="text-sm font-normal text-muted-foreground">sq.m</span></p>
                                </div>
                            </div>

                            {/* Capacity Visualizer */}
                            <div className="bg-black/30 rounded-xl p-4 space-y-3">
                                <h3 className="text-sm font-medium text-muted-foreground mb-2">Estimated Capacity</h3>
                                <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
                                    <span>🏍️ Two Wheelers</span>
                                    <span className="font-bold text-green-400">{calculated.vehicleCapacity.twoWheeler}</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
                                    <span>🚗 Compact Cars</span>
                                    <span className="font-bold text-blue-400">{calculated.vehicleCapacity.car4Seater}</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
                                    <span>🚙 SUVs</span>
                                    <span className="font-bold text-purple-400">{calculated.vehicleCapacity.suv}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Availability & Pricing */}
                    <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-3 text-lg font-semibold text-yellow-400 mb-4">
                            <Clock size={20} />
                            <h2>Availability & Pricing</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-muted-foreground">Available From</label>
                                <input type="time" name="availableFrom" value={formData.availableFrom} onChange={handleChange}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-muted-foreground">Available To</label>
                                <input type="time" name="availableTo" value={formData.availableTo} onChange={handleChange}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 outline-none" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-muted-foreground flex items-center gap-2">
                                <DollarSign size={14} /> Hourly Rate (₹)
                            </label>
                            <input type="number" name="pricing.hourlyRate" value={formData.pricing.hourlyRate} onChange={handleChange}
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-xl font-bold text-green-400 outline-none" />
                        </div>
                    </div>

                    {/* Section 5: Images */}
                    <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-3 text-lg font-semibold text-pink-400 mb-4">
                            <Upload size={20} />
                            <h2>Photos</h2>
                        </div>
                        <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer hover:bg-white/5 transition relative">
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                <Upload size={32} />
                                <p>Click to upload spot image</p>
                            </div>
                        </div>
                        {formData.images.length > 0 && (
                            <div className="grid grid-cols-4 gap-4 mt-4">
                                {formData.images.map((img, idx) => (
                                    <img key={idx} src={img} alt="Preview" className="h-20 w-full object-cover rounded-lg border border-white/10" />
                                ))}
                            </div>
                        )}
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl text-lg transition transform hover:scale-[1.01] shadow-xl">
                        {loading ? 'Submitting...' : 'Submit for Approval'}
                    </button>

                </form>
            </main>
        </div>
    );
};

export default ProviderAddParking;
