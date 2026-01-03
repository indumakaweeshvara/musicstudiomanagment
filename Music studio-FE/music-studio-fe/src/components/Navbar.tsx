import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../routes/redux/hooks';

const Navbar: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="glass-dark fixed top-0 left-0 right-0 z-50 animate-slide-down border-b border-white/5">
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="group flex items-center gap-3 hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden shadow-lg group-hover:shadow-purple-500/50 transition-all">
                  <img
                    src="/logo.png"
                    alt="MrIndu Studio"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>

                <div>
                  <h1 className="text-2xl font-black tracking-tight leading-none" style={{ fontFamily: "'Montserrat', 'Poppins', sans-serif", letterSpacing: '-0.02em' }}>
                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
                      Mr
                    </span>
                    <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                      Indu
                    </span>
                    <span className="text-white ml-1.5">Studio</span>
                  </h1>
                  <p className="text-[10px] text-purple-300 font-bold tracking-wider uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Audio Production
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-2">
            <Link
              to="/music"
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${isActive('/music')
                ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/50'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Music
            </Link>
            <Link
              to="/about"
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${isActive('/about')
                ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/50'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              About
            </Link>
            <Link
              to="/hire-me"
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${isActive('/hire-me')
                ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/50'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Services
            </Link>
            <Link
              to="/contact"
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${isActive('/contact')
                ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/50'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Contact
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/booking"
              className="group relative px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/30 overflow-hidden"
            >
              <span className="relative z-10">📅 Book Studio</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            {isAuthenticated ? (
              <Link
                to="/admin/dashboard"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <span className="flex items-center gap-2">
                  <span>⚡</span>
                  Dashboard
                </span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-slate-500/30 transition-all duration-300 border border-white/10"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <span className="flex items-center gap-2">
                  <span>🔐</span>
                  Admin
                </span>
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-2 animate-slide-down">
            <Link
              to="/music"
              className="block px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Music
            </Link>
            <Link
              to="/about"
              className="block px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/hire-me"
              className="block px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="block px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/booking"
              className="block px-4 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              📅 Book Studio
            </Link>
            {isAuthenticated ? (
              <Link
                to="/admin/dashboard"
                className="block px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                ⚡ Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="block px-4 py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white font-bold rounded-xl text-center border border-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                🔐 Admin Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
