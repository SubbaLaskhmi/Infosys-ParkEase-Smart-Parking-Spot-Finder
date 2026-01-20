# ParkEase Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React Native)                  │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │    Driver    │  │   Provider   │  │    Admin     │         │
│  │    Panel     │  │    Panel     │  │    Panel     │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│         │                 │                  │                  │
│         └─────────────────┴──────────────────┘                  │
│                           │                                      │
│                  ┌────────▼────────┐                            │
│                  │  API Service    │                            │
│                  │  (src/services) │                            │
│                  └────────┬────────┘                            │
└───────────────────────────┼─────────────────────────────────────┘
                            │
                            │ HTTP/HTTPS
                            │ (axios)
                            │
┌───────────────────────────▼─────────────────────────────────────┐
│                      BACKEND (Node.js/Express)                   │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Middleware Layer                       │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐         │  │
│  │  │   CORS     │  │    JWT     │  │   Error    │         │  │
│  │  │  Handler   │  │   Auth     │  │  Handler   │         │  │
│  │  └────────────┘  └────────────┘  └────────────┘         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            │                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                     API Routes                            │  │
│  │                                                           │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │  │
│  │  │   Auth   │  │ Parking  │  │ Booking  │  │  User   │ │  │
│  │  │  Routes  │  │  Routes  │  │  Routes  │  │ Routes  │ │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │  │
│  │                                                           │  │
│  │  ┌──────────┐  ┌──────────┐                             │  │
│  │  │    EV    │  │  Admin   │                             │  │
│  │  │  Routes  │  │  Routes  │                             │  │
│  │  └──────────┘  └──────────┘                             │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            │                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   Database Models                         │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐               │  │
│  │  │   User   │  │ Parking  │  │ Booking  │               │  │
│  │  │  Model   │  │   Lot    │  │  Model   │               │  │
│  │  └──────────┘  └──────────┘  └──────────┘               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            │                                     │
└────────────────────────────┼─────────────────────────────────────┘
                             │
                             │ Mongoose ODM
                             │
┌────────────────────────────▼─────────────────────────────────────┐
│                      DATABASE (MongoDB)                          │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │    users     │  │ parkinglots  │  │   bookings   │         │
│  │  collection  │  │  collection  │  │  collection  │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. User Authentication Flow

```
User Input (Login)
      │
      ▼
Frontend (LoginScreen)
      │
      ▼
API Service (authAPI.login)
      │
      ▼
Backend (/api/auth/login)
      │
      ├─► Validate credentials
      ├─► Check user status
      ├─► Generate JWT token
      │
      ▼
MongoDB (users collection)
      │
      ▼
Response (token + user data)
      │
      ▼
Frontend (Save token, Navigate to Dashboard)
```

### 2. Booking Creation Flow

```
User Action (Book Parking)
      │
      ▼
Frontend (SlotSelectionScreen)
      │
      ▼
API Service (bookingAPI.create)
      │
      ▼
Backend (/api/bookings)
      │
      ├─► Verify JWT token
      ├─► Check parking lot availability
      ├─► Check wallet balance
      ├─► Create booking
      ├─► Update parking lot slots
      ├─► Deduct from wallet
      ├─► Generate QR code
      │
      ▼
MongoDB (bookings, parkinglots, users)
      │
      ▼
Response (booking details + QR code)
      │
      ▼
Frontend (Show confirmation, Display QR)
```

### 3. Admin User Management Flow

```
Admin Action (Suspend User)
      │
      ▼
Frontend (AdminDashboard)
      │
      ▼
API Service (adminAPI.suspendUser)
      │
      ▼
Backend (/api/admin/users/:id/suspend)
      │
      ├─► Verify JWT token
      ├─► Check admin role
      ├─► Update user status
      │
      ▼
MongoDB (users collection)
      │
      ▼
Response (updated user)
      │
      ▼
Frontend (Update UI, Show notification)
```

## Component Interaction

### Frontend Components

```
App.js
  │
  ├─► AppNavigator
  │     │
  │     ├─► PanelSelectionScreen
  │     │
  │     ├─► Driver Panel
  │     │     ├─► DriverDashboard
  │     │     ├─► WalletScreen
  │     │     ├─► BookingHistory
  │     │     └─► Settings
  │     │
  │     ├─► Provider Panel
  │     │     ├─► ProviderDashboard
  │     │     ├─► ParkingLotsScreen
  │     │     ├─► EVManagementScreen
  │     │     └─► EarningsScreen
  │     │
  │     └─► Admin Panel
  │           ├─► AdminDashboard
  │           ├─► DriversScreen
  │           └─► ProvidersScreen
  │
  └─► API Service Layer
        │
        ├─► authAPI
        ├─► parkingAPI
        ├─► bookingAPI
        ├─► userAPI
        ├─► evAPI
        └─► adminAPI
```

### Backend Components

