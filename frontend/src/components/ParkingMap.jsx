import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';
import L from 'leaflet';

// Fix for default marker icon in React Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// Custom component to update map center
function ChangeView({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
}

const ParkingMap = ({ parkings, userLocation, height = "100%" }) => {
    // Default center (Bengaluru) if no user location
    const defaultCenter = [12.9716, 77.5946];
    const [center, setCenter] = useState(defaultCenter);

    useEffect(() => {
        if (userLocation) {
            setCenter([userLocation.lat, userLocation.lng]);
        }
    }, [userLocation]);

    return (
        <MapContainer
            center={center}
            zoom={13}
            style={{ height: height, minHeight: "500px", width: "100%", borderRadius: "1.5rem", zIndex: 0 }}
            scrollWheelZoom={true}
        >
            <ChangeView center={center} zoom={13} />

            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Parking Markers */}
            {parkings.map((parking) => (
                <Marker
                    key={parking.id}
                    position={[parking.location.lat, parking.location.lng]}
                >
                    <Popup className="custom-popup">
                        <div className="p-1">
                            <h3 className="font-bold text-gray-800 text-sm mb-1">{parking.title}</h3>
                            <p className="text-xs text-gray-500 mb-2 truncate max-w-[150px]">{parking.addressLine}</p>
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-blue-600 text-sm">₹{parking.pricing.hourlyRate}/hr</span>
                                <Link
                                    to={`/parking/${parking.id}`}
                                    className="bg-blue-600 text-white text-xs px-2 py-1 rounded hover:bg-blue-700 flex items-center gap-1"
                                >
                                    Book <Navigation size={10} />
                                </Link>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}

            {/* User Location Marker (optional) */}
            {userLocation && (
                <Marker position={[userLocation.lat, userLocation.lng]}>
                    <Popup>You are here</Popup>
                </Marker>
            )}
        </MapContainer>
    );
};

export default ParkingMap;
