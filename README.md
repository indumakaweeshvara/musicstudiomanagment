# 🎵 Music Studio - Full Stack Web Application

<div align="center">

![Music Studio](https://img.shields.io/badge/MERN-Stack-green)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

**A modern, AI-powered music studio management platform**

[Live Demo](#) | [Backend API](#) | [Documentation](#features)

</div>

---

## 📝 Project Description

Music Studio is a comprehensive full-stack web application built with the MERN stack and TypeScript. It provides a complete platform for music studios to showcase their content, manage bookings, and interact with clients. The application features a beautiful, responsive UI with modern animations, secure authentication, and AI-powered features.

### 🎯 Key Highlights
- **Full-stack TypeScript** implementation (Frontend & Backend)
- **AI Integration** using Google Gemini for intelligent features
- **Secure Authentication** with JWT and bcryptjs
- **Cloud Storage** integration with Cloudinary
- **Responsive Design** with TailwindCSS
- **State Management** using Redux Toolkit
- **Real-time Updates** and notifications

---

## 🚀 Technologies Used

### Frontend
- **React 19** - Modern UI library with latest features
- **TypeScript** - Type-safe development
- **Redux Toolkit** - Global state management
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe backend development
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Cloudinary** - Cloud-based image/video storage
- **Nodemailer** - Email notifications
- **Google Gemini AI** - AI-powered features

### DevOps & Deployment
- **MongoDB Atlas** - Cloud database hosting
- **Vercel** - Frontend deployment
- **Render** - Backend API deployment
- **Git & GitHub** - Version control

---

## ✨ Main Features

### 🎵 User Features
1. **Music & Video Library**
   - Browse audio and video content
   - Search and filter functionality
   - View count tracking
   - Responsive media player

2. **Service Packages**
   - View studio service packages
   - Detailed pricing and features
   - Category-based filtering

3. **Booking System**
   - Book studio services online
   - Select date and time
   - Provide service requirements
   - Email confirmation

4. **Testimonials**
   - View client testimonials
   - Rating system (1-5 stars)
   - Client feedback display

5. **Contact Form**
   - Send inquiries to studio
   - Email notifications
   - Message tracking

### 🔐 Admin Features
1. **Secure Dashboard**
   - JWT-based authentication
   - Role-based access control
   - Protected admin routes

2. **Content Management**
   - Upload music/video files
   - Edit metadata (title, artist, category)
   - Delete content
   - Thumbnail management

3. **Package Management**
   - Create service packages
   - Edit pricing and features
   - Manage package categories

4. **Booking Management**
   - View all bookings
   - Track booking details
   - Client information access

5. **Message Management**
   - View contact messages
   - Client inquiry tracking
   - Email integration

6. **Analytics Overview**
   - Total content count
   - Booking statistics
   - Message tracking
   - View counts

### 🤖 Advanced Features
1. **AI Integration**
   - Google Gemini AI for content recommendations
   - Intelligent content categorization
   - Smart search suggestions

2. **Cloud Storage**
   - Cloudinary integration for media files
   - Optimized image/video delivery
   - Automatic thumbnail generation

3. **Email Notifications**
   - Booking confirmations
   - Contact form responses
   - Admin notifications

4. **Real-time Updates**
   - Live view counting
   - Instant content updates
   - Dynamic data refresh

---

## 🌐 Deployed URLs

- **Frontend (User Interface):** `https://your-music-studio.vercel.app`
- **Backend API:** `https://your-music-studio-api.render.com`
- **Admin Dashboard:** `https://your-music-studio.vercel.app/admin`
- **Database:** MongoDB Atlas (Cloud)

> **Note:** Replace with your actual deployment URLs after deployment

---

## 📦 Installation & Setup

### Prerequisites
- Node.js v18 or higher
- npm or yarn package manager
- MongoDB (local) or MongoDB Atlas account
- Git for version control

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd "Music studio-BE"
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create environment file:**
```bash
cp .env.example .env
```

4. **Configure environment variables in `.env`:**
```env
# Database
MONGODB_URI=mongodb://localhost:27017/musicstudio
# or use MongoDB Atlas connection string
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/musicstudio

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random

# Server
PORT=5000
NODE_ENV=development

# Cloudinary (Optional - for file uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Optional - for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# AI (Optional - for AI features)
GEMINI_API_KEY=your_gemini_api_key
```

5. **Run development server:**
```bash
npm run dev
```

6. **Build for production:**
```bash
npm run build
npm start
```

Backend will run on `http://localhost:5000`

---

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd "Music studio-FE/music-studio-fe"
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create environment file:**
```bash
cp .env.example .env
```

4. **Configure environment variables in `.env`:**
```env
VITE_API_URL=http://localhost:5000/api
```

5. **Run development server:**
```bash
npm run dev
```

6. **Build for production:**
```bash
npm run build
npm run preview
```

Frontend will run on `http://localhost:5173`

---

## 🗂️ Project Structure

```
Music Studio/
├── Music studio-BE/              # Backend (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── config/               # Configuration files
│   │   ├── controllers/          # Request handlers
│   │   ├── middleware/           # Custom middleware (auth, upload, etc.)
│   │   ├── models/               # Mongoose schemas
│   │   ├── routes/               # API routes
│   │   ├── utils/                # Utility functions
│   │   └── index.ts              # Entry point
│   ├── .env.example              # Environment template
│   ├── package.json
│   └── tsconfig.json
│
└── Music studio-FE/              # Frontend (React + TypeScript)
    └── music-studio-fe/
        ├── src/
        │   ├── components/       # Reusable components
        │   ├── pages/            # Page components
        │   ├── routes/           # Routing & Redux
        │   │   └── redux/        # Redux store & slices
        │   ├── services/         # API service functions
        │   └── main.tsx          # Entry point
        ├── .env.example          # Environment template
        ├── package.json
        ├── tailwind.config.js    # TailwindCSS config
        └── vite.config.ts        # Vite config
```

---

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (Protected)

### Music
- `GET /api/music` - Get all music/videos
- `GET /api/music/search?keyword=` - Search music
- `POST /api/music/upload` - Upload music (Admin)
- `PUT /api/music/:id` - Update music (Admin)
- `DELETE /api/music/:id` - Delete music (Admin)
- `PUT /api/music/:id/view` - Increment view count

### Packages
- `GET /api/packages` - Get all packages
- `POST /api/packages` - Create package (Admin)
- `PUT /api/packages/:id` - Update package (Admin)
- `DELETE /api/packages/:id` - Delete package (Admin)

### Bookings
- `GET /api/bookings` - Get all bookings (Admin)
- `POST /api/bookings` - Create booking
- `GET /api/bookings/:id` - Get booking by ID

### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `POST /api/testimonials` - Create testimonial (Admin)
- `PUT /api/testimonials/:id` - Update testimonial (Admin)
- `DELETE /api/testimonials/:id` - Delete testimonial (Admin)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact/messages` - Get all messages (Admin)

---

## 📸 Screenshots

### Home Page
*Beautiful landing page with hero section and featured content*

### Music Library
*Browse and play music/video content with search functionality*

### Service Packages
*View studio service packages with pricing and features*

### Admin Dashboard
*Secure admin panel for content management*

### Booking System
*Easy-to-use booking interface for studio services*

> **Note:** Add actual screenshots after deployment

---

## 🚀 Deployment Guide

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

### Quick Deployment Steps

1. **Database:** Set up MongoDB Atlas cluster
2. **Backend:** Deploy to Render.com
3. **Frontend:** Deploy to Vercel.com
4. **Configure:** Set environment variables on each platform
5. **Test:** Verify all features work in production

---

## 🧪 Testing

### Run Backend Tests
```bash
cd "Music studio-BE"
npm test
```

### Run Frontend Tests
```bash
cd "Music studio-FE/music-studio-fe"
npm test
```

---

## 🎓 Academic Project Information

This project was developed as part of the **Rapid Application Development (RAD)** module final coursework.

### Learning Outcomes Demonstrated
- Full-stack web development with MERN + TypeScript
- RESTful API design and implementation
- Secure authentication and authorization
- State management with Redux
- Responsive UI/UX design
- Cloud deployment and DevOps
- AI integration and advanced features

---

## 👨‍💻 Author

**[Your Name]**
- Email: [your.email@example.com]
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- Module Lecturer: Mr. Shamodha Sahan
- Course: Rapid Application Development (RAD)
- Institution: [Your Institution Name]

---

## 📞 Support

For any queries or issues:
- Create an issue on GitHub
- Contact: [your.email@example.com]

---

<div align="center">

**Made with ❤️ using MERN Stack + TypeScript**

⭐ Star this repo if you found it helpful!

</div>
