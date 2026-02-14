export const openGoogleMapsNavigation = ({ lat, lng, name, address }) => {
    // If lat/lng available, use them for precise location
    if (lat && lng) {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
        window.open(url, "_blank");
    }
    // Fallback to searching by name/address
    else if (name || address) {
        const query = encodeURIComponent(`${name}, ${address || ''}`);
        const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
        window.open(url, "_blank");
    }
};
