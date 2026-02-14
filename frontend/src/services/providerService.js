import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002/api';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return { Authorization: `Bearer ${token}` };
    }
    return {};
};

const getDashboardStats = async () => {
    const response = await axios.get(`${API_URL}/provider/stats`, { headers: getAuthHeader() });
    return response.data;
};

const getMyListings = async () => {
    const response = await axios.get(`${API_URL}/provider/listings`, { headers: getAuthHeader() });
    return response.data;
};

const getProviderBookings = async () => {
    const response = await axios.get(`${API_URL}/bookings/provider`, { headers: getAuthHeader() });
    return response.data;
};

const createListing = async (listingData) => {
    const response = await axios.post(`${API_URL}/provider/listings`, listingData, { headers: getAuthHeader() });
    return response.data;
};

const ProviderService = {
    getDashboardStats,
    getMyListings,
    getProviderBookings,
    createListing
};

export default ProviderService;
