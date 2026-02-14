import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002/api';

const getAllParkings = async () => {
    const response = await axios.get(`${API_URL}/parkings`);
    return response.data;
};

const getParkingById = async (id) => {
    const response = await axios.get(`${API_URL}/parkings/${id}`);
    return response.data;
};

const getPrediction = async (id) => {
    const response = await axios.get(`${API_URL}/parkings/${id}/predict`);
    return response.data;
};

const getDynamicPrice = async (id) => {
    const response = await axios.get(`${API_URL}/parkings/${id}/price`);
    return response.data;
};

const ParkingService = {
    getAllParkings,
    getParkingById,
    getPrediction,
    getDynamicPrice
};

export default ParkingService;
