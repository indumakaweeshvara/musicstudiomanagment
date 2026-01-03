import React from 'react';

const AboutPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float"></div>
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 container mx-auto px-6 py-20 max-w-6xl">
                <div className="text-center mb-16 animate-slide-down">
                    <div className="inline-block mb-4">
                        <span className="px-6 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/50 rounded-full text-purple-300 font-semibold text-sm backdrop-blur-sm">
                            👋 ABOUT ME
                        </span>
                    </div>
                    <h1 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tight">
                        Meet <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent">MrIndu</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Passionate music producer and sound engineer transforming creative visions into sonic reality
                    </p>
                </div>

                {/* Producer Image Section */}
                <div className="mb-12 rounded-3xl overflow-hidden animate-slide-up">
                    <div className="relative h-[400px]">
                        <img
                            src="/images/producer-work.png"
                            alt="Producer at Work"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="glass-dark rounded-3xl p-10 border border-white/10 hover-lift group relative overflow-hidden animate-slide-up">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative">
                            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="text-4xl animate-float">📖</span>
                                My Story
                            </h2>
                            <div className="space-y-4 text-gray-300 leading-relaxed">
                                <p>
                                    Welcome to MrIndu Studio, where passion meets precision in music production. With years of experience in mixing, mastering, and audio production, I've helped countless artists bring their musical visions to life.
                                </p>
                                <p>
                                    My journey in music started with a simple love for sound. Over the years, that passion has evolved into a professional studio equipped with state-of-the-art technology and a deep understanding of what makes music truly exceptional.
                                </p>
                                <p>
                                    Whether you're an emerging artist looking to record your first track or an established musician seeking professional mixing and mastering services, I'm here to help you achieve the sound you've been dreaming of.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="glass-dark rounded-2xl p-8 border border-white/10 text-center hover-lift group relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.1s' }}>
                            {/* Background Image */}
                            <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                                <img
                                    src="/images/mixing-card.png"
                                    alt="Mixing"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative">
                                <div className="text-5xl mb-4 animate-float">🎚️</div>
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">Professional Mixing</h3>
                                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Bringing balance and clarity to your tracks</p>
                            </div>
                        </div>
                        <div className="glass-dark rounded-2xl p-8 border border-white/10 text-center hover-lift group relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.2s' }}>
                            {/* Background Image */}
                            <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                                <img
                                    src="/images/mastering-card.png"
                                    alt="Mastering"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative">
                                <div className="text-5xl mb-4 animate-float" style={{ animationDelay: '1s' }}>🎼</div>
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">Expert Mastering</h3>
                                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Final polish for industry-standard sound</p>
                            </div>
                        </div>
                        <div className="glass-dark rounded-2xl p-8 border border-white/10 text-center hover-lift group relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.3s' }}>
                            {/* Background Image */}
                            <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                                <img
                                    src="/images/production-card.png"
                                    alt="Production"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative">
                                <div className="text-5xl mb-4 animate-float" style={{ animationDelay: '2s' }}>🎹</div>
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-green-300 transition-colors">Music Production</h3>
                                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Complete production from start to finish</p>
                            </div>
                        </div>
                    </div>

                    <div className="glass-dark rounded-3xl p-10 border border-white/10 hover-lift group relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.4s' }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative">
                            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="text-4xl animate-float" style={{ animationDelay: '1s' }}>⭐</span>
                                Why Choose MrIndu Studio?
                            </h2>
                            <ul className="space-y-4">
                                {[
                                    'Professional-grade equipment and acoustically treated studio',
                                    'Years of experience in music production and audio engineering',
                                    'Personalized approach to every project',
                                    'Quick turnaround times without compromising quality',
                                    'Affordable pricing for quality services',
                                    'Flexible booking and consultation options',
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 text-gray-300 hover:text-gray-100 transition-colors group/item">
                                        <span className="text-purple-400 text-xl mt-1 group-hover/item:scale-125 transition-transform">✓</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
