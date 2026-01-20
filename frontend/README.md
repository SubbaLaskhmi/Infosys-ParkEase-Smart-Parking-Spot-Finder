# ParkEase Frontend

React Native (Expo) frontend application for ParkEase Smart Parking Spot Finder.

## Features

- 🚗 **Driver Panel** - Find and book parking spots
- 🏢 **Provider Panel** - Manage parking locations and EV stations
- 👨‍💼 **Admin Panel** - System administration and user management

## Tech Stack

- React Native (Expo)
- React Navigation
- Expo Vector Icons
- React Native Maps
- Axios (API client)
- AsyncStorage (Token persistence)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI

## Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

## Running the App

### Web
```bash
npm run web
```

### Android
```bash
npm run android
```

### iOS
```bash
npm run ios
```

### Mobile Device
1. Install Expo Go app
2. Scan the QR code from the terminal

## Configuration

Update the API base URL in `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:5000/api'; // For local development
// or
const API_BASE_URL = 'http://YOUR_IP:5000/api'; // For mobile testing
```

## Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable components
│   ├── screens/         # Screen components
│   ├── navigation/      # Navigation configuration
│   ├── services/        # API service layer
│   ├── constants/       # Constants (colors, etc.)
│   └── utils/           # Utility functions
├── App.js              # Main app component
├── index.js            # Entry point
└── package.json        # Dependencies
```

## Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser

## API Integration

The app uses a service layer (`src/services/api.js`) to communicate with the backend API.

Example usage:
```javascript
import { authAPI, setAuthToken } from '../services/api';

const handleLogin = async () => {
    const response = await authAPI.login({ email, password, role });
    setAuthToken(response.token);
};
```

## Environment Setup

For mobile testing, ensure:
1. Backend server is running
2. Both devices are on the same network
3. API_BASE_URL uses your computer's IP address

## Documentation

- See main project README for complete documentation
- Check INTEGRATION_GUIDE.md for API integration examples
- Review QUICK_START.md for setup instructions

## License

ISC
