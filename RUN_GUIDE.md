# ParkEase Run Guide

## Prerequisites

- **Java 17+** installed.
- **Node.js** installed.
- **MySQL** running on port `3306` with database `parkease_db` created (optional, app will try to create if configured).
  - Username: `root`
  - Password: `h.HACKER706226` (as per `application.properties`)

## Steps to Run

### 1. Start the Backend (Spring Boot)

Open a terminal:

```powershell
cd backend
./mvnw spring-boot:run
```

Wait for "Started ParkEaseApplication" log.
Server runs on: `http://localhost:5000`

### 2. Start the Frontend (React + Vite)

Open a **new** terminal:

```powershell
cd frontend
npm install  # Run only if dependencies are missing
npm run dev
```

Frontend runs on: `http://localhost:5173`

## Troubleshooting

- **Frontend fails immediately?** Run `npm install` inside `frontend/` folder.
- **Backend fails to connect?** Ensure MySQL is running. Check `backend/src/main/resources/application.properties` for credentials.
