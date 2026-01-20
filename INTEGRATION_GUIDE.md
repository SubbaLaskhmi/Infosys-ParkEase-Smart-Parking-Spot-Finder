# Frontend-Backend Integration Guide

This guide explains how to connect the ParkEase frontend (React Native) with the backend API.

## Overview

The frontend and backend are now connected through a comprehensive API service layer located at `src/services/api.js`.

## Setup Instructions

### 1. Backend Setup

1. **Install MongoDB** (if not already installed):
   - Download from https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

2. **Start MongoDB**:
   ```bash
   # Windows
   mongod
   
   # Or if using MongoDB service
   net start MongoDB
   ```

3. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```

4. **Configure Environment**:
   - The `.env` file is already created
   - Update `MONGODB_URI` if using a different MongoDB instance
   - Change `JWT_SECRET` for production

5. **Start Backend Server**:
   ```bash
   # Development mode (auto-restart on changes)
   npm run dev
   
   # Or production mode
   npm start
   ```

   The server will run on `http://localhost:5000`

### 2. Frontend Setup

1. **Install axios** (for better HTTP requests):
   ```bash
   cd ..
   npm install axios @react-native-async-storage/async-storage
   ```

2. **Update API Configuration**:
   - Open `src/services/api.js`
   - Change `API_BASE_URL` if your backend runs on a different URL
   - For mobile testing, use your computer's IP address instead of localhost

3. **Test the Connection**:
   ```bash
   npm start
   ```

## API Integration Examples

### 1. User Authentication

#### Login Example:
```javascript
import { authAPI, setAuthToken } from '../services/api';

const handleLogin = async () => {
    try {
        const response = await authAPI.login({
            email: 'user@example.com',
            password: 'password123',
            role: 'driver' // or 'provider', 'admin'
        });
        
        // Save token
        setAuthToken(response.token);
        
        // Save user data
        console.log('User:', response.user);
        
        // Navigate to dashboard
        navigation.navigate('DriverDashboard');
    } catch (error) {
        console.error('Login failed:', error.message);
    }
};
```

#### Register Example:
```javascript
const handleRegister = async () => {
    try {
        const response = await authAPI.register({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
            phone: '+91 9876543210',
            role: 'driver'
        });
        
        setAuthToken(response.token);
        console.log('Registration successful:', response.user);
    } catch (error) {
        console.error('Registration failed:', error.message);
    }
};
```

### 2. Fetching Parking Lots

```javascript
import { parkingAPI } from '../services/api';

const fetchNearbyParking = async () => {
    try {
        const response = await parkingAPI.getAll({
            latitude: 37.78825,
            longitude: -122.4324,
            radius: 5, // 5km radius
            status: 'available'
        });
        
        console.log('Parking lots:', response.parkingLots);
        setParkingSpots(response.parkingLots);
    } catch (error) {
        console.error('Failed to fetch parking:', error.message);
    }
};
```

### 3. Creating a Booking

```javascript
import { bookingAPI } from '../services/api';

const createBooking = async () => {
    try {
        const response = await bookingAPI.create({
            parkingLotId: '507f1f77bcf86cd799439011',
            vehicle: {
                type: 'car',
                plateNumber: 'ABC-1234',
                model: 'Tesla Model 3'
            },
            slotNumber: 'A-12',
            startTime: new Date(),
            endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
            totalAmount: 100
        });
        
        console.log('Booking created:', response.booking);
        console.log('QR Code:', response.booking.qrCode);
    } catch (error) {
        console.error('Booking failed:', error.message);
    }
};
```

### 4. Wallet Operations

```javascript
import { userAPI } from '../services/api';

const addMoneyToWallet = async (userId) => {
    try {
        const response = await userAPI.addMoney(
            userId,
            500, // amount
            'Wallet top-up via UPI'
        );
        
        console.log('New balance:', response.wallet.balance);
    } catch (error) {
        console.error('Failed to add money:', error.message);
    }
};
```

### 5. EV Charging Management

