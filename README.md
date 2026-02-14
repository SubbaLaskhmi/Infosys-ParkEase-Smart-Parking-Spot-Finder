# 🅿️ ParkEase - Smart Parking Management System

[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red)]()
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.2-brightgreen)]()
[![React](https://img.shields.io/badge/React-19.2.0-blue)]()  
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)]()

> **A modern, full-stack parking management solution with real-time availability, integrated payments, and QR-based check-in.**

---

## 🌟 Features

### For Drivers (Users)

- 🗺️ **Interactive Map Search** - Find available parking spots on an interactive Leaflet map
- 🎯 **Smart Filtering** - Filter by price, distance, EV charging availability
- 💳 **Seamless Booking** - One-click booking with integrated payment modal
- 📱 **QR Ticket Generation** - Instant downloadable QR code tickets after booking
- ⭐ **Favorites** - Save frequently used parking spots  
- 🔔 **Real-Time Notifications** - Toast alerts for all actions
- 💼 **Wallet Integration** - Manage wallet balance and transactions  

### For Providers

- ➕ **Add Parking Listings** - Create new parking spots with details
- 📊 **Dashboard Analytics** - View bookings, revenue, and statistics
- 🔍 **QR Scanner** - Scan booking QR codes for check-in
- 📈 **Booking Management** - Track all bookings in real-time
- ✅ **Status Updates** - Update parking availability and booking status

### For Admins  

- 🛡️ **Approval Workflow** - Review and approve new parking listings
- 🚦 **Status Management** - Control (approve/reject) parking spot listings
- 👥 **User Management** - Manage drivers and providers
- 📊 **System Analytics** - Comprehensive charts and statistics

---

## 🏗️ Tech Stack

### Frontend

- **React 19.2** - Modern UI with Hooks and Context API
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Leaflet & React-Leaflet** - Interactive maps
- **Axios** - HTTP client
- **Socket.IO Client** - Real-time updates
- **QRCode.React** - QR code generation
- **Recharts** - Beautiful charts for analytics

### Backend

- **Spring Boot 3.2.2** - Robust Java framework
- **Spring Security** - JWT-based authentication
- **MongoDB** - NoSQL database
- **Maven** - Dependency management
- **WebSocket** - Real-time communication
- **JWT (io.jsonwebtoken)** - Secure token generation

### DevOps & Deployment

- **Docker** - Containerization (config included)
- **Render** - Cloud deployment (render.yaml included)
- **Git** - Version control

---

## 🚀 Quick Start

### Prerequisites

- **Java 17+** (for backend)
- **Node.js 18+** (for frontend)
- **MongoDB** (local or Atlas)
- **Maven** (for backend build)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/parkease.git
cd parkease
```

### 2️⃣ Backend Setup

```bash
cd backend

# Configure application.properties
# Update the following in src/main/resources/application.properties:
# - spring.data.mongodb.uri=your_mongodb_connection_string
# - parkease.app.jwtSecret=your_secret_key

# Build and run
mvn clean install
mvn spring-boot:run
```

Backend will start on **<http://localhost:5002>**

### 3️⃣ Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment variables
# Create .env file:
VITE_API_URL=http://localhost:5002/api

# Run development server
npm run dev
```

Frontend will start on **<http://localhost:5173>**

---

## 📂 Project Structure

```
parkease/
├── backend/                 # Spring Boot backend
│   ├── src/main/java/
│   │   └── com/parkease/
│   │       ├── controller/  # REST API endpoints
│   │       ├── model/       # MongoDB models
│   │       ├── service/     # Business logic
│   │       ├── security/    # JWT & Spring Security config
│   │       ├── dto/         # Data transfer objects
│   │       └── repository/  # MongoDB repositories
│   └── src/main/resources/
│       └── application.properties
│
├── frontend/                # React frontend
│   ├── src/
│   │   ├── pages/           # Main app pages
│   │   ├── components/      # Reusable components
│   │   ├── context/         # React Context providers
│   │   ├── dashboards/      # Role-specific dashboards
│   │   └── styles/          # CSS and Tailwind config
│   └── public/
│
├── docker-compose.yml       # Docker setup
├── render.yaml              # Render deployment config
└── README.md                # You are here!
```

