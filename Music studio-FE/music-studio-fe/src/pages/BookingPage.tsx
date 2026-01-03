import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAllPackages, type IPackage } from '../services/package.service';

const BookingPage: React.FC = () => {
    const [packages, setPackages] = useState<IPackage[]>([]);
    const [loadingPackages, setLoadingPackages] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        packageId: '',
        packageName: '',
        date: '',
        time: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            const packagesData = await getAllPackages();
            setPackages(packagesData);
        } catch (error) {
            console.error('Error fetching packages:', error);
        } finally {
            setLoadingPackages(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const bookingPayload = {
                clientName: formData.name,
                email: formData.email,
                phone: formData.phone,
                packageId: formData.packageId || undefined,
                packageName: formData.packageName || undefined,
                date: formData.date,
                timeSlot: formData.time,
                message: formData.message,
            };
            await axios.post('http://localhost:5000/api/bookings', bookingPayload);
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                packageId: '',
                packageName: '',
                date: '',
                time: '',
                message: '',
            });
        } catch (error) {
            setSubmitStatus('error');
            console.error('Error submitting booking:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Handle package selection specially
        if (name === 'packageId') {
            const selectedPkg = packages.find(pkg => pkg._id === value);
            setFormData({
                ...formData,
                packageId: value,
                packageName: selectedPkg?.name || ''
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float"></div>
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-red-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 container mx-auto px-6 py-20 max-w-5xl">
                {/* Header Image Section */}
                <div className="relative mb-12 rounded-3xl overflow-hidden animate-slide-down">
                    <div className="relative h-[250px]">
                        <img
                            src="/images/booking-calendar.png"
                            alt="Studio Booking"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <div className="inline-block mb-4">
                                    <span className="px-6 py-2 bg-gradient-to-r from-orange-600/30 to-red-600/30 border border-orange-500/50 rounded-full text-orange-300 font-semibold text-sm backdrop-blur-sm">
                                        📅 BOOK YOUR SESSION
                                    </span>
                                </div>
                                <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
                                    Reserve Your <span className="bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent">Studio Time</span>
                                </h1>
                                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                                    Fill out the form below and I'll confirm your booking within 24 hours
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="glass-dark rounded-3xl p-10 border border-white/10 backdrop-blur-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-2">Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 backdrop-blur-sm text-white placeholder-gray-500 border border-white/10 focus:border-orange-500 focus:outline-none transition"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-2">Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 backdrop-blur-sm text-white placeholder-gray-500 border border-white/10 focus:border-orange-500 focus:outline-none transition"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-2">Phone *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 backdrop-blur-sm text-white placeholder-gray-500 border border-white/10 focus:border-orange-500 focus:outline-none transition"
                                    placeholder="+94 XX XXX XXXX"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-2">Package *</label>
                                <select
                                    name="packageId"
                                    value={formData.packageId}
                                    onChange={handleChange}
                                    required
                                    disabled={loadingPackages}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 backdrop-blur-sm text-white border border-white/10 focus:border-orange-500 focus:outline-none transition disabled:opacity-50"
                                >
                                    <option value="">{loadingPackages ? 'Loading packages...' : 'Select a package'}</option>
                                    {packages.map((pkg) => (
                                        <option key={pkg._id} value={pkg._id}>
                                            {pkg.name} - Rs {pkg.price} ({pkg.duration})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-2">Preferred Date *</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 backdrop-blur-sm text-white border border-white/10 focus:border-orange-500 focus:outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-2">Preferred Time *</label>
                                <input
                                    type="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 backdrop-blur-sm text-white border border-white/10 focus:border-orange-500 focus:outline-none transition"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-300 mb-2">Additional Details</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 backdrop-blur-sm text-white placeholder-gray-500 border border-white/10 focus:border-orange-500 focus:outline-none transition resize-none"
                                placeholder="Tell me more about your project..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold py-4 rounded-xl hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Submitting...' : '📅 Book Studio Time'}
                        </button>

                        {submitStatus === 'success' && (
                            <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-xl text-green-400 text-center">
                                ✓ Booking request sent successfully! I'll confirm your session soon.
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-center">
                                ✗ Failed to submit booking. Please try again or contact via WhatsApp.
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
