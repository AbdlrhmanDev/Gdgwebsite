# GDG Website Backend API

Complete REST API for the GDG Future University Website built with Node.js, Express, and MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)

### Installation

1. **Navigate to server directory:**
```bash
cd server
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create environment file:**
```bash
cp .env.example .env
```

4. **Configure your `.env` file:**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/gdg-website
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

5. **Seed the database with sample data:**
```bash
npm run seed
```

6. **Start the server:**
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

---

## 📚 API Endpoints

### 🔐 Authentication

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "studentId": "S12345",
  "department": "technical",
  "phone": "01234567890"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@gdg.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "Admin User",
    "email": "admin@gdg.com",
    "role": "admin",
    "department": "leadership",
    "points": 2000,
    "level": 10
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Update Password
```http
PUT /api/auth/password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "oldpass123",
  "newPassword": "newpass123"
}
```

---

### 👥 Users

#### Get All Users (Admin)
```http
GET /api/users
Authorization: Bearer <admin-token>
Query Params: ?role=member&department=technical&search=john
```

#### Get User by ID
```http
GET /api/users/:id
Authorization: Bearer <token>
```

#### Update User Profile
```http
PUT /api/users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe Updated",
  "phone": "01234567890",
  "bio": "Passionate developer",
  "avatar": "https://example.com/avatar.jpg",
  "socialLinks": {
    "linkedin": "https://linkedin.com/in/johndoe",
    "github": "https://github.com/johndoe"
  }
}
```

#### Add Points to User (Admin)
```http
POST /api/users/:id/points
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "points": 50,
  "reason": "Completed workshop"
}
```

#### Award Badge (Admin)
```http
POST /api/users/:id/badges
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "badgeId": "badge_id_here"
}
```

#### Get Leaderboard
```http
GET /api/users/leaderboard?limit=10
```

---

### 📅 Events

#### Get All Events
```http
GET /api/events
Query Params: ?type=workshop&status=upcoming&featured=true&search=react&sort=-date
```

#### Get Event by ID
```http
GET /api/events/:id
```

#### Create Event (Admin)
```http
POST /api/events
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "title": "React Workshop",
  "titleEn": "React Workshop",
  "description": "Learn React basics",
  "descriptionEn": "Learn React basics",
  "date": "2025-12-01T18:00:00Z",
  "time": "18:00",
  "location": "Conference Hall",
  "locationEn": "Conference Hall",
  "type": "workshop",
  "category": "technical",
  "capacity": 50,
  "registrationMethod": "google-forms",
  "registrationUrl": "https://forms.google.com/...",
  "tags": ["react", "javascript"]
}
```

#### Update Event (Admin)
```http
PUT /api/events/:id
Authorization: Bearer <admin-token>
Content-Type: application/json
```

#### Delete Event (Admin)
```http
DELETE /api/events/:id
Authorization: Bearer <admin-token>
```

#### Get Event Statistics (Admin)
```http
GET /api/events/:id/stats
Authorization: Bearer <admin-token>
```

---

### 🎫 Registrations

#### Register for Event
```http
POST /api/registrations
Authorization: Bearer <token>
Content-Type: application/json

{
  "eventId": "event_id_here",
  "registrationMethod": "google-forms",
  "questions": [
    {
      "question": "What's your experience level?",
      "answer": "Intermediate"
    }
  ]
}
```

#### Get My Registrations
```http
GET /api/registrations/my
Authorization: Bearer <token>
```

#### Get All Registrations (Admin)
```http
GET /api/registrations
Authorization: Bearer <admin-token>
Query Params: ?eventId=xxx&status=registered
```

#### Cancel Registration
```http
PUT /api/registrations/:id/cancel
Authorization: Bearer <token>
Content-Type: application/json

