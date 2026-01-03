import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RootLayout from './RootLayout';
import HomePage from '../pages/HomePage';
import MusicPage from '../pages/MusicPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import HireMePage from '../pages/HireMePage';
import BookingPage from '../pages/BookingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AdminDashboard from '../pages/AdminDashboard';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<RootLayout />}>
                <Route index element={<HomePage />} />
                <Route path="music" element={<MusicPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="hire-me" element={<HireMePage />} />
                <Route path="booking" element={<BookingPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route
                    path="admin/dashboard"
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
