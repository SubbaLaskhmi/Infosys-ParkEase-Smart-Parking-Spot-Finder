// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
    // In a real app, this would come from AsyncStorage or SecureStore
    return global.authToken || null;
};

// Helper function to set auth token
export const setAuthToken = (token) => {
    global.authToken = token;
};

// Helper function to clear auth token
export const clearAuthToken = () => {
    global.authToken = null;
};

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
    const token = getAuthToken();

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || data.message || 'API request failed');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// Authentication APIs
export const authAPI = {
    register: (userData) => apiCall('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
    }),

    login: (credentials) => apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    }),

    verify: () => apiCall('/auth/verify'),
};

// Parking Lot APIs
export const parkingAPI = {
    getAll: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiCall(`/parking${queryString ? `?${queryString}` : ''}`);
    },

    getById: (id) => apiCall(`/parking/${id}`),

    create: (parkingData) => apiCall('/parking', {
        method: 'POST',
        body: JSON.stringify(parkingData),
    }),

    update: (id, parkingData) => apiCall(`/parking/${id}`, {
        method: 'PUT',
        body: JSON.stringify(parkingData),
    }),

    delete: (id) => apiCall(`/parking/${id}`, {
        method: 'DELETE',
    }),

    getByProvider: (providerId) => apiCall(`/parking/provider/${providerId}`),
};

// Booking APIs
export const bookingAPI = {
    create: (bookingData) => apiCall('/bookings', {
        method: 'POST',
        body: JSON.stringify(bookingData),
    }),

    getUserBookings: (userId) => apiCall(`/bookings/user/${userId}`),

    getById: (id) => apiCall(`/bookings/${id}`),

    updateStatus: (id, status) => apiCall(`/bookings/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
    }),

    checkIn: (id) => apiCall(`/bookings/${id}/checkin`, {
        method: 'POST',
    }),

    checkOut: (id) => apiCall(`/bookings/${id}/checkout`, {
        method: 'POST',
    }),
};

// User APIs
export const userAPI = {
    getProfile: (id) => apiCall(`/users/${id}`),

    updateProfile: (id, userData) => apiCall(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
    }),

    getWallet: (id) => apiCall(`/users/${id}/wallet`),

    addMoney: (id, amount, description) => apiCall(`/users/${id}/wallet/add`, {
        method: 'POST',
        body: JSON.stringify({ amount, description }),
    }),

    addVehicle: (id, vehicleData) => apiCall(`/users/${id}/vehicles`, {
        method: 'POST',
        body: JSON.stringify(vehicleData),
    }),

    removeVehicle: (id, vehicleId) => apiCall(`/users/${id}/vehicles/${vehicleId}`, {
        method: 'DELETE',
    }),

    addSavedPlace: (id, placeData) => apiCall(`/users/${id}/saved-places`, {
        method: 'POST',
        body: JSON.stringify(placeData),
    }),

    removeSavedPlace: (id, placeId) => apiCall(`/users/${id}/saved-places/${placeId}`, {
        method: 'DELETE',
    }),
};

// EV Charging APIs
export const evAPI = {
    getAllStations: () => apiCall('/ev/stations'),

    getStationsByParkingLot: (parkingLotId) => apiCall(`/ev/stations/${parkingLotId}`),

    addStation: (parkingLotId, stationData) => apiCall(`/ev/stations/${parkingLotId}`, {
        method: 'POST',
        body: JSON.stringify(stationData),
    }),

    updateStation: (parkingLotId, stationId, updateData) => apiCall(`/ev/stations/${parkingLotId}/${stationId}`, {
        method: 'PATCH',
        body: JSON.stringify(updateData),
    }),

    deleteStation: (parkingLotId, stationId) => apiCall(`/ev/stations/${parkingLotId}/${stationId}`, {
        method: 'DELETE',
    }),
};

// Admin APIs
export const adminAPI = {
    getAllUsers: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiCall(`/admin/users${queryString ? `?${queryString}` : ''}`);
    },

    getDrivers: () => apiCall('/admin/drivers'),

    getProviders: () => apiCall('/admin/providers'),

    getUserDetails: (id) => apiCall(`/admin/users/${id}`),

    suspendUser: (id) => apiCall(`/admin/users/${id}/suspend`, {
        method: 'PATCH',
    }),

    activateUser: (id) => apiCall(`/admin/users/${id}/activate`, {
        method: 'PATCH',
    }),

    deleteUser: (id) => apiCall(`/admin/users/${id}`, {
        method: 'DELETE',
    }),

    getStats: () => apiCall('/admin/stats'),
};

// Health check
export const healthCheck = () => apiCall('/health');

export default {
    auth: authAPI,
    parking: parkingAPI,
    booking: bookingAPI,
    user: userAPI,
    ev: evAPI,
    admin: adminAPI,
    healthCheck,
};
