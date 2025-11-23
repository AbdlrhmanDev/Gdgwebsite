# GDG Website - Full Stack Integration Guide

## 🎉 Frontend-Backend Integration Complete!

Your GDG website is now fully connected with a powerful Node.js + MongoDB backend.

---

## 🚀 Quick Start Guide

### Step 1: Start the Backend Server

```powershell
# Navigate to server directory
cd server

# Install dependencies (first time only)
npm install

# Create .env file
copy .env.example .env

# Seed database with sample data
npm run seed

# Start the server
npm run dev
```

The backend will run on `http://localhost:5000`

### Step 2: Start the Frontend

```powershell
# In a new terminal, navigate to project root
cd ..

# Install axios for API calls
npm install axios

# Start the frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

---

## 🔧 What's Changed

### ✨ New Features:

1. **API Services Layer** (`src/services/`)
   - `authService.ts` - Authentication (login, register, logout)
   - `eventService.ts` - Event management (CRUD operations)
   - `userService.ts` - User management & gamification
   - `registrationService.ts` - Event registrations
   - `departmentService.ts` - Department management
   - `taskService.ts` - Task management
   - `badgeService.ts` - Badge system
   - `api.ts` - Axios instance with interceptors

2. **Updated Components:**
   - `App.tsx` - Now fetches events from API
   - `Login.tsx` - Calls backend authentication
   - Auto-fill demo credentials (click to use)

3. **Authentication Flow:**
   - JWT tokens stored in localStorage
   - Automatic token refresh
   - Protected routes
   - Auto-redirect on token expiration

4. **Real-time Data:**
   - Events loaded from MongoDB
   - User authentication via API
   - Dynamic role-based access

---

## 📋 Demo Credentials

Click any credential in the login page to auto-fill:

| Role | Email | Password |
|------|-------|----------|
| 🟢 Admin | admin@gdg.com | admin123 |
| 🔵 Member | member@gdg.com | member123 |
| ⚪ User | user@gdg.com | user123 |

---

## 🔌 API Endpoints Available

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/password` - Update password

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create event (Admin)
- `PUT /api/events/:id` - Update event (Admin)
- `DELETE /api/events/:id` - Delete event (Admin)

### Users
- `GET /api/users/leaderboard` - Get leaderboard
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update profile

### Registrations
- `POST /api/registrations` - Register for event
- `GET /api/registrations/my` - Get my registrations

See `server/README.md` for complete API documentation.

---

## 🎯 Next Steps

### For Development:

1. **Test the Integration:**
   - Login with demo credentials
   - Create/edit events (as admin)
   - Register for events
   - Check leaderboard

2. **Customize:**
   - Update API URL in `.env`
   - Modify authentication flow
   - Add more features

3. **Deploy:**
   - Deploy backend to services like:
     - Railway
     - Render
     - Heroku
     - DigitalOcean
   - Deploy frontend to:
     - Vercel
     - Netlify
     - GitHub Pages

### For Production:

1. **Security:**
   - Change JWT_SECRET in server `.env`
   - Enable HTTPS
   - Add rate limiting
   - Validate all inputs

2. **Database:**
   - Use MongoDB Atlas (cloud)
   - Setup backups
   - Add indexes for performance

3. **Monitoring:**
   - Add error tracking (Sentry)
   - Setup logging
   - Monitor API performance

---

## 🛠️ Tech Stack

### Frontend:
- ⚛️ React 18 + TypeScript
- 🎨 Tailwind CSS
- 🌐 Axios for API calls
- 🔐 JWT authentication

### Backend:
- 🚀 Node.js + Express
- 🗄️ MongoDB + Mongoose
- 🔒 JWT + bcrypt
- ✅ Input validation

---

## 📁 Project Structure

```
Gdgwebsite/
├── src/
│   ├── services/          # API service layer
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   ├── eventService.ts
│   │   └── ...
│   ├── components/        # React components
│   ├── App.tsx           # Main app (updated)
│   └── ...
├── server/
│   ├── models/           # MongoDB models
│   ├── controllers/      # Business logic
│   ├── routes/          # API routes
│   ├── middleware/      # Auth & error handling
│   ├── config/          # DB config & seed
│   └── server.js        # Express server
├── .env                 # Frontend env (API URL)
└── package.json
```

---

## 🐛 Troubleshooting

### Backend not starting?
- Make sure MongoDB is running
- Check `.env` file exists in server/
- Run `npm install` in server directory

### Frontend can't connect?
- Check API URL in `.env`
- Make sure backend is running on port 5000
- Check browser console for errors

### CORS errors?
- Verify CLIENT_URL in server `.env`
- Make sure CORS is enabled in `server.js`

---

## 🎊 You're All Set!

Your GDG website now has:
✅ Real authentication with JWT
✅ Dynamic event management
✅ User roles and permissions
✅ Gamification system
✅ Full CRUD operations
✅ MongoDB database

Start both servers and enjoy your full-stack application! 🚀