```
server.js
  │
  ├─► Middleware
  │     ├─► CORS
  │     ├─► Body Parser
  │     └─► Error Handler
  │
  ├─► Routes
  │     ├─► /api/auth
  │     ├─► /api/parking
  │     ├─► /api/bookings
  │     ├─► /api/users
  │     ├─► /api/ev
  │     └─► /api/admin
  │
  ├─► Models
  │     ├─► User
  │     ├─► ParkingLot
  │     └─► Booking
  │
  └─► Database (MongoDB)
```

## Security Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Security Layers                          │
│                                                              │
│  1. HTTPS/TLS (Transport Layer)                             │
│     └─► Encrypted communication                             │
│                                                              │
│  2. JWT Authentication                                       │
│     ├─► Token-based auth                                    │
│     ├─► 7-day expiration                                    │
│     └─► Signed with secret key                              │
│                                                              │
│  3. Password Security                                        │
│     ├─► bcrypt hashing (10 rounds)                          │
│     └─► Never stored in plain text                          │
│                                                              │
│  4. Role-Based Access Control (RBAC)                        │
│     ├─► Driver: Limited access                              │
│     ├─► Provider: Parking management                        │
│     └─► Admin: Full system access                           │
│                                                              │
│  5. Input Validation                                         │
│     ├─► Request validation                                  │
│     └─► Data sanitization                                   │
│                                                              │
│  6. Error Handling                                           │
│     ├─► No sensitive data in errors                         │
│     └─► Generic error messages                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Database Schema

### Users Collection

```
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: String (driver|provider|admin),
  wallet: {
    balance: Number,
    transactions: [{
      type: String (credit|debit),
      amount: Number,
      description: String,
      date: Date
    }]
  },
  vehicles: [{
    type: String,
    plateNumber: String,
    model: String,
    isEV: Boolean
  }],
  savedPlaces: [{
    name: String,
    address: String,
    latitude: Number,
    longitude: Number
  }],
  status: String (active|suspended|pending),
  createdAt: Date,
  updatedAt: Date
}
```

### ParkingLots Collection

```
{
  _id: ObjectId,
  name: String,
  address: String,
  location: {
    latitude: Number,
    longitude: Number
  },
  provider: ObjectId (ref: User),
  pricing: {
    hourlyRate: Number,
    currency: String
  },
  slots: {
    total: Number,
    available: Number,
    occupied: Number
  },
  vehicleTypes: [String],
  evCharging: {
    available: Boolean,
    stations: [{
      id: String,
      status: String (available|charging|maintenance),
      vehicleType: String,
      currentVehicle: {
        plateNumber: String,
        timeRemaining: Number
      }
    }]
  },
  status: String (available|full|closed),
  rating: {
    average: Number,
    count: Number
  },
  operatingHours: {
    open: String,
    close: String,
    is24Hours: Boolean
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Bookings Collection

```
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  parkingLot: ObjectId (ref: ParkingLot),
  vehicle: {
    type: String,
    plateNumber: String,
    model: String
  },
  slotNumber: String,
  startTime: Date,
  endTime: Date,
  duration: {
    hours: Number,
    minutes: Number
  },
  pricing: {
    hourlyRate: Number,
    totalAmount: Number,
    currency: String
  },
  status: String (pending|confirmed|active|completed|cancelled),
  paymentStatus: String (pending|paid|refunded),
  qrCode: String,
  checkIn: {
    time: Date,
    verified: Boolean
  },
  checkOut: {
    time: Date,
    verified: Boolean
  },
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoint Categories

```
Authentication (3)
├─► POST /api/auth/register
├─► POST /api/auth/login
└─► GET /api/auth/verify

Parking Management (6)
├─► GET /api/parking
├─► GET /api/parking/:id
├─► POST /api/parking
├─► PUT /api/parking/:id
├─► DELETE /api/parking/:id
└─► GET /api/parking/provider/:providerId

Booking System (6)
├─► POST /api/bookings
├─► GET /api/bookings/user/:userId
├─► GET /api/bookings/:id
├─► PATCH /api/bookings/:id/status
├─► POST /api/bookings/:id/checkin
└─► POST /api/bookings/:id/checkout

User Management (8)
├─► GET /api/users/:id
├─► PUT /api/users/:id
├─► GET /api/users/:id/wallet
├─► POST /api/users/:id/wallet/add
├─► POST /api/users/:id/vehicles
├─► DELETE /api/users/:id/vehicles/:vehicleId
├─► POST /api/users/:id/saved-places
└─► DELETE /api/users/:id/saved-places/:placeId

EV Charging (5)
├─► GET /api/ev/stations
├─► GET /api/ev/stations/:parkingLotId
├─► POST /api/ev/stations/:parkingLotId
├─► PATCH /api/ev/stations/:parkingLotId/:stationId
└─► DELETE /api/ev/stations/:parkingLotId/:stationId

Admin Operations (8)
├─► GET /api/admin/users
├─► GET /api/admin/drivers
├─► GET /api/admin/providers
├─► GET /api/admin/users/:id
├─► PATCH /api/admin/users/:id/suspend
├─► PATCH /api/admin/users/:id/activate
├─► DELETE /api/admin/users/:id
└─► GET /api/admin/stats

Total: 36 Endpoints
```

---

**This architecture provides a scalable, secure, and maintainable foundation for the ParkEase application.**
