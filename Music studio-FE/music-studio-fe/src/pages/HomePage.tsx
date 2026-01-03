import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Kasun Perera",
      role: "Music Artist",
      message: "MrIndu Studio transformed my tracks! The mixing quality is outstanding.",
      rating: 5,
      image: "🎤"
    },
    {
      name: "Nimal Silva",
      role: "Producer",
      message: "Professional service and amazing results. Highly recommended!",
      rating: 5,
      image: "🎵"
    },
    {
      name: "Amaya Fernando",
      role: "Singer",
      message: "Best studio experience ever! The team is incredibly talented.",
      rating: 5,
      image: "🎧"
    }
  ];

  const stats = [
    { value: 500, label: "Tracks Produced", suffix: "+" },
    { value: 200, label: "Happy Clients", suffix: "+" },
    { value: 10, label: "Years Experience", suffix: "+" },
    { value: 247, label: "Support Available", suffix: "" }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Background Image with Parallax */}
      <div className="fixed inset-0 z-0" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
        <img
          src="/images/hero-bg-colorful.png"
          alt="Studio Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-purple-950/85 to-slate-950/85"></div>
      </div>

      {/* Animated Background Orbs */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Floating WhatsApp Button with Pre-filled Message */}
      <a
        href="https://wa.me/94740114451?text=Hi!%20I'm%20interested%20in%20your%20music%20studio%20services.%0A%0AI%20would%20like%20to%20know%20more%20about%3A%0A%E2%9C%85%20Recording%20Sessions%0A%E2%9C%85%20Music%20Production%0A%E2%9C%85%20Mixing%20%26%20Mastering%0A%E2%9C%85%20Custom%20Packages%0A%0APlease%20share%20more%20details%20about%20your%20services%20and%20pricing.%20Thank%20you!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-full flex items-center justify-center text-white text-3xl shadow-2xl hover:shadow-green-500/50 hover:scale-110 transition-all duration-300 animate-bounce group"
        style={{ animationDuration: '2s' }}
      >
        <span className="relative z-10">💬</span>
        <div className="absolute inset-0 bg-green-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </a>

      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto text-center mb-20">
          <div className="mb-8 animate-slide-down">
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/50 rounded-full text-purple-300 font-semibold text-sm backdrop-blur-sm">
              🎵 Professional Music Production
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight leading-none animate-slide-down" style={{ animationDelay: '0.1s' }}>
            Welcome to <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent animate-gradient">
              MrIndu Studio
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-down" style={{ animationDelay: '0.2s' }}>
            Where creativity meets sound. Professional mixing, mastering, and music production services to bring your vision to life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-down" style={{ animationDelay: '0.3s' }}>
            <Link
              to="/booking"
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 overflow-hidden text-lg"
            >
              <span className="relative z-10">🎤 Book Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              to="/music"
              className="px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/10 text-white font-bold rounded-xl hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300 text-lg"
            >
              🎧 Listen to Music
            </Link>
          </div>

          {/* Welcome Studio Showcase Card */}
          <div className="mt-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-purple-500/60 transition-all duration-500 border-2 border-white/10 hover:border-purple-500/50 max-w-5xl mx-auto">
              {/* Main Image */}
              <div className="relative h-[400px] md:h-[500px]">
                <img
                  src="/images/studio-welcome.png"
                  alt="Welcome to MrIndu Studio"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Multi-layer Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-transparent to-pink-900/30"></div>

                {/* Animated Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 animate-pulse"></div>
                </div>

                {/* Shine sweep effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                  <div className="max-w-2xl">
                    {/* Floating Badge */}
                    <div className="inline-flex items-center gap-2 mb-4 px-5 py-2 bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-md rounded-full shadow-lg shadow-purple-500/30 animate-float">
                      <span className="text-2xl">🎵</span>
                      <span className="text-white font-bold text-sm tracking-wide">WELCOME TO OUR STUDIO</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight group-hover:text-purple-200 transition-colors duration-300">
                      Where Your Music
                      <br />
                      <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent animate-gradient">
                        Comes to Life
                      </span>
                    </h3>

                    {/* Description */}
                    <p className="text-lg text-gray-300 mb-6 leading-relaxed group-hover:text-white transition-colors max-w-xl">
                      Step into our professional recording environment with state-of-the-art equipment, perfect acoustics, and creative atmosphere.
                    </p>

                    {/* Features pills */}
                    <div className="flex flex-wrap gap-3">
                      <span className="px-4 py-2 bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full text-purple-300 text-sm font-medium hover:bg-purple-500/30 hover:scale-105 transition-all cursor-default">
                        🎚️ Pro Equipment
                      </span>
                      <span className="px-4 py-2 bg-pink-500/20 backdrop-blur-sm border border-pink-400/30 rounded-full text-pink-300 text-sm font-medium hover:bg-pink-500/30 hover:scale-105 transition-all cursor-default">
                        🎤 Studio Recording
                      </span>
                      <span className="px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium hover:bg-blue-500/30 hover:scale-105 transition-all cursor-default">
                        🎧 Perfect Acoustics
                      </span>
                    </div>
                  </div>
                </div>

                {/* Corner decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 border-t-2 border-r-2 border-purple-400/40 rounded-tr-2xl opacity-60 group-hover:opacity-100 group-hover:border-purple-400/80 transition-all"></div>
                <div className="absolute bottom-4 left-4 w-20 h-20 border-b-2 border-l-2 border-pink-400/40 rounded-bl-2xl opacity-60 group-hover:opacity-100 group-hover:border-pink-400/80 transition-all"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics with Enhanced Animation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass-dark p-6 rounded-2xl border border-white/10 text-center hover-lift group relative overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  {stat.label === "Support Available" ? "24/7" : `${stat.value}${stat.suffix}`}
                </div>
                <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-20 animate-slide-up">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Why Choose <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Us?</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Experience the difference with professional music production
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="glass-dark p-8 rounded-2xl border border-white/10 hover-lift group relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="text-5xl mb-4 animate-float">⚡</div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">Fast Delivery</h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">Quick turnaround without compromising quality</p>
              </div>
            </div>
            <div className="glass-dark p-8 rounded-2xl border border-white/10 hover-lift group relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="text-5xl mb-4 animate-float" style={{ animationDelay: '1s' }}>🎯</div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">Professional Quality</h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">Industry-standard equipment and techniques</p>
              </div>
            </div>
            <div className="glass-dark p-8 rounded-2xl border border-white/10 hover-lift group relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="text-5xl mb-4 animate-float" style={{ animationDelay: '2s' }}>💎</div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Affordable Pricing</h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">Premium services at competitive rates</p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Studio Showcase - New Premium Image Card */}
        <div className="mb-20 animate-slide-up">
          <div className="max-w-6xl mx-auto">
            <div className="group relative overflow-hidden rounded-3xl hover-lift shadow-2xl hover:shadow-purple-500/50 transition-all duration-500">
              {/* Main Image */}
              <div className="relative h-[500px] md:h-[600px]">
                <img
                  src="/images/studio-showcase.png"
                  alt="MrIndu Studio Interior"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent"></div>

                {/* Animated Border Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 animate-pulse blur-xl"></div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                  <div className="max-w-3xl">
                    {/* Badge */}
                    <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-purple-600/80 to-pink-600/80 backdrop-blur-sm rounded-full">
                      <span className="text-white font-semibold text-sm">✨ Premium Studio Experience</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-4 group-hover:text-purple-300 transition-colors">
                      State-of-the-Art <br />
                      <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
                        Recording Studio
                      </span>
                    </h2>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed group-hover:text-white transition-colors">
                      Experience professional music production in our cutting-edge studio equipped with industry-leading technology and acoustic treatment. From recording to mastering, we deliver exceptional quality.
                    </p>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="glass-dark p-4 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all group/card relative overflow-hidden">
                        <img src="/images/feature-mixing.png" alt="Pro Mixing" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover/card:opacity-30 transition-opacity" />
                        <div className="relative z-10">
                          <div className="text-3xl mb-2 group-hover/card:scale-110 transition-transform">🎚️</div>
                          <div className="text-white font-semibold text-sm">Pro Mixing</div>
                        </div>
                      </div>
                      <div className="glass-dark p-4 rounded-xl border border-white/10 hover:border-pink-500/50 transition-all group/card relative overflow-hidden">
                        <img src="/images/feature-vocal.png" alt="Vocal Booth" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover/card:opacity-30 transition-opacity" />
                        <div className="relative z-10">
                          <div className="text-3xl mb-2 group-hover/card:scale-110 transition-transform">🎤</div>
                          <div className="text-white font-semibold text-sm">Vocal Booth</div>
                        </div>
                      </div>
                      <div className="glass-dark p-4 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all group/card relative overflow-hidden">
                        <img src="/images/feature-monitoring.png" alt="Monitoring" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover/card:opacity-30 transition-opacity" />
                        <div className="relative z-10">
                          <div className="text-3xl mb-2 group-hover/card:scale-110 transition-transform">🎧</div>
                          <div className="text-white font-semibold text-sm">Monitoring</div>
                        </div>
                      </div>
                      <div className="glass-dark p-4 rounded-xl border border-white/10 hover:border-green-500/50 transition-all group/card relative overflow-hidden">
                        <img src="/images/feature-delivery.png" alt="Fast Delivery" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover/card:opacity-30 transition-opacity" />
                        <div className="relative z-10">
                          <div className="text-3xl mb-2 group-hover/card:scale-110 transition-transform">⚡</div>
                          <div className="text-white font-semibold text-sm">Fast Delivery</div>
                        </div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link
                      to="/booking"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 group/btn"
                    >
                      <span>🎵 Book Studio Time</span>
                      <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>

                {/* Floating Stats */}
                <div className="absolute top-8 right-8 hidden md:block">
                  <div className="glass-dark p-6 rounded-2xl border border-white/10 backdrop-blur-lg">
                    <div className="text-center">
                      <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">
                        500+
                      </div>
                      <div className="text-gray-300 text-sm">Tracks Produced</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Our <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Professional music production services tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {/* Mixing Service */}
          <div className="glass-dark rounded-3xl border border-white/10 hover-lift group relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-500">
              <img src="/images/mixing-card.png" alt="Mixing" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-slate-950/70"></div>

            <div className="relative p-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-2xl group-hover:shadow-purple-500/50 transition-all duration-300 relative">
                <span className="relative z-10">🎚️</span>
                <div className="absolute inset-0 bg-purple-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">Mixing</h3>
              <p className="text-gray-300 leading-relaxed mb-4 group-hover:text-gray-200 transition-colors">
                Professional audio mixing to balance and enhance your tracks with clarity and depth.
              </p>
              <Link to="/hire-me" className="text-purple-400 font-semibold hover:text-purple-300 hover:scale-105 transition-all inline-flex items-center gap-2 group/link">
                Learn More <span className="group-hover/link:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

          {/* Mastering Service */}
          <div className="glass-dark rounded-3xl border border-white/10 hover-lift group relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-500">
              <img src="/images/mastering-card.png" alt="Mastering" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-slate-950/70"></div>

            <div className="relative p-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-2xl group-hover:shadow-pink-500/50 transition-all duration-300 relative">
                <span className="relative z-10">🎼</span>
                <div className="absolute inset-0 bg-pink-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-pink-300 transition-colors">Mastering</h3>
              <p className="text-gray-300 leading-relaxed mb-4 group-hover:text-gray-200 transition-colors">
                Final polish for your music to sound perfect across all platforms and devices.
              </p>
              <Link to="/hire-me" className="text-pink-400 font-semibold hover:text-pink-300 hover:scale-105 transition-all inline-flex items-center gap-2 group/link">
                Learn More <span className="group-hover/link:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

          {/* Production Service */}
          <div className="glass-dark rounded-3xl border border-white/10 hover-lift group relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-500">
              <img src="/images/production-card.png" alt="Production" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-slate-950/70"></div>

            <div className="relative p-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-2xl group-hover:shadow-blue-500/50 transition-all duration-300 relative">
                <span className="relative z-10">🎹</span>
                <div className="absolute inset-0 bg-blue-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">Production</h3>
              <p className="text-gray-300 leading-relaxed mb-4 group-hover:text-gray-200 transition-colors">
                Full music production services from concept to final track delivery.
              </p>
              <Link to="/hire-me" className="text-blue-400 font-semibold hover:text-blue-300 hover:scale-105 transition-all inline-flex items-center gap-2 group/link">
                Learn More <span className="group-hover/link:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="mb-20 animate-slide-up">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Client <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Testimonials</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              See what our clients say about us
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="glass-dark rounded-3xl p-12 border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 left-0 text-9xl text-purple-500/10 font-serif animate-pulse">"</div>

              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10 text-center">
                <div className="text-6xl mb-6 animate-float">{testimonials[currentTestimonial].image}</div>
                <p className="text-xl text-gray-300 mb-6 italic">
                  "{testimonials[currentTestimonial].message}"
                </p>
                <div className="mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-2xl inline-block animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>⭐</span>
                  ))}
                </div>
                <h4 className="text-xl font-bold text-white">{testimonials[currentTestimonial].name}</h4>
                <p className="text-purple-400">{testimonials[currentTestimonial].role}</p>
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`h-3 rounded-full transition-all duration-300 hover:scale-110 ${index === currentTestimonial ? 'bg-gradient-to-r from-purple-500 to-pink-500 w-8' : 'bg-gray-600 w-3'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Studio Gallery Section */}
        <div className="mb-20 animate-slide-up">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Studio <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Gallery</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Take a look inside our professional music production studio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="group relative overflow-hidden rounded-3xl hover-lift animate-slide-up shadow-lg hover:shadow-purple-500/50 transition-shadow duration-300" style={{ animationDelay: '0.1s' }}>
              <div className="relative h-64">
                <img src="/images/mixing-card.png" alt="Mixing Console" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/60 to-pink-600/60 group-hover:from-purple-600/40 group-hover:to-pink-600/40 transition-all duration-300"></div>
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-2 animate-float group-hover:scale-125 transition-transform">🎚️</div>
                    <h3 className="text-2xl font-bold text-white group-hover:scale-110 transition-transform">Mixing Console</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl hover-lift animate-slide-up shadow-lg hover:shadow-blue-500/50 transition-shadow duration-300" style={{ animationDelay: '0.2s' }}>
              <div className="relative h-64">
                <img src="/images/mastering-card.png" alt="Mastering Suite" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/60 to-cyan-600/60 group-hover:from-blue-600/40 group-hover:to-cyan-600/40 transition-all duration-300"></div>
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-2 animate-float group-hover:scale-125 transition-transform" style={{ animationDelay: '1s' }}>🎼</div>
                    <h3 className="text-2xl font-bold text-white group-hover:scale-110 transition-transform">Mastering Suite</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl hover-lift animate-slide-up shadow-lg hover:shadow-green-500/50 transition-shadow duration-300" style={{ animationDelay: '0.3s' }}>
              <div className="relative h-64">
                <img src="/images/production-card.png" alt="Production Setup" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/60 to-emerald-600/60 group-hover:from-green-600/40 group-hover:to-emerald-600/40 transition-all duration-300"></div>
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-2 animate-float group-hover:scale-125 transition-transform" style={{ animationDelay: '2s' }}>🎹</div>
                    <h3 className="text-2xl font-bold text-white group-hover:scale-110 transition-transform">Production Setup</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl hover-lift animate-slide-up shadow-lg hover:shadow-orange-500/50 transition-shadow duration-300" style={{ animationDelay: '0.4s' }}>
              <div className="relative h-64">
                <img src="/images/equipment-packages.png" alt="Studio Equipment" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/60 to-red-600/60 group-hover:from-orange-600/40 group-hover:to-red-600/40 transition-all duration-300"></div>
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-2 animate-float group-hover:scale-125 transition-transform" style={{ animationDelay: '3s' }}>🎸</div>
                    <h3 className="text-2xl font-bold text-white group-hover:scale-110 transition-transform">Studio Equipment</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl hover-lift animate-slide-up shadow-lg hover:shadow-yellow-500/50 transition-shadow duration-300" style={{ animationDelay: '0.5s' }}>
              <div className="relative h-64">
                <img src="/images/producer-work.png" alt="Producer at Work" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/60 to-amber-600/60 group-hover:from-yellow-600/40 group-hover:to-amber-600/40 transition-all duration-300"></div>
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-2 animate-float group-hover:scale-125 transition-transform" style={{ animationDelay: '4s' }}>🎧</div>
                    <h3 className="text-2xl font-bold text-white group-hover:scale-110 transition-transform">Producer at Work</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl hover-lift animate-slide-up shadow-lg hover:shadow-indigo-500/50 transition-shadow duration-300" style={{ animationDelay: '0.6s' }}>
              <div className="relative h-64">
                <img src="/images/booking-calendar.png" alt="Recording Session" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/60 to-violet-600/60 group-hover:from-indigo-600/40 group-hover:to-violet-600/40 transition-all duration-300"></div>
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-2 animate-float group-hover:scale-125 transition-transform" style={{ animationDelay: '5s' }}>🎤</div>
                    <h3 className="text-2xl font-bold text-white group-hover:scale-110 transition-transform">Recording Session</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action with Enhanced Design */}
        <div className="glass-dark rounded-3xl p-12 border-2 border-white/10 max-w-4xl mx-auto text-center relative overflow-hidden animate-slide-up group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10"></div>
          {/* Animated gradient border */}
          <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-pulse blur-sm"></div>
          </div>
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Ready to Create <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Amazing Music?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's bring your musical vision to life. Book a session today and experience professional music production.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/booking"
                className="group/btn px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 text-lg relative overflow-hidden"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                <span className="relative z-10">🎤 Book a Session</span>
              </Link>
              <Link
                to="/contact"
                className="group/btn px-10 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white font-bold rounded-xl hover:bg-white/20 hover:border-white/30 hover:scale-105 transition-all duration-300 text-lg relative overflow-hidden"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                <span className="relative z-10">💬 Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