{
  "cancellationReason": "Schedule conflict"
}
```

#### Mark Attendance (Admin)
```http
PUT /api/registrations/:id/attend
Authorization: Bearer <admin-token>
```

#### Add Feedback
```http
PUT /api/registrations/:id/feedback
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 5,
  "feedback": "Great event!"
}
```

---

### 🏢 Departments

#### Get All Departments
```http
GET /api/departments
```

#### Get Department by ID
```http
GET /api/departments/:id
```

#### Create Department (Admin)
```http
POST /api/departments
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "technical",
  "nameAr": "التقنية",
  "nameEn": "Technical",
  "descriptionAr": "الدعم التقني والتطوير",
  "descriptionEn": "Technical support and development",
  "icon": "💻",
  "color": "#34a853"
}
```

#### Update Department (Admin)
```http
PUT /api/departments/:id
Authorization: Bearer <admin-token>
```

#### Add Member to Department (Admin)
```http
POST /api/departments/:id/members
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "userId": "user_id_here"
}
```

---

### ✅ Tasks

#### Get All Tasks
```http
GET /api/tasks
Authorization: Bearer <token>
Query Params: ?department=xxx&status=pending&priority=high
```

#### Get Task by ID
```http
GET /api/tasks/:id
Authorization: Bearer <token>
```

#### Create Task (Admin)
```http
POST /api/tasks
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "title": "Design event poster",
  "titleEn": "Design event poster",
  "description": "Create promotional poster",
  "descriptionEn": "Create promotional poster",
  "department": "department_id",
  "assignedTo": ["user_id_1", "user_id_2"],
  "priority": "high",
  "dueDate": "2025-12-01",
  "points": 30
}
```

#### Update Task
```http
PUT /api/tasks/:id
Authorization: Bearer <token>
```

#### Complete Task
```http
PUT /api/tasks/:id/complete
Authorization: Bearer <token>
```

#### Add Comment
```http
POST /api/tasks/:id/comments
Authorization: Bearer <token>
Content-Type: application/json

{
  "text": "Working on this now"
}
```

#### Delete Task (Admin)
```http
DELETE /api/tasks/:id
Authorization: Bearer <admin-token>
```

---

### 🎖️ Badges

#### Get All Badges
```http
GET /api/badges
Query Params: ?category=achievement&rarity=rare
```

#### Get Badge by ID
```http
GET /api/badges/:id
```

#### Create Badge (Admin)
```http
POST /api/badges
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "expert",
  "nameAr": "الخبير",
  "nameEn": "Expert",
  "descriptionAr": "الوصول للمستوى 10",
  "descriptionEn": "Reach level 10",
  "icon": "🏆",
  "category": "achievement",
  "requirement": "level",
  "requirementValue": 10,
  "points": 500,
  "rarity": "legendary"
}
```

#### Update Badge (Admin)
```http
PUT /api/badges/:id
Authorization: Bearer <admin-token>
```

#### Delete Badge (Admin)
```http
DELETE /api/badges/:id
Authorization: Bearer <admin-token>
```

---

## 🔑 Demo Credentials

```
Admin:
Email: admin@gdg.com
Password: admin123

Member:
Email: member@gdg.com
Password: member123

User:
Email: user@gdg.com
Password: user123
```

---

## 🎯 Role-Based Access Control

### Roles:
- **user**: Basic access, can view public content
- **member**: Can register for events, view profile, earn points
- **admin**: Full access to all endpoints and management features

### Protected Routes:
- 🟢 **Public**: No authentication required
- 🟡 **Private**: Authentication required
- 🔴 **Admin**: Admin role required

---

## 📦 Database Models

### User
- Authentication & Profile
- Gamification (points, level, badges)
- Department assignment
- Events attended & tasks completed

### Event
- Event details (title, description, date, location)
- Bilingual support (Arabic/English)
- Registration tracking
- Capacity management

### Department
- Department information
- Members and head assignment
- Tasks association

### Task
- Task details and assignment
- Priority and status tracking
- Comments and attachments
- Points reward system

### Badge
- Badge information
- Achievement requirements
- Rarity levels

### Registration
- Event registration tracking
- Attendance marking
- Feedback collection

---

## 🛠️ Technologies Used

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Logging**: morgan
- **Security**: CORS enabled

---

## 📝 Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error message here"
}
```

---

## 🔄 Response Format

All successful responses follow this format:

```json
{
  "success": true,
  "message": "Operation message",
  "data": { }
}
```

For list endpoints:

```json
{
  "success": true,
  "count": 10,
  "data": []
}
```

---

## 🚦 Health Check

```http
GET /api/health
```

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-11-23T10:30:00.000Z"
}
```

---

## 📄 License

ISC
