# ParkEase - Smart Parking Spot Finder

A comprehensive smart parking solution with separate panels for Drivers, Parking Providers, and Administrators. Built with React Native (Expo) for the frontend and Node.js/Express/MongoDB for the backend.

## 🚀 Features

### Driver Panel
- 🗺️ Interactive map view with parking spot markers
- 🔍 Search and filter parking locations
- ⚡ Real-time EV charging station status
- 💳 Integrated wallet system
- 📱 QR code-based check-in/check-out
- 📍 Saved places functionality
- 📊 Booking history and management
- 🚗 Vehicle management

### Provider Panel
- 📍 Manage multiple parking locations
- 🔌 EV charging station management
- 💰 Earnings and revenue tracking
- 📊 Real-time slot availability
- 🔔 Booking notifications
- ⚙️ Business settings and verification
- 📈 Performance analytics

### Admin Panel
- 👥 User management (Drivers & Providers)
- 📊 Dashboard with statistics
- 🔍 Detailed user and provider information
- ⚠️ Suspend/activate accounts
- 📈 System-wide analytics
- 🚗 Vehicle and EV station oversight

## 📁 Project Structure

```
ParkEase/
├── frontend/                  # React Native (Expo) application
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── screens/          # Screen components
│   │   ├── navigation/       # Navigation configuration
│   │   ├── services/         # API service layer
│   │   ├── constants/        # Constants (colors, etc.)
│   │   └── utils/            # Utility functions
│   ├── App.js               # Main app component
│   ├── index.js             # Entry point
│   ├── package.json         # Frontend dependencies
│   └── README.md            # Frontend documentation
│
├── backend/                  # Node.js/Express API
│   ├── models/              # Database models
│   │   ├── User.js
│   │   ├── ParkingLot.js
│   │   └── Booking.js
│   ├── routes/              # API routes
│   │   ├── auth.js
│   │   ├── parking.js
│   │   ├── booking.js
│   │   ├── user.js
│   │   ├── ev.js
│   │   └── admin.js
│   ├── middleware/          # Authentication middleware
│   │   └── auth.js
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   ├── .env                # Environment variables
│   └── README.md           # Backend documentation
│
├── ARCHITECTURE.md          # System architecture
├── INTEGRATION_GUIDE.md     # Integration instructions
├── INTEGRATION_SUMMARY.md   # Feature summary
├── QUICK_START.md          # Quick setup guide
├── start.bat               # Windows startup script
└── README.md               # This file
```

## 🛠️ Tech Stack

### Frontend
- **React Native** (Expo)
- **React Navigation** - Navigation
- **React Native Maps** - Map integration
- **Expo Linear Gradient** - UI enhancements
- **Expo Vector Icons** - Icons
- **axios** - HTTP client
- **AsyncStorage** - Token persistence

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (v4.4 or higher)
- Expo CLI (for mobile development)

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/SubbaLaskhmi/Infosys-ParkEase-Smart-Parking-Spot-Finder.git
cd Infosys-ParkEase-Smart-Parking-Spot-Finder
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### 4. Configure Environment Variables

The `.env` file in the `backend` directory is already configured. Update if needed:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/parkease
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

## 🚀 Running the Application

### Quick Start (Windows)

```bash
# Double-click or run:
start.bat
```

This will automatically:
1. Start MongoDB
2. Start the backend server
3. Start the frontend application

### Manual Start

**Terminal 1 - MongoDB:**
```bash
mongod
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 3 - Frontend:**
```bash
cd frontend
npm start
```

### Access Points

- **Backend API**: http://localhost:5000
- **Frontend**: Follow Expo instructions
  - Press `w` for web browser
  - Press `a` for Android emulator
  - Press `i` for iOS simulator
  - Scan QR code with Expo Go app

## 📱 Mobile Testing

### For Physical Device:

1. Install **Expo Go** app from Play Store/App Store
2. Find your computer's IP address:
   ```bash
   # Windows
   ipconfig
   ```
3. Update `API_BASE_URL` in `frontend/src/services/api.js`:
   ```javascript
   const API_BASE_URL = 'http://YOUR_IP_ADDRESS:5000/api';
   ```
4. Scan QR code from Expo with Expo Go app

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints Summary

- **Authentication** (3 endpoints)
  - POST `/api/auth/register`
  - POST `/api/auth/login`
  - GET `/api/auth/verify`

- **Parking** (6 endpoints)
  - GET `/api/parking`
  - POST `/api/parking`
  - GET `/api/parking/:id`
  - PUT `/api/parking/:id`
  - DELETE `/api/parking/:id`
  - GET `/api/parking/provider/:providerId`

- **Bookings** (6 endpoints)
  - POST `/api/bookings`
  - GET `/api/bookings/user/:userId`
  - GET `/api/bookings/:id`
  - PATCH `/api/bookings/:id/status`
  - POST `/api/bookings/:id/checkin`
  - POST `/api/bookings/:id/checkout`

- **Users** (8 endpoints)
- **EV Charging** (5 endpoints)
- **Admin** (8 endpoints)

**Total: 36 API Endpoints**

For detailed API documentation, see `backend/README.md`

## 🔗 Integration

The frontend and backend are connected through a comprehensive API service layer.

See `INTEGRATION_GUIDE.md` for:
- API integration examples
- Token management
- Error handling
- Testing instructions

## 📖 Documentation

- **QUICK_START.md** - Quick setup guide
- **INTEGRATION_GUIDE.md** - Frontend-backend integration
- **ARCHITECTURE.md** - System architecture diagrams
- **INTEGRATION_SUMMARY.md** - Complete feature summary
- **frontend/README.md** - Frontend documentation
- **backend/README.md** - Backend API documentation

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (Driver, Provider, Admin)
- Protected API endpoints
- Token expiration and refresh

## 🧪 Testing

### Test Backend Health

```bash
curl http://localhost:5000/api/health
```

### Create Test Users

See `QUICK_START.md` for examples of creating test accounts for each role.

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Start MongoDB service
net start MongoDB
```

### Port Already in Use
```bash
# Find and kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Cannot Connect from Mobile
- Ensure both devices are on same WiFi
- Use computer's IP address instead of localhost
- Check firewall settings

For more troubleshooting, see `QUICK_START.md`

## 📝 License

ISC

## 👥 Contributors

- Mayank Shrivastava
- SubbaLaskhmi

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

For questions or issues:
- Check the documentation files
- Review the troubleshooting section
- Open an issue on GitHub

---

**Built with ❤️ for Infosys Springboard Internship**
