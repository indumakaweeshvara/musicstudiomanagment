import React, { useState } from 'react';
import axios from 'axios';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            await axios.post('http://localhost:5000/api/contact', formData);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setSubmitStatus('error');
            console.error('Error submitting contact form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float"></div>
                <div className="absolute top-1/2 right-0 w-96 h-96 bg-pink-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float" style={{ animationDelay: '4s' }}></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-20 max-w-7xl">
                <div className="text-center mb-20 animate-slide-down relative">
                    <div className="absolute -inset-x-8 -inset-y-12 -z-10 rounded-3xl overflow-hidden">
                        <img
                            src="/music-banner-bg.png"
                            alt="Contact Banner"
                            className="w-full h-full object-cover opacity-15"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-purple-950/60 to-slate-950/90"></div>
                    </div>

                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute top-8 left-8 text-5xl opacity-15 animate-float">🎵</div>
                        <div className="absolute top-16 right-16 text-4xl opacity-12 animate-float" style={{ animationDelay: '1s' }}>🎤</div>
                        <div className="absolute bottom-8 left-1/4 text-4xl opacity-10 animate-float" style={{ animationDelay: '2s' }}>🎧</div>
                        <div className="absolute top-1/2 right-12 text-4xl opacity-12 animate-float" style={{ animationDelay: '1.5s' }}>🎹</div>
                    </div>

                    <div className="inline-block mb-4">
                        <span className="px-6 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/50 rounded-full text-purple-300 font-semibold text-sm backdrop-blur-sm">
                            GET IN TOUCH
                        </span>
                    </div>
                    <h1 className="text-7xl md:text-8xl font-black text-white mb-6 tracking-tight">
                        Let's Create <br />
                        <span className="gradient-text-vibrant">Together</span>
                    </h1>
                    <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
                        Have a vision? Let's bring it to life. Drop me a message and I'll get back to you within 24 hours.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    <div className="space-y-8">
                        <div className="glass-dark rounded-3xl p-8 border-2 border-green-500/30 backdrop-blur-xl hover-lift group relative overflow-hidden animate-slide-up">
                            {/* Animated gradient border effect */}
                            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 animate-pulse blur-sm"></div>
                            </div>

                            <div className="absolute inset-0 opacity-5 group-hover:opacity-8 transition-opacity">
                                <img
                                    src="/studio-microphone.png"
                                    alt=""
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                    }}
                                />
                            </div>

                            {/* Multiple floating gradient orbs */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl animate-float"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>

                            <div className="relative flex items-start gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 overflow-hidden relative">
                                        {/* Glow effect on hover */}
                                        <div className="absolute inset-0 bg-green-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <img
                                            src="/whatsapp-icon.png"
                                            alt="WhatsApp"
                                            className="w-full h-full object-cover rounded-2xl relative z-10"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.outerHTML = '<div class="w-20 h-20 bg-green-500 rounded-2xl flex items-center justify-center"><span class="text-4xl">💬</span></div>';
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-white font-bold text-2xl mb-2 flex items-center gap-2">
                                        WhatsApp
                                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full animate-pulse">FASTEST</span>
                                    </h3>
                                    <p className="text-gray-400 mb-2">Get instant response - Available 24/7</p>
                                    <p className="text-green-400 text-sm mb-4 flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                        Online Now
                                    </p>
                                    <a
                                        href="https://wa.me/94740114451?text=Hi!%20I'm%20interested%20in%20your%20music%20studio%20services.%0A%0AI%20would%20like%20to%20know%20more%20about%3A%0A%E2%9C%85%20Recording%20Sessions%0A%E2%9C%85%20Music%20Production%0A%E2%9C%85%20Mixing%20%26%20Mastering%0A%E2%9C%85%20Custom%20Packages%0A%0APlease%20share%20more%20details%20about%20your%20services%20and%20pricing.%20Thank%20you!"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-6 py-3 rounded-full hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 shadow-lg relative overflow-hidden group/btn"
                                    >
                                        {/* Shine effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                                        <span className="relative z-10 flex items-center gap-2">
                                            💬 Chat Now
                                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="glass-dark rounded-3xl p-8 border border-white/10 backdrop-blur-xl hover-lift group relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.1s' }}>
                            <div className="absolute inset-0 opacity-5 group-hover:opacity-8 transition-opacity">
                                <img
                                    src="/studio-headphones.png"
                                    alt=""
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                    }}
                                />
                            </div>
                            {/* Hover glow effect */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative flex items-start gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-blue-500/50 transition-all duration-300 overflow-hidden">
                                        <img src="/phone-icon.png" alt="Phone" className="w-full h-full object-contain p-2" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-white font-bold text-xl mb-2">Phone</h3>
                                    <p className="text-gray-400 mb-3">Call me directly</p>
                                    <a
                                        href="tel:+94740114451"
                                        className="text-blue-400 font-bold text-lg hover:text-blue-300 hover:scale-105 transition-all flex items-center gap-2 group/link"
                                    >
                                        +94 74 011 4451
                                        <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="glass-dark rounded-3xl p-8 border border-white/10 backdrop-blur-xl hover-lift group relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.2s' }}>
                            {/* Hover glow effect */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="flex items-start gap-6 relative">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-purple-500/50 transition-all duration-300 overflow-hidden">
                                        <img src="/email-icon.png" alt="Email" className="w-full h-full object-contain p-2" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-white font-bold text-xl mb-2">Email</h3>
                                    <p className="text-gray-400 mb-3">Send me an email anytime</p>
                                    <a
                                        href="mailto:indumakawee4@gmail.com"
                                        className="text-purple-400 font-bold text-base hover:text-purple-300 hover:scale-105 transition-all break-all flex items-center gap-2 group/link"
                                    >
                                        indumakawee4@gmail.com
                                        <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="glass-dark rounded-3xl p-8 border border-white/10 backdrop-blur-xl hover-lift group relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.3s' }}>
                            {/* Hover glow effect */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="flex items-start gap-6 relative">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-orange-500/50 transition-all duration-300 overflow-hidden">
                                        <img src="/hours-icon.png" alt="Hours" className="w-full h-full object-contain p-2" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-white font-bold text-xl mb-4">Studio Hours</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between items-center hover:bg-white/5 p-2 rounded-lg transition-colors">
                                            <span className="text-gray-400">Monday - Friday</span>
                                            <span className="text-white font-semibold">9:00 AM - 8:00 PM</span>
                                        </div>
                                        <div className="flex justify-between items-center hover:bg-white/5 p-2 rounded-lg transition-colors">
                                            <span className="text-gray-400">Saturday</span>
                                            <span className="text-white font-semibold">10:00 AM - 6:00 PM</span>
                                        </div>
                                        <div className="flex justify-between items-center hover:bg-white/5 p-2 rounded-lg transition-colors">
                                            <span className="text-gray-400">Sunday</span>
                                            <span className="text-orange-400 font-semibold">By Appointment</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="glass-dark rounded-3xl p-8 border border-white/10 backdrop-blur-xl hover-lift group relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.4s' }}>
                            {/* Hover glow effect */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="flex items-start gap-6 relative">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 group-hover:shadow-teal-500/50 transition-all duration-300">
                                        📍
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-white font-bold text-xl mb-2">Studio Location</h3>
                                    <p className="text-gray-400 mb-3">Visit my professional recording studio</p>
                                    <p className="text-teal-400 font-semibold text-lg">Sri Lanka</p>
                                    <p className="text-gray-500 text-sm mt-2">📧 Email for exact address and directions</p>
                                </div>
                            </div>
                        </div>
                        <div className="glass-dark rounded-3xl p-8 border border-white/10 backdrop-blur-xl animate-slide-up" style={{ animationDelay: '0.5s' }}>
                            <h3 className="text-white font-bold text-2xl mb-6 flex items-center gap-3">
                                <span className="text-3xl animate-float">🌟</span>
                                Connect With Me
                            </h3>
                            <p className="text-gray-400 mb-6">Follow me on social media for updates, behind-the-scenes content, and more!</p>
                            <div className="grid grid-cols-3 gap-4">
                                <a
                                    href="https://facebook.com/YourMusicStudioPage"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative bg-slate-900/80 hover:bg-slate-800/80 border-2 border-blue-500/30 hover:border-blue-400/60 rounded-2xl p-6 flex flex-col items-center justify-center hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 shadow-lg backdrop-blur-sm"
                                    title="Follow on Facebook"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <img
                                        src="/facebook-icon.png"
                                        alt="Facebook"
                                        className="w-12 h-12 object-contain mb-2 relative z-10 group-hover:scale-110 transition-transform"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.outerHTML = '<span class="text-4xl mb-2">📘</span>';
                                        }}
                                    />
                                    <span className="text-white font-semibold text-sm relative z-10">Facebook</span>
                                </a>
                                <a
                                    href="https://instagram.com/yourusername"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative bg-slate-900/80 hover:bg-slate-800/80 border-2 border-pink-500/30 hover:border-pink-400/60 rounded-2xl p-6 flex flex-col items-center justify-center hover:scale-105 hover:shadow-xl hover:shadow-pink-500/30 transition-all duration-300 shadow-lg backdrop-blur-sm"
                                    title="Follow on Instagram"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <img
                                        src="/instagram-icon.png"
                                        alt="Instagram"
                                        className="w-12 h-12 object-contain mb-2 relative z-10 group-hover:scale-110 transition-transform"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.outerHTML = '<span class="text-4xl mb-2">📸</span>';
                                        }}
                                    />
                                    <span className="text-white font-semibold text-sm relative z-10">Instagram</span>
                                </a>
                                <a
                                    href="https://tiktok.com/@yourusername"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative bg-slate-900/80 hover:bg-slate-800/80 border-2 border-cyan-500/30 hover:border-cyan-400/60 rounded-2xl p-6 flex flex-col items-center justify-center hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 shadow-lg backdrop-blur-sm"
                                    title="Follow on TikTok"
                                >
                                    <div className="absolute inset-0 bg-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <img
                                        src="/tiktok-icon.png"
                                        alt="TikTok"
                                        className="w-12 h-12 object-contain mb-2 relative z-10 group-hover:scale-110 transition-transform"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.outerHTML = '<span class="text-4xl mb-2">🎵</span>';
                                        }}
                                    />
                                    <span className="text-white font-semibold text-sm relative z-10">TikTok</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="glass-dark rounded-3xl p-10 border border-white/10 backdrop-blur-xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        <h2 className="text-3xl font-bold text-white mb-2">Send a Message</h2>
                        <p className="text-gray-400 mb-8">Fill out the form below and I'll respond as soon as possible.</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 backdrop-blur-sm text-white placeholder-gray-500 border border-white/10 focus:border-purple-500 focus:outline-none transition"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 backdrop-blur-sm text-white placeholder-gray-500 border border-white/10 focus:border-purple-500 focus:outline-none transition"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 backdrop-blur-sm text-white placeholder-gray-500 border border-white/10 focus:border-purple-500 focus:outline-none transition resize-none"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-xl hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Sending...' : '🚀 Send Message'}
                            </button>

                            {submitStatus === 'success' && (
                                <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-xl text-green-400 text-center">
                                    ✓ Message sent successfully! I'll get back to you soon.
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-center">
                                    ✗ Failed to send message. Please try again or contact via WhatsApp.
                                </div>
                            )}
                        </form>

                        <div className="mt-8 p-6 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                            <h4 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                                <span>⚡</span>
                                Quick Response Time
                            </h4>
                            <p className="text-gray-400 text-sm mb-4">
                                I typically respond within 2-4 hours during business hours. For urgent inquiries, reach out via WhatsApp for immediate assistance.
                            </p>
                            <div className="flex items-center gap-2 text-sm text-purple-300">
                                <span className="text-lg">✓</span>
                                <span>Professional consultation available</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
