import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002/api';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return { Authorization: `Bearer ${token}` };
    }
    return {};
};

const getPendingListings = async () => {
    const response = await axios.get(`${API_URL}/admin/parkings/pending`, { headers: getAuthHeader() });
    return response.data;
};

const approveListing = async (id) => {
    const response = await axios.put(`${API_URL}/admin/parkings/${id}/approve`, {}, { headers: getAuthHeader() });
    return response.data;
};

const rejectListing = async (id, reason) => {
    const response = await axios.put(`${API_URL}/admin/parkings/${id}/reject`, { reason }, { headers: getAuthHeader() });
    return response.data;
};

const getAllUsers = async () => {
    const response = await axios.get(`${API_URL}/admin/users`, { headers: getAuthHeader() });
    return response.data;
};

const getSystemStats = async () => {
    const response = await axios.get(`${API_URL}/admin/stats`, { headers: getAuthHeader() });
    return response.data;
};

const getRevenueStats = async () => {
    const response = await axios.get(`${API_URL}/admin/revenue-stats`, { headers: getAuthHeader() });
    return response.data;
};

const AdminService = {
    getPendingListings,
    approveListing,
    rejectListing,
    getAllUsers,
    getSystemStats,
    getRevenueStats
};

export default AdminService;
