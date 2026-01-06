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

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ...
├── pages/               # Page components
│   ├── Home.tsx
│   ├── Music.tsx
│   ├── Packages.tsx
│   ├── Bookings.tsx
│   ├── Contact.tsx
│   ├── Login.tsx
│   └── AdminDashboard.tsx
├── routes/              # Routing configuration
│   ├── redux/           # Redux store
│   │   ├── store.ts
│   │   └── slices/
│   │       └── authSlice.ts
│   └── ProtectedRoute.tsx
├── services/            # API service functions
│   ├── api.ts           # Axios instance
│   ├── music.service.ts
│   ├── package.service.ts
│   ├── booking.service.ts
│   ├── testimonial.service.ts
│   └── contact.service.ts
├── App.tsx              # Main app component
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api

# For production (after backend deployment):
# VITE_API_URL=https://your-backend-api.render.com/api
```

## 🚀 Getting Started

### Prerequisites
- Node.js v18+ installed
- npm or yarn package manager
- Backend API running

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
# Edit .env with your backend API URL
```

3. **Run development server:**
```bash
npm run dev
```

4. **Build for production:**
```bash
npm run build
```

5. **Preview production build:**
```bash
npm run preview
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

### Auth Slice
```typescript
{
  user: {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
  } | null;
  token: string | null;
  isAuthenticated: boolean;
}
```

### Usage Example
```typescript
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials, logout } from './routes/redux/slices/authSlice';

// Get auth state
const { user, isAuthenticated } = useSelector((state) => state.auth);

// Dispatch actions
dispatch(setCredentials({ user, token }));
dispatch(logout());
```

## 🎨 TailwindCSS Configuration

Custom configuration in `tailwind.config.js`:

```javascript
{
  theme: {
    extend: {
      colors: {
        // Custom color palette
      },
      animation: {
        // Custom animations
      }
    }
  }
}
```

### Utility Classes Used
- Responsive grid layouts
- Flexbox utilities
- Gradient backgrounds
- Glassmorphism effects
- Hover animations
- Transition effects

## 📡 API Integration

All API calls are centralized in `services/` directory:

### Example Service
```typescript
// music.service.ts
import api from './api';

export const fetchAllMusic = async () => {
  const response = await api.get('/music');
  return response.data;
};

export const uploadMusic = async (formData: FormData) => {
  const response = await api.post('/music/upload', formData);
  return response.data;
};
```

### Axios Instance
```typescript
// api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 🌐 Deployed URLs

- **Frontend:** https://music-studio-frontend.vercel.app
- **Backend API:** https://music-studio-api.onrender.com
- **Admin Dashboard:** https://music-studio-frontend.vercel.app/admin
- **Database:** MongoDB Atlas (Cloud)

## 🚀 Deployment Guide

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

## 🎨 Styling Guide

### Color Scheme
- **Primary:** Purple gradient (`from-purple-600 to-pink-600`)
- **Background:** Dark slate (`slate-950`)
- **Accent:** Pink/Purple
- **Text:** White/Gray

### Component Patterns
```tsx
// Card with glassmorphism
<div className="glass-dark p-6 rounded-2xl border border-white/10">
  {/* Content */}
</div>

// Gradient button
<button className="bg-gradient-to-r from-purple-600 to-pink-600 
                   text-white px-6 py-3 rounded-xl 
                   hover:shadow-xl transition">
  Click Me
</button>

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Items */}
</div>
```

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Test Coverage
```bash
npm run test:coverage
```

## 📱 Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

All components are fully responsive using TailwindCSS breakpoints.

## 🐛 Troubleshooting

### API Connection Issues
- Check `VITE_API_URL` in `.env`
- Ensure backend is running
- Check CORS settings on backend

### Build Errors
- Clear node_modules and reinstall
- Check TypeScript errors
- Verify all imports

### Styling Issues
- Rebuild TailwindCSS
- Check class names
- Clear browser cache

## 📄 License

MIT License - see LICENSE file for details

## 👨‍💻 Author

[Your Name] - [your.email@example.com]
