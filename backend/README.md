# ParkEase Backend API

Backend server for ParkEase Smart Parking Spot Finder application.

## Features

- User authentication (JWT-based)
- Role-based access control (Driver, Provider, Admin)
- Parking lot management
- Booking system with wallet integration
- EV charging station management
- Admin dashboard with statistics

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/parkease
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

## Running the Server

### Development mode (with auto-restart):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify JWT token

### Parking Lots
- `GET /api/parking` - Get all parking lots
- `GET /api/parking/:id` - Get parking lot by ID
- `POST /api/parking` - Create parking lot (Provider only)
- `PUT /api/parking/:id` - Update parking lot
- `DELETE /api/parking/:id` - Delete parking lot
- `GET /api/parking/provider/:providerId` - Get parking lots by provider

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/user/:userId` - Get user bookings
- `GET /api/bookings/:id` - Get booking by ID
- `PATCH /api/bookings/:id/status` - Update booking status
- `POST /api/bookings/:id/checkin` - Check-in
- `POST /api/bookings/:id/checkout` - Check-out

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `GET /api/users/:id/wallet` - Get wallet details
- `POST /api/users/:id/wallet/add` - Add money to wallet
- `POST /api/users/:id/vehicles` - Add vehicle
- `DELETE /api/users/:id/vehicles/:vehicleId` - Remove vehicle
- `POST /api/users/:id/saved-places` - Add saved place
- `DELETE /api/users/:id/saved-places/:placeId` - Remove saved place

### EV Charging
- `GET /api/ev/stations` - Get all EV stations
- `GET /api/ev/stations/:parkingLotId` - Get EV stations by parking lot
- `POST /api/ev/stations/:parkingLotId` - Add EV station (Provider only)
- `PATCH /api/ev/stations/:parkingLotId/:stationId` - Update EV station
- `DELETE /api/ev/stations/:parkingLotId/:stationId` - Delete EV station

### Admin
- `GET /api/admin/users` - Get all users (Admin only)
- `GET /api/admin/drivers` - Get all drivers (Admin only)
- `GET /api/admin/providers` - Get all providers (Admin only)
- `GET /api/admin/users/:id` - Get user details (Admin only)
- `PATCH /api/admin/users/:id/suspend` - Suspend user (Admin only)
- `PATCH /api/admin/users/:id/activate` - Activate user (Admin only)
- `DELETE /api/admin/users/:id` - Delete user (Admin only)
- `GET /api/admin/stats` - Get dashboard statistics (Admin only)

## Database Models

### User
- name, email, password, phone
- role (driver, provider, admin)
- wallet (balance, transactions)
- vehicles
- savedPlaces
- status (active, suspended, pending)

### ParkingLot
- name, address, location (lat/long)
- provider (reference to User)
- pricing (hourlyRate, currency)
- slots (total, available, occupied)
- vehicleTypes
- evCharging (stations, status)
- rating, operatingHours

### Booking
- user, parkingLot (references)
- vehicle, slotNumber
- startTime, endTime, duration
- pricing, status, paymentStatus
- qrCode
- checkIn, checkOut

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing
- `NODE_ENV` - Environment (development/production)

## Error Handling

All API responses follow this format:

Success:
```json
{
  "message": "Success message",
  "data": {}
}
```

Error:
```json
{
  "error": "Error message",
  "message": "Detailed error description"
}
```

## Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## License

ISC
