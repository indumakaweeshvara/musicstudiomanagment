# 🎵 Music Studio - Frontend

React + TypeScript frontend for the Music Studio platform.

## 🚀 Tech Stack

- **React 19** - UI library with latest features
- **TypeScript** - Type-safe development
- **Redux Toolkit** - State management
- **TailwindCSS** - Utility-first CSS
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Vite** - Build tool and dev server


### Prerequisites
- Node.js v18+ installed
- npm or yarn package manager
- Backend API running

### Installation

1. **Install dependencies:**
```bash
npm install
```

Application will run on `http://localhost:5173`

## 🎨 Features

### User Interface
- **Home Page** - Hero section with featured content
- **Music Library** - Browse and play audio/video content
- **Packages** - View studio service packages
- **Bookings** - Book studio services
- **Contact** - Contact form
- **Testimonials** - Client reviews

### Admin Interface
- **Dashboard** - Overview statistics
- **Music Management** - Upload, edit, delete music
- **Package Management** - Manage service packages
- **Booking Management** - View all bookings
- **Message Management** - View contact messages

### UI/UX Features
- ✨ Modern, responsive design
- 🎨 Beautiful animations and transitions
- 📱 Mobile-first approach
- 🌙 Dark theme with glassmorphism
- ⚡ Fast page loads with Vite
- 🔄 Smooth navigation with React Router

## 🔐 Authentication Flow

1. **Login** - User enters credentials
2. **Token Storage** - JWT stored in Redux state
3. **Protected Routes** - Admin routes require authentication
4. **Auto-redirect** - Unauthorized users redirected to login

## 📦 Redux State Management

