import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const RootLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
            <Navbar />
            <main className="pt-20">
                <Outlet />
            </main>
        </div>
    );
};

export default RootLayout;
