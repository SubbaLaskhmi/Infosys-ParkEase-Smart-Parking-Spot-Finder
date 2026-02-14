# ParkEase API Documentation

Base URL: `http://localhost:5002/api`

## Authentication

### Register a new user

- **URL**: `/auth/register`
- **Method**: `POST`
- **Body**:

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "USER" // USER, PROVIDER, ADMIN
  }
  ```

### Login

- **URL**: `/auth/login`
- **Method**: `POST`
- **Body**:

  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **Response**: Returns JWT token and user info.

---

## Wallet

### Add Funds

- **URL**: `/auth/wallet/add`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:

  ```json
  {
    "amount": 100
  }
  ```

### Withdraw Funds

- **URL**: `/auth/wallet/withdraw`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:

  ```json
  {
    "amount": 50
  }
  ```

---

## Parking Spots

### Get All Parkings

- **URL**: `/parkings`
- **Method**: `GET`
- **Query Params**: `lat`, `lng` (optional for sorting)

### Add Parking Spot (Provider)

- **URL**: `/parkings`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:

  ```json
  {
    "title": "Downtown Parking",
    "description": "Safe and secure",
    "addressLine": "123 Main St",
    "city": "Bangalore",
    "pincode": "560001",
    "location": { "lat": 12.9716, "lng": 77.5946 },
    "pricing": { "hourlyRate": 50 },
    "availableFrom": "08:00",
    "availableTo": "22:00",
    "dimensions": { "length": 20, "width": 10 },
    "vehicleCapacity": { "car4Seater": 10 }
  }
  ```

### Delete Parking Spot (Provider)

- **URL**: `/parkings/{id}`
- **Method**: `DELETE`
- **Headers**: `Authorization: Bearer <token>`

---

## Bookings

### Create Booking

- **URL**: `/bookings`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:

  ```json
  {
    "parkingId": "uuid-string",
    "startTime": "2023-10-27T10:00:00",
    "endTime": "2023-10-27T12:00:00",
    "totalAmount": 100,
    "vehicleType": "FOUR_SEATER"
  }
  ```

### Get My Bookings (Driver)

- **URL**: `/bookings/my-bookings`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`

---

## Admin

### Get All Users

- **URL**: `/admin/users`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>` (Admin only)

### Approve/Reject Parking

- **URL**: `/admin/parkings/{id}/{status}`
- **Method**: `PUT`
- **Headers**: `Authorization: Bearer <token>` (Admin only)
- **Status Enum**: `APPROVED`, `REJECTED`
