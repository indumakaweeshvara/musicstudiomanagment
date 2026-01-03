# 🎵 Music Studio - Backend API

Express.js + TypeScript backend for the Music Studio platform.

## 🚀 Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe development
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Cloudinary** - Media storage
- **Nodemailer** - Email service
- **Google Gemini AI** - AI integration

## 📁 Project Structure

```
src/
├── config/
│   └── db.ts                 # Database connection
├── controllers/
│   ├── auth.controller.ts    # Authentication logic
│   ├── music.controller.ts   # Music CRUD operations
│   ├── package.controller.ts # Package management
│   ├── booking.controller.ts # Booking system
│   ├── testimonial.controller.ts
│   └── contact.controller.ts
├── middleware/
│   ├── auth.middleware.ts    # JWT verification
│   └── upload.middleware.ts  # File upload handling
├── models/
│   ├── user.model.ts         # User schema
│   ├── music.model.ts        # Music schema
│   ├── package.model.ts      # Package schema
│   ├── booking.model.ts      # Booking schema
│   ├── testimonial.model.ts
│   └── contact.model.ts
├── routes/
│   ├── auth.routes.ts        # /api/auth
│   ├── music.routes.ts       # /api/music
│   ├── package.routes.ts     # /api/packages
│   ├── booking.routes.ts     # /api/bookings
│   ├── testimonial.routes.ts # /api/testimonials
│   └── contact.routes.ts     # /api/contact
├── utils/
│   └── generateToken.ts      # JWT token generation
└── index.ts                  # Entry point
```

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/musicstudio
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/musicstudio?retryWrites=true&w=majority

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long

# Cloudinary Configuration (for file uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration (for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password

# AI Configuration (optional)
GEMINI_API_KEY=your_gemini_api_key
```

## 🚀 Getting Started

### Prerequisites
- Node.js v18+ installed
- MongoDB installed locally OR MongoDB Atlas account
- npm or yarn package manager

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
# Edit .env with your actual values
```

3. **Run in development mode:**
```bash
npm run dev
```

4. **Build for production:**
```bash
npm run build
```

5. **Run production build:**
```bash
npm start
```

Server will start on `http://localhost:5000`

## 📡 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | User login | No |
| GET | `/profile` | Get user profile | Yes |

**Register Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Login Request:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

---

### Music (`/api/music`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all music/videos | No |
| GET | `/search?keyword=` | Search music | No |
| POST | `/upload` | Upload music | Admin |
| PUT | `/:id` | Update music | Admin |
| DELETE | `/:id` | Delete music | Admin |
| PUT | `/:id/view` | Increment views | No |

**Upload Music (FormData):**
```
file: [audio/video file]
title: "Song Title"
artist: "Artist Name"
category: "audio" | "video"
description: "Description"
thumbnail: [image file] (optional)
```

---

### Packages (`/api/packages`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all packages | No |
| POST | `/` | Create package | Admin |
| PUT | `/:id` | Update package | Admin |
| DELETE | `/:id` | Delete package | Admin |

**Create Package:**
```json
{
  "name": "Basic Recording",
  "category": "recording",
  "price": 5000,
  "duration": "2 hours",
  "features": ["Studio time", "Engineer", "Basic mixing"],
  "description": "Perfect for solo artists"
}
```

---

### Bookings (`/api/bookings`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all bookings | Admin |
| POST | `/` | Create booking | No |
| GET | `/:id` | Get booking by ID | Admin |

**Create Booking:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "0771234567",
  "service": "Recording Session",
  "date": "2024-01-15",
  "time": "14:00",
  "message": "Need to record 3 songs"
}
```

---

### Testimonials (`/api/testimonials`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all testimonials | No |
| POST | `/` | Create testimonial | Admin |
| PUT | `/:id` | Update testimonial | Admin |
| DELETE | `/:id` | Delete testimonial | Admin |

---

### Contact (`/api/contact`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/` | Submit contact form | No |
| GET | `/messages` | Get all messages | Admin |

**Submit Contact:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "I'd like to inquire about studio rates"
}
```

## 🔐 Authentication

This API uses JWT (JSON Web Tokens) for authentication.

### How to use protected endpoints:

1. **Login** to get a token:
```bash
POST /api/auth/login
```

2. **Include token** in subsequent requests:
```
Authorization: Bearer <your_jwt_token>
```

### Admin Routes

Admin-only routes require:
- Valid JWT token
- User role: `admin`

## 🗄️ Database Models

### User Model
```typescript
{
  name: string;
  email: string;
  password: string; // hashed with bcryptjs
  role: 'user' | 'admin';
  createdAt: Date;
}
```

### Music Model
```typescript
{
  title: string;
  artist: string;
  category: 'audio' | 'video';
  fileUrl: string;
  thumbnailUrl?: string;
  description?: string;
  views: number;
  createdAt: Date;
}
```

### Package Model
```typescript
{
  name: string;
  category: string;
  price: number;
  duration: string;
  features: string[];
  description: string;
  createdAt: Date;
}
```

### Booking Model
```typescript
{
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}
```

## 🚀 Deployment (Render.com)

### Step 1: Prepare for Deployment

1. Ensure `package.json` has build script:
```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

2. Create `render.yaml` (optional):
```yaml
services:
  - type: web
    name: music-studio-api
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
```

### Step 2: Deploy to Render

1. Push code to GitHub
2. Go to [Render.com](https://render.com)
3. Create new **Web Service**
4. Connect GitHub repository
5. Configure:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Environment:** Node

6. Add environment variables in Render dashboard

### Step 3: Set Environment Variables

Add all variables from `.env` in Render dashboard

## 📝 Development Notes

### Creating Admin User

Run the `createAdmin.ts` script:
```bash
npx ts-node createAdmin.ts
```

### Testing API

Use tools like:
- **Postman** - API testing
- **Thunder Client** - VS Code extension
- **curl** - Command line

Example:
```bash
curl http://localhost:5000/api/music
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Check `MONGODB_URI` in `.env`
- Ensure MongoDB is running locally
- For Atlas: Check network access settings

### JWT Errors
- Verify `JWT_SECRET` is set
- Check token expiration
- Ensure correct Authorization header format

### File Upload Issues
- Check Cloudinary credentials
- Verify file size limits
- Check supported file types

## 📄 License

MIT License - see LICENSE file for details

## 👨‍💻 Author

[Your Name] - [your.email@example.com]