```javascript
import { evAPI } from '../services/api';

const fetchEVStations = async () => {
    try {
        const response = await evAPI.getAllStations();
        console.log('EV Stations:', response.evStations);
    } catch (error) {
        console.error('Failed to fetch EV stations:', error.message);
    }
};

const addEVStation = async (parkingLotId) => {
    try {
        const response = await evAPI.addStation(parkingLotId, {
            id: 'EV-05',
            vehicleType: 'car'
        });
        
        console.log('Station added:', response.stations);
    } catch (error) {
        console.error('Failed to add station:', error.message);
    }
};
```

### 6. Admin Operations

```javascript
import { adminAPI } from '../services/api';

const fetchDashboardStats = async () => {
    try {
        const stats = await adminAPI.getStats();
        console.log('Dashboard stats:', stats);
    } catch (error) {
        console.error('Failed to fetch stats:', error.message);
    }
};

const suspendUser = async (userId) => {
    try {
        const response = await adminAPI.suspendUser(userId);
        console.log('User suspended:', response.message);
    } catch (error) {
        console.error('Failed to suspend user:', error.message);
    }
};
```

## Token Management

### Storing Tokens (Recommended for Production)

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Save token
const saveToken = async (token) => {
    try {
        await AsyncStorage.setItem('authToken', token);
    } catch (error) {
        console.error('Failed to save token:', error);
    }
};

// Retrieve token
const getToken = async () => {
    try {
        return await AsyncStorage.getItem('authToken');
    } catch (error) {
        console.error('Failed to get token:', error);
        return null;
    }
};

// Remove token (logout)
const removeToken = async () => {
    try {
        await AsyncStorage.removeItem('authToken');
    } catch (error) {
        console.error('Failed to remove token:', error);
    }
};
```

## Error Handling

All API calls should be wrapped in try-catch blocks:

```javascript
try {
    const response = await someAPI.method();
    // Handle success
} catch (error) {
    if (error.message.includes('401') || error.message.includes('token')) {
        // Token expired or invalid - redirect to login
        navigation.navigate('Login');
    } else if (error.message.includes('Network')) {
        // Network error
        Alert.alert('Network Error', 'Please check your internet connection');
    } else {
        // Other errors
        Alert.alert('Error', error.message);
    }
}
```

## Testing the Integration

### 1. Health Check

```javascript
import { healthCheck } from '../services/api';

const testConnection = async () => {
    try {
        const response = await healthCheck();
        console.log('API Status:', response.status);
        console.log('Message:', response.message);
    } catch (error) {
        console.error('API not reachable:', error.message);
    }
};
```

### 2. Create Test Data

You can use the backend API to create test users and parking lots:

```bash
# Using curl or Postman
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test Driver",
  "email": "driver@test.com",
  "password": "test123",
  "role": "driver"
}
```

## Mobile Testing

When testing on a physical device or emulator:

1. **Find your computer's IP address**:
   ```bash
   # Windows
   ipconfig
   
   # Look for IPv4 Address
   ```

2. **Update API_BASE_URL** in `src/services/api.js`:
   ```javascript
   const API_BASE_URL = 'http://192.168.1.100:5000/api'; // Use your IP
   ```

3. **Ensure backend is accessible**:
   - Make sure your firewall allows connections on port 5000
   - Both devices should be on the same network

## Common Issues and Solutions

### Issue: "Network request failed"
- **Solution**: Check if backend server is running
- Verify API_BASE_URL is correct
- For mobile, use IP address instead of localhost

### Issue: "401 Unauthorized"
- **Solution**: Token expired or invalid
- Re-login to get a new token
- Check if token is being sent in headers

### Issue: "MongoDB connection error"
- **Solution**: Ensure MongoDB is running
- Check MONGODB_URI in .env file
- Verify MongoDB service is started

### Issue: "CORS error" (web only)
- **Solution**: Backend already has CORS enabled
- If still occurring, check browser console for details

## Next Steps

1. **Replace mock data** in screens with API calls
2. **Implement AsyncStorage** for token persistence
3. **Add loading states** during API calls
4. **Implement error boundaries** for better error handling
5. **Add offline support** with local caching
6. **Implement real-time updates** using WebSockets (future enhancement)

## API Documentation

For complete API documentation, see `backend/README.md`

## Support

For issues or questions:
1. Check the error message in console
2. Verify backend logs
3. Test API endpoints using Postman or curl
4. Review this integration guide
