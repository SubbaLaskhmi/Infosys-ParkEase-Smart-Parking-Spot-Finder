# 🚀 ParkEase Deployment Guide

This guide provides step-by-step instructions for deploying ParkEase to production environments.

---

## 📋 Prerequisites

Before deploying, ensure you have:

- MongoDB Atlas account (or self-hosted MongoDB)
- Domain name (optional, for custom domain)
- Cloud platform account (Render, Heroku, AWS, etc.)
- Git repository with your code

---

## 🌍 Environment Configuration

### Backend Environment Variables

Create a production `application.properties` or use environment variables:

```properties
# Database
spring.data.mongodb.uri=${MONGODB_URI}
spring.data.mongodb.database=parkease

# JWT Configuration
parkease.app.jwtSecret=${JWT_SECRET}
parkease.app.jwtExpirationMs=86400000

# Server
server.port=${PORT:5002}

# CORS (Update with your frontend URL)
cors.allowed.origins=${FRONTEND_URL}
```

**Required Environment Variables:**

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Strong random string for JWT signing (min 32 characters)
- `FRONTEND_URL` - Your frontend URL (e.g., <https://parkease-app.com>)

### Frontend Environment Variables

Create `.env.production`:

```env
VITE_API_URL=https://your-backend-url.com/api
```

---

## ☁️ Render Deployment (Recommended)

Parkease includes a `render.yaml` for easy one-click Render deployment.

### Step 1: Prepare MongoDB

1. Create a MongoDB Atlas cluster
2. Get your connection string
3. Whitelist all IPs (0.0.0.0/0) for Render

### Step 2: Deploy Backend (Spring Boot)

1. Push your code to GitHub
2. Go to [Render Dashboard](https://render.com)
3. Click **New** → **Web Service**
4. Connect your GitHub repository
5. Configure:

   ```
   Name: parkease-backend
   Environment: Java
   Build Command: mvn clean install -DskipTests
   Start Command: java -jar target/backend-0.0.1-SNAPSHOT.jar
   Instance Type: Free (or paid)
   ```

6. Add environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Your strong secret key
   - `FRONTEND_URL`: Your frontend URL

7. Click **Create Web Service**

### Step 3: Deploy Frontend (React/Vite)

1. In Render Dashboard, click **New** → **Static Site**
2. Connect your GitHub repository (same repo, different path)
3. Configure:

   ```
   Name: parkease-frontend
   Build Command: cd frontend && npm install && npm run build
   Publish Directory: frontend/dist
   ```

4. Add environment variables:
   - `VITE_API_URL`: Your backend URL + `/api`

5. Click **Create Static Site**

### Step 4: Verify Deployment

- Backend: `https://parkease-backend.onrender.com/health`
- Frontend: `https://parkease-frontend.onrender.com`

---

## 🐳 Docker Deployment

### Option 1: Docker Compose (Local/VPS)

```bash
# Build and run
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Option 2: Separate Containers

**Backend:**

```bash
cd backend
docker build -t parkease-backend .
docker run -d -p 5002:5002 \
  -e MONGODB_URI="your_mongodb_uri" \
  -e JWT_SECRET="your_secret" \
  parkease-backend
```

**Frontend:**

```bash
cd frontend
docker build -t parkease-frontend .
docker run -d -p 80:80 parkease-frontend
```

---

## 🌐 Custom Domain Setup

### On Render

1. Go to your service settings
2. Click **Custom Domains**
3. Add your domain (e.g., api.parkease.com for backend)
4. Update DNS records as instructed
5. SSL certificate is automatically provisioned

### Update CORS

Update backend `application.properties`:

```properties
cors.allowed.origins=https://parkease.com
```

---

## 🔒 Security Checklist

- [ ] Use strong, random JWT secret (32+ characters)
- [ ] Enable HTTPS/SSL on both frontend and backend
- [ ] Whitelist only necessary IPs for MongoDB
- [ ] Set proper CORS origins (no wildcards in production)
- [ ] Remove all debug logging and console.logs
- [ ] Enable rate limiting (consider adding Spring Security rate limiting)
- [ ] Use environment variables for all secrets
- [ ] Set secure cookie flags if using sessions

---

## 📊 Monitoring & Logging

### Backend Logging

Spring Boot logs are available via:

```bash
# On Render
render logs -s your-service-name

# Docker
docker logs -f container_name
```

### Error Tracking (Optional)

Integrate Sentry or similar:

```javascript
// Frontend
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production"
});
```

---

## 🧪 Production Testing

After deployment, test:

1. **Health Check:** Visit `/health` endpoint
2. **Authentication:** Register and login
3. **Map Loading:** Check if parking spots load
4. **Booking Flow:** Complete a test booking
5. **QR Generation:** Verify QR codes generate correctly
6. **Admin Panel:** Test admin approval workflow
7. **Mobile:** Test on actual mobile devices

---

## 🔄 Update Deployment

### Render (Auto-deploy on push)

```bash
git add .
git commit -m "updates"
git push origin main
# Render automatically rebuilds and deploys
```

### Manual Redeploy

- Go to Render dashboard → Click **Manual Deploy**

### Docker

```bash
# Rebuild and restart
docker-compose down
docker-compose up --build -d
```

---

## 📈 Scaling

### Horizontal Scaling (Multiple Instances)

- On Render: Upgrade to paid plan and adjust instance count
- Add load balancer in front of multiple backend instances

### Database Scaling

- MongoDB Atlas: Upgrade cluster tier
- Enable read replicas for read-heavy operations

### CDN for Frontend

- Use Cloudflare or similar CDN for static assets
- Render automatically uses CDN for static sites

---

## 🐛 Troubleshooting

### Backend won't start

- Check MongoDB connection string
- Verify all environment variables are set
- Check logs for stack traces

### CORS errors

- Verify `FRONTEND_URL` matches exactly (no trailing slash)
- Check browser dev tools for specific error

### QR codes not generating

- Ensure `qrcode.react` is installed
- Check browser console for errors

### Payment modal issues

- Payment is simulated by default; integrate real gateway if needed

---

## 🔑 Environment Variables Summary

| Variable | Backend | Frontend | Description |
|----------|---------|----------|-------------|
| `MONGODB_URI` | ✅ | ❌ | MongoDB connection string |
| `JWT_SECRET` | ✅ | ❌ | Secret for JWT signing |
| `FRONTEND_URL` | ✅ | ❌ | CORS allowed origin |
| `VITE_API_URL` | ❌ | ✅ | Backend API URL |

---

## 📞 Support

If you encounter issues during deployment:

1. Check logs for specific errors
2. Consult [Render Documentation](https://render.com/docs)
3. Open an issue on GitHub

---

**🎉 Congratulations! Your ParkEase instance is now live!**