---

## 🔑 Demo Credentials

Use these credentials to test the application:

| Role | Email | Password | Features |
|------|-------|----------|----------|
| **Admin** | `admin@parkease.com` | `admin123` | Approve listings, Manage users |
| **Provider** | `owner@parkease.com` | `owner123` | Add parking, Scan QR, View Revenue |
| **Driver** | `user@parkease.com` | `user123` | Book spots, Pay, Withdrawal |

---

## 🚦 Features Overview

### 🚗 For Drivers

- **Interactive Map**: Dark-themed Leaflet map with "Magic Sort" validation.
- **Booking & Payment**: Seamless flow from selection to payment (simulated).
- **Wallet**: Add funds and **Withdraw** balance (New!).
- **QR Tickets**: Instant access to booking QR codes.

### 🏢 For Providers (Space Owners)

- **Manage Listings**: Add, Edit, and Delete parking spots.
- **Real-time Dashboard**: Track active bookings and revenue.
- **Withdrawal**: Request payout of earnings directly from the wallet.

### 🛡️ For Admins

- **Verification**: Approve or Reject new parking listings.
- **Oversight**: View all users and system statistics.

---

## 🎨 Key Components

### Frontend Components

- **`QRGenerator.jsx`** - Generates booking QR tickets with download/share
- **`PaymentModal.jsx`** - Handles payment flow (simulated)
- **`BookingDrawer.jsx`** - Bottom drawer for booking confirmation
- **`NavigationOverlay.jsx`** - Map navigation controls
- **`ErrorBoundary.jsx`** - Production-ready error handling
- **`AIChatbot.jsx`** - AI assistant for parking search

### Backend Controllers

- **`AuthController`** - User authentication
- **`ParkingController`** - Parking CRUD operations
- **`BookingController`** - Booking management
- **`ProviderController`** - Provider-specific operations
- **`AdminController`** - Admin operations

---

## 💡 Usage Guide

### For Drivers

1. **Register** → Login
2. **Search** parking spots on the map
3. **Select** a spot → View details
4. **Book Now** → Complete payment
5. **Download QR Ticket** → Present at parking location

### For Providers

1. **Register** as PROVIDER
2. **Add Parking** listing with details
3. Wait for **admin approval**
4. **Scan booking QR codes** for check-in
5. **View analytics** on dashboard

### For Admins

1. Login as ADMIN
2. **Review pending** parking listings
3. **Approve/Reject** listings
4. **Monitor system** analytics

---

## 🧪 Testing

### Backend

```bash
mvn test
```

### Frontend

```bash
npm run test
```

### Manual Testing Checklist

- [ ] User registration and login
- [ ] Parking search and filtering
- [ ] Booking flow with payment
- [ ] QR code generation and download
- [ ] Provider adding parking spots
- [ ] Admin approval workflow
- [ ] QR code scanning

---

## 🚢 Deployment

### Docker Deployment

```bash
docker-compose up --build
```

### Cloud Deployment (Render)

1. Push code to GitHub
2. Connect repository to Render
3. Deploy using `render.yaml` configuration
4. Set environment variables in Render dashboard

### Environment Variables (Production)

```env
# Backend
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_strong_secret_key
JWT_EXPIRATION_MS=86400000

# Frontend
VITE_API_URL=https://your-backend-url.com/api
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**  

- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [Your Profile](https://linkedin.com/in/your-profile)

---

## 🙏 Acknowledgments

- Leaflet for amazing map integration
- Spring Boot community for excellent documentation
- React ecosystem for powerful tools and libraries

---

## 📞 Support

For support, email <your-email@example.com> or open an issue on GitHub.

---

**Made with ❤️ for hassle-free parking management**
