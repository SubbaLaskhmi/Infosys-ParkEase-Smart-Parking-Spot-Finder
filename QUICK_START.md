# Quick Start Guide - ParkEase

This guide will help you get the ParkEase application up and running in minutes.

## Prerequisites Check

Before starting, ensure you have:

- ✅ **Node.js** (v14+) - [Download](https://nodejs.org/)
- ✅ **MongoDB** - [Download](https://www.mongodb.com/try/download/community)
- ✅ **Git** - [Download](https://git-scm.com/)

## Step-by-Step Setup

### 1. Install MongoDB (if not installed)

**Windows:**
1. Download MongoDB Community Server
2. Run the installer
3. Choose "Complete" installation
4. Install as a Windows Service (recommended)

**Verify MongoDB is running:**
```bash
mongod --version
```

### 2. Clone and Install

```bash
# Clone the repository
git clone https://github.com/Mayank-Shrivastava-2004/ParkEaseSmartParkingSpotFinder.git
cd ParkEaseSmartParkingSpotFinder-main

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 3. Start the Application

**Option A: Automatic Start (Windows)**
```bash
# Double-click start.bat
# OR run from command line:
start.bat
```

**Option B: Manual Start**

**Terminal 1 - Start MongoDB** (if not running as service):
```bash
mongod
```

**Terminal 2 - Start Backend:**
```bash
cd backend
npm run dev
```

**Terminal 3 - Start Frontend:**
```bash
npm start
```

### 4. Access the Application

- **Backend API**: http://localhost:5000
- **Frontend**: Follow Expo instructions (press `w` for web, `a` for Android, `i` for iOS)

## Testing the Connection

### Test Backend Health

Open your browser and visit:
```
http://localhost:5000/api/health
```

You should see:
```json
{
  "status": "OK",
  "message": "ParkEase API is running",
  "timestamp": "2024-01-20T..."
}
```

### Create Test User

You can create test users for each panel:

**Driver Account:**
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test Driver",
  "email": "driver@test.com",
  "password": "test123",
  "phone": "+91 9876543210",
  "role": "driver"
}
```

**Provider Account:**
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test Provider",
  "email": "provider@test.com",
  "password": "test123",
  "phone": "+91 9876543211",
  "role": "provider"
}
```

**Admin Account:**
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test Admin",
  "email": "admin@test.com",
  "password": "test123",
  "phone": "+91 9876543212",
  "role": "admin"
}
```

You can use tools like:
- **Postman** - [Download](https://www.postman.com/downloads/)
- **Thunder Client** (VS Code extension)
- **curl** (command line)

## Using the Application

### 1. Login

1. Open the app
2. Select a panel (Driver/Provider/Admin)
3. Click "Login"
4. Use the test credentials created above

### 2. Driver Panel Features

- View parking spots on map
- Search for parking locations
- Check EV charging availability
- Book parking slots
- Manage wallet
- View booking history

### 3. Provider Panel Features

- Add parking locations
- Manage parking slots
- Add/manage EV charging stations
- View earnings
- Manage bookings

### 4. Admin Panel Features

- View all users
- Manage drivers and providers
- View system statistics
- Suspend/activate accounts

## Mobile Testing

### For Physical Device:

1. Install **Expo Go** app from Play Store/App Store
2. Find your computer's IP address:
   ```bash
   # Windows
   ipconfig
   # Look for IPv4 Address (e.g., 192.168.1.100)
   ```

3. Update API URL in `src/services/api.js`:
   ```javascript
   const API_BASE_URL = 'http://YOUR_IP_ADDRESS:5000/api';
   ```

4. Scan QR code from Expo with Expo Go app

### For Emulator:

**Android:**
```bash
npm run android
```

**iOS (Mac only):**
```bash
npm run ios
```

## Common Issues

### Issue: "MongoDB connection failed"

**Solution:**
```bash
# Check if MongoDB is running
sc query MongoDB

# If not running, start it
net start MongoDB
```

### Issue: "Port 5000 already in use"

**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Issue: "Cannot connect to backend from mobile"

**Solution:**
1. Ensure both devices are on same WiFi network
2. Use computer's IP address instead of localhost
3. Check firewall settings (allow port 5000)

### Issue: "npm install fails"

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

## Next Steps

1. ✅ Application is running
2. 📖 Read `INTEGRATION_GUIDE.md` for API integration details
3. 🔧 Customize the application for your needs
4. 📱 Test on mobile devices
5. 🚀 Deploy to production

## Useful Commands

```bash
# Backend
cd backend
npm run dev          # Start with auto-reload
npm start            # Start production mode

# Frontend
npm start            # Start Expo dev server
npm run android      # Run on Android
npm run ios          # Run on iOS
npm run web          # Run in browser

# Database
mongod               # Start MongoDB
mongo                # Open MongoDB shell
```

## Development Tools

### Recommended VS Code Extensions:
- ES7+ React/Redux/React-Native snippets
- MongoDB for VS Code
- Thunder Client (API testing)
- Prettier (code formatting)

### Recommended Tools:
- **Postman** - API testing
- **MongoDB Compass** - Database GUI
- **React Native Debugger** - Debugging

## Support

If you encounter any issues:

1. Check the error message in console
2. Review this Quick Start Guide
3. Check `INTEGRATION_GUIDE.md`
4. Check `backend/README.md`
5. Open an issue on GitHub

## Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)

---

**Happy Coding! 🚀**
