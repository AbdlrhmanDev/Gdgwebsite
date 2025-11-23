# GDG Website - Full Stack Application

A modern, bilingual (Arabic/English) website for Google Developer Group at Future University with complete backend integration.

## 🎯 Features

- 🌐 **Bilingual Support** - Full Arabic & English with RTL/LTR
- 🔐 **Authentication** - JWT-based auth with role management
- 👥 **User Roles** - User, Member, Admin with different permissions
- 📅 **Event Management** - Create, edit, delete events (Admin)
- 🎮 **Gamification** - Points, levels, badges, and leaderboard
- 🏢 **Departments** - 8 departments with task management
- ✅ **Task System** - Assign and track tasks with rewards
- 🎨 **Modern UI** - Dark/Light mode, responsive design
- 🗄️ **MongoDB Backend** - RESTful API with Express.js

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/AbdlrhmanDev/Gdgwebsite.git
cd Gdgwebsite
```

2. **Install frontend dependencies:**
```bash
npm install
```

3. **Install backend dependencies:**
```bash
cd server
npm install
```

4. **Configure environment:**
```bash
# In server directory
copy .env.example .env
# Edit .env and set your MONGODB_URI
```

5. **Seed the database:**
```bash
npm run seed
```

### Running the Application

#### Option 1: Using Startup Scripts (Windows)
```bash
# Terminal 1 - Start Backend
.\start-backend.bat

# Terminal 2 - Start Frontend
.\start-frontend.bat
```

#### Option 2: Manual Start
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend (in new terminal)
cd ..
npm run dev
```

The application will be available at:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

---

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@gdg.com | admin123 |
| Admin | sarah.ahmed@gdg.com | admin123 |
| Admin | mohamed.hassan@gdg.com | admin123 |
| Admin | fatima.ali@gdg.com | admin123 |
| Admin | ahmed.khaled@gdg.com | admin123 |
| Member | member@gdg.com | member123 |
| User | user@gdg.com | user123 |

💡 **Tip:** Click any credential in the login page to auto-fill!

---

## 📚 Documentation

- [Integration Guide](./INTEGRATION_GUIDE.md) - Frontend-Backend integration details
- [Backend API Documentation](./server/README.md) - Complete API reference
- [Project Overview](./src/PROJECT_OVERVIEW.md) - Detailed features (Arabic)
- [Quick Start Guide](./src/QUICK_START.md) - User guide (Arabic)

---

## 🛠️ Tech Stack

### Frontend
- React 18 + TypeScript
- Tailwind CSS v4
- Axios for API calls
- Radix UI Components
- Motion/React animations
- Recharts for data visualization

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt password hashing
- Express Validator

---

## 📁 Project Structure

```
Gdgwebsite/
├── src/
│   ├── services/          # API service layer
│   ├── components/        # React components
│   ├── app/              # Pages (Next.js style routing)
│   ├── lib/              # Utilities & helpers
│   └── styles/           # Global styles
├── server/
│   ├── models/           # MongoDB schemas
│   ├── controllers/      # Business logic
│   ├── routes/          # API routes
│   ├── middleware/      # Auth & error handling
│   ├── config/          # Database & seed data
│   └── server.js        # Express server
├── start-backend.bat    # Backend startup script
├── start-frontend.bat   # Frontend startup script
└── README.md
```

---

## 🌟 Key Features Explained

### Authentication System
- JWT tokens with 7-day expiration
- Automatic token refresh
- Protected routes based on roles
- Secure password hashing

### Event Management
- CRUD operations for events
- Bilingual event details
- Multiple registration methods
- Attendance tracking
- Event statistics and analytics

### Gamification System
- Points earned from activities
- Level progression (200 points per level)
- Badge achievements
- Real-time leaderboard
- Activity tracking

### Department & Task Management
- 8 departments (Leadership, Events, Technical, etc.)
- Task assignment with priorities
- Status tracking (pending, in-progress, completed)
- Points rewards for completion
- Comments and attachments

---

## 🔌 API Integration

The frontend communicates with the backend through service files:

```typescript
// Example: Login
import { authService } from './services/authService';

const response = await authService.login({ 
  email: 'admin@gdg.com', 
  password: 'admin123' 
});
```

All API calls are handled by:
- `authService.ts` - Authentication
- `eventService.ts` - Events
- `userService.ts` - Users & Gamification
- `registrationService.ts` - Event registrations
- `departmentService.ts` - Departments
- `taskService.ts` - Tasks
- `badgeService.ts` - Badges

---

## 🚦 Development

### Running Tests
```bash
# Backend tests (if implemented)
cd server
npm test

# Frontend tests (if implemented)
npm test
```

### Building for Production
```bash
# Build frontend
npm run build

# The build will be in the dist/ directory
```

### Linting & Formatting
```bash
# Run linter
npm run lint

# Format code
npm run format
```

---

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
- Make sure MongoDB is running
- Check MONGODB_URI in server/.env
- For MongoDB Atlas, check network access settings

**Port Already in Use:**
- Change PORT in server/.env
- Kill process using port 5000: `netstat -ano | findstr :5000`

### Frontend Issues

**API Connection Error:**
- Verify backend is running on port 5000
- Check VITE_API_URL in .env
- Check browser console for CORS errors

**Dependencies Error:**
- Delete node_modules and package-lock.json
- Run `npm install` again

---

## 📝 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (server/.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/gdg-website
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 👥 Team

**GDG Future University**
- GitHub: [@AbdlrhmanDev](https://github.com/AbdlrhmanDev)

---

## 📞 Support

For support or questions:
- Open an issue on GitHub
- Contact: [Your Email/Contact]

---

## 🎉 Acknowledgments

- Original design inspired by [Figma Design](https://www.figma.com/design/kOW16hcm2gllBZRwx9otE0/GDG-Website)
- Built with React, Express, and MongoDB
- UI components from Radix UI and shadcn/ui

---

**Made with ❤️ by GDG Future University**
  