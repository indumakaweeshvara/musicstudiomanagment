import React, { useState, useEffect } from 'react';
import { fetchAllMusic, uploadMusic, deleteMusic, updateMusic, type IMusic } from '../services/music.service';
import { getAllPackages, createPackage, updatePackage, deletePackage, type IPackage } from '../services/package.service';
import { getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial, type ITestimonial } from '../services/testimonial.service';
import { getAllBookings, approveBooking, rejectBooking, type IBooking } from '../services/booking.service';
import { getAllContacts, type IContact } from '../services/contact.service';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [music, setMusic] = useState<IMusic[]>([]);
  const [packages, setPackages] = useState<IPackage[]>([]);
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(true);

  // Music editing state
  const [editingMusic, setEditingMusic] = useState<IMusic | null>(null);
  const [musicFile, setMusicFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  // Package editing state
  const [editingPackage, setEditingPackage] = useState<IPackage | null>(null);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [packageForm, setPackageForm] = useState({
    name: '',
    price: 0,
    currency: 'LKR',
    duration: '',
    features: [''],
    category: '',
    description: '',
    featured: false,
    popular: false
  });

  // Testimonial editing state
  const [editingTestimonial, setEditingTestimonial] = useState<ITestimonial | null>(null);
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState({
    clientName: '',
    photo: '',
    review: '',
    rating: 5,
    service: '',
    date: new Date().toISOString().split('T')[0],
    featured: false,
    approved: true
  });

  // Toast notification state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [musicData, packagesData, testimonialsData, bookingsData, contactsData] = await Promise.all([
        fetchAllMusic(),
        getAllPackages(),
        getAllTestimonials(),
        getAllBookings(),
        getAllContacts(),
      ]);
      setMusic(musicData);
      setPackages(packagesData);
      setTestimonials(testimonialsData);
      setBookings(bookingsData);
      setContacts(contactsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMusicUpload = async () => {
    if (!musicFile) return;
    const formData = new FormData();
    formData.append('file', musicFile);
    if (thumbnail) formData.append('thumbnail', thumbnail);
    try {
      await uploadMusic(formData);
      fetchData();
      setMusicFile(null);
      setThumbnail(null);
    } catch (error) {
      console.error('Error uploading music:', error);
    }
  };

  const handleMusicDelete = async (id: string) => {
    if (window.confirm('Delete this music?')) {
      try {
        await deleteMusic(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting music:', error);
      }
    }
  };

  const handleUpdate = async () => {
    if (!editingMusic) return;
    const formData = new FormData();
    formData.append('title', editingMusic.title);
    formData.append('artist', editingMusic.artist || '');
    formData.append('category', editingMusic.category);
    if (thumbnail) formData.append('thumbnail', thumbnail);
    try {
      await updateMusic(editingMusic._id, formData);
      fetchData();
      setEditingMusic(null);
      setThumbnail(null);
      showToast('Music updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating music:', error);
      showToast('Failed to update music', 'error');
    }
  };

  // Toast notification helper
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Package CRUD operations
  const handlePackageCreate = async () => {
    try {
      await createPackage(packageForm);
      fetchData();
      setShowPackageModal(false);
      resetPackageForm();
      showToast('Package created successfully!', 'success');
    } catch (error) {
      console.error('Error creating package:', error);
      showToast('Failed to create package', 'error');
    }
  };

  const handlePackageUpdate = async () => {
    if (!editingPackage) return;
    try {
      await updatePackage(editingPackage._id, packageForm);
      fetchData();
      setShowPackageModal(false);
      setEditingPackage(null);
      resetPackageForm();
      showToast('Package updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating package:', error);
      showToast('Failed to update package', 'error');
    }
  };

  const handlePackageDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        await deletePackage(id);
        fetchData();
        showToast('Package deleted successfully!', 'success');
      } catch (error) {
        console.error('Error deleting package:', error);
        showToast('Failed to delete package', 'error');
      }
    }
  };

  const openPackageModal = (pkg?: IPackage) => {
    if (pkg) {
      setEditingPackage(pkg);
      setPackageForm({
        name: pkg.name,
        price: pkg.price,
        currency: pkg.currency,
        duration: pkg.duration,
        features: pkg.features,
        category: pkg.category,
        description: pkg.description || '',
        featured: pkg.featured,
        popular: pkg.popular
      });
    }
    setShowPackageModal(true);
  };

  const resetPackageForm = () => {
    setPackageForm({
      name: '',
      price: 0,
      currency: 'LKR',
      duration: '',
      features: [''],
      category: '',
      description: '',
      featured: false,
      popular: false
    });
    setEditingPackage(null);
  };

  const addFeature = () => {
    setPackageForm({ ...packageForm, features: [...packageForm.features, ''] });
  };

  const removeFeature = (index: number) => {
    const newFeatures = packageForm.features.filter((_, i) => i !== index);
    setPackageForm({ ...packageForm, features: newFeatures });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...packageForm.features];
    newFeatures[index] = value;
    setPackageForm({ ...packageForm, features: newFeatures });
  };

  // Testimonial CRUD operations
  const handleTestimonialCreate = async () => {
    try {
      await createTestimonial(testimonialForm);
      fetchData();
      setShowTestimonialModal(false);
      resetTestimonialForm();
      showToast('Testimonial created successfully!', 'success');
    } catch (error) {
      console.error('Error creating testimonial:', error);
      showToast('Failed to create testimonial', 'error');
    }
  };

  const handleTestimonialUpdate = async () => {
    if (!editingTestimonial) return;
    try {
      await updateTestimonial(editingTestimonial._id, testimonialForm);
      fetchData();
      setShowTestimonialModal(false);
      setEditingTestimonial(null);
      resetTestimonialForm();
      showToast('Testimonial updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating testimonial:', error);
      showToast('Failed to update testimonial', 'error');
    }
  };

  const handleTestimonialDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await deleteTestimonial(id);
        fetchData();
        showToast('Testimonial deleted successfully!', 'success');
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        showToast('Failed to delete testimonial', 'error');
      }
    }
  };

  const handleTestimonialApproval = async (testimonial: ITestimonial) => {
    try {
      await updateTestimonial(testimonial._id, { approved: !testimonial.approved });
      fetchData();
      showToast(`Testimonial ${!testimonial.approved ? 'approved' : 'unapproved'}!`, 'success');
    } catch (error) {
      console.error('Error updating testimonial approval:', error);
      showToast('Failed to update approval status', 'error');
    }
  };

  const openTestimonialModal = (testimonial?: ITestimonial) => {
    if (testimonial) {
      setEditingTestimonial(testimonial);
      setTestimonialForm({
        clientName: testimonial.clientName,
        photo: testimonial.photo,
        review: testimonial.review,
        rating: testimonial.rating,
        service: testimonial.service,
        date: testimonial.date,
        featured: testimonial.featured,
        approved: testimonial.approved
      });
    }
    setShowTestimonialModal(true);
  };

  const resetTestimonialForm = () => {
    setTestimonialForm({
      clientName: '',
      photo: '',
      review: '',
      rating: 5,
      service: '',
      date: new Date().toISOString().split('T')[0],
      featured: false,
      approved: true
    });
    setEditingTestimonial(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden py-8 px-4">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-8 right-8 z-[100] px-6 py-4 rounded-xl shadow-2xl animate-slide-down ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'} text-white font-semibold`}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{toast.type === 'success' ? '✅' : '❌'}</span>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Animated Background Orbs */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="mb-8 animate-slide-down">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-2">
            Admin <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent">Dashboard</span>
          </h1>
          <p className="text-gray-400 text-lg">Manage your music studio platform</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {['overview', 'music', 'packages', 'testimonials', 'bookings', 'messages'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${activeTab === tab
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Enhanced Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-dark p-6 rounded-2xl border border-white/10 hover-lift group relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400 group-hover:text-gray-300 transition-colors">Total Music</span>
                  <span className="text-4xl animate-float">🎵</span>
                </div>
                <p className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">{music.length}</p>
              </div>
            </div>
            <div className="glass-dark p-6 rounded-2xl border border-white/10 hover-lift group relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400 group-hover:text-gray-300 transition-colors">Packages</span>
                  <span className="text-4xl animate-float" style={{ animationDelay: '1s' }}>📦</span>
                </div>
                <p className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">{packages.length}</p>
              </div>
            </div>
            <div className="glass-dark p-6 rounded-2xl border border-white/10 hover-lift group relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400 group-hover:text-gray-300 transition-colors">Bookings</span>
                  <span className="text-4xl animate-float" style={{ animationDelay: '2s' }}>📅</span>
                </div>
                <p className="text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">{bookings.length}</p>
              </div>
            </div>
            <div className="glass-dark p-6 rounded-2xl border border-white/10 hover-lift group relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400 group-hover:text-gray-300 transition-colors">Messages</span>
                  <span className="text-4xl animate-float" style={{ animationDelay: '3s' }}>💬</span>
                </div>
                <p className="text-4xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">{contacts.length}</p>
              </div>
            </div>
          </div>
        )}

        {/* Music Tab */}
        {activeTab === 'music' && (
          <div className="space-y-6">
            <div className="glass-dark p-8 rounded-3xl border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">📤 Upload Music</h2>
              <div className="space-y-4">
                <input
                  type="file"
                  accept="audio/*,video/*"
                  onChange={(e) => setMusicFile(e.target.files ? e.target.files[0] : null)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 text-white file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-purple-600 file:to-pink-600 file:text-white"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setThumbnail(e.target.files ? e.target.files[0] : null)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 text-white file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-purple-600 file:to-pink-600 file:text-white"
                />
                <button
                  onClick={handleMusicUpload}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-xl transition"
                >
                  Upload
                </button>
              </div>
            </div>

            {/* Music List Table */}
            <div className="glass-dark rounded-3xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Title</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Artist</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Category</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Uploaded</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {music.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                          <div className="flex flex-col items-center gap-3">
                            <span className="text-5xl">🎵</span>
                            <p>No music uploaded yet. Upload your first track!</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      music.map((track, index) => (
                        <tr
                          key={track._id}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              {track.thumbnailUrl ? (
                                <img
                                  src={track.thumbnailUrl}
                                  alt={track.title}
                                  className="w-12 h-12 rounded-lg object-cover"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-2xl">
                                  {track.category === 'video' ? '🎬' : '🎵'}
                                </div>
                              )}
                              <div>
                                <p className="text-white font-semibold">{track.title}</p>
                                <p className="text-xs text-gray-500">{track.category === 'video' ? 'Video' : 'Audio'}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-300">{track.artist || 'Unknown Artist'}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${track.category === 'video'
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-purple-500/20 text-purple-400'
                              }`}>
                              {track.category === 'video' ? '🎬 Video' : '🎵 Audio'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-400 text-sm">
                            {new Date(track.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2 justify-end">
                              <button
                                onClick={() => setEditingMusic(track)}
                                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-all hover:scale-105 flex items-center gap-1"
                              >
                                ✏️ Edit
                              </button>
                              <button
                                onClick={() => handleMusicDelete(track._id)}
                                className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-all hover:scale-105 flex items-center gap-1"
                              >
                                🗑️ Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Music Count Footer */}
              {music.length > 0 && (
                <div className="px-6 py-4 bg-white/5 border-t border-white/10">
                  <p className="text-gray-400 text-sm">
                    Total: <span className="text-white font-semibold">{music.length}</span> track{music.length !== 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </div>

            {editingMusic && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="glass-dark p-8 rounded-3xl border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <h2 className="text-2xl font-bold text-white mb-6">Edit Music</h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editingMusic.title}
                      onChange={(e) => setEditingMusic({ ...editingMusic, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 text-white border border-white/10"
                      placeholder="Title"
                    />
                    <input
                      type="text"
                      value={editingMusic.artist || ''}
                      onChange={(e) => setEditingMusic({ ...editingMusic, artist: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 text-white border border-white/10"
                      placeholder="Artist"
                    />
                    <select
                      value={editingMusic.category}
                      onChange={(e) => setEditingMusic({ ...editingMusic, category: e.target.value as 'audio' | 'video' })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 text-white border border-white/10"
                    >
                      <option value="audio">Audio</option>
                      <option value="video">Video</option>
                    </select>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setThumbnail(e.target.files ? e.target.files[0] : null)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 text-white file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-purple-600 file:to-pink-600 file:text-white"
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={handleUpdate}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-xl hover:shadow-xl transition"
                      >
                        💾 Save
                      </button>
                      <button
                        onClick={() => setEditingMusic(null)}
                        className="flex-1 bg-slate-800 text-white font-bold py-3 rounded-xl hover:bg-slate-700 transition"
                      >
                        ✖️ Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Packages Tab */}
        {activeTab === 'packages' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">📦 Packages</h2>
              <button
                onClick={() => {
                  resetPackageForm();
                  setShowPackageModal(true);
                }}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-xl transition"
              >
                ➕ Create Package
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div key={pkg._id} className="glass-dark p-6 rounded-2xl border border-white/10 hover-lift">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-white">{pkg.name}</h3>
                    {pkg.featured && <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">⭐ Featured</span>}
                  </div>
                  <p className="text-purple-400 text-xl mb-2 font-bold">{pkg.currency} {pkg.price}</p>
                  <p className="text-gray-400 text-sm mb-3">⏱️ {pkg.duration}</p>
                  <p className="text-gray-500 text-sm mb-3">{pkg.category}</p>
                  {pkg.description && <p className="text-gray-400 text-sm mb-4">{pkg.description}</p>}
                  <div className="mb-4">
                    <p className="text-gray-400 text-sm mb-2">Features:</p>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {pkg.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx}>✓ {feature}</li>
                      ))}
                      {pkg.features.length > 3 && <li className="text-gray-500">+{pkg.features.length - 3} more...</li>}
                    </ul>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openPackageModal(pkg)}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handlePackageDelete(pkg._id)}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Package Modal */}
            {showPackageModal && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="glass-dark p-8 rounded-3xl border border-white/10 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    {editingPackage ? '✏️ Edit Package' : '➕ Create Package'}
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={packageForm.name}
                        onChange={(e) => setPackageForm({ ...packageForm, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/50 text-white border border-white/10"
                        placeholder="Package Name"
                      />
                      <input
                        type="number"
                        value={packageForm.price}
                        onChange={(e) => setPackageForm({ ...packageForm, price: Number(e.target.value) })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/50 text-white border border-white/10"
                        placeholder="Price"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <select
                        value={packageForm.currency}
                        onChange={(e) => setPackageForm({ ...packageForm, currency: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/50 text-white border border-white/10"
                      >
                        <option value="LKR">LKR</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                      </select>
                      <input
                        type="text"
                        value={packageForm.duration}
                        onChange={(e) => setPackageForm({ ...packageForm, duration: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/50 text-white border border-white/10"
                        placeholder="Duration (e.g., 1 hour)"
                      />
                    </div>
                    <input
                      type="text"
                      value={packageForm.category}
                      onChange={(e) => setPackageForm({ ...packageForm, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 text-white border border-white/10"
                      placeholder="Category (e.g., recording, mixing)"
                    />
                    <textarea
                      value={packageForm.description}
                      onChange={(e) => setPackageForm({ ...packageForm, description: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 text-white border border-white/10"
                      placeholder="Description"
                      rows={3}
                    />

                    {/* Features */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-white font-semibold">Features</label>
                        <button
                          onClick={addFeature}
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition"
                        >
                          ➕ Add Feature
                        </button>
                      </div>
                      <div className="space-y-2">
                        {packageForm.features.map((feature, index) => (
                          <div key={index} className="flex gap-2">
                            <input
                              type="text"
                              value={feature}
                              onChange={(e) => updateFeature(index, e.target.value)}
                              className="flex-1 px-4 py-2 rounded-xl bg-slate-800/50 text-white border border-white/10"
                              placeholder={`Feature ${index + 1}`}
                            />
                            {packageForm.features.length > 1 && (
                              <button
                                onClick={() => removeFeature(index)}
                                className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                              >
                                ✖️
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Toggles */}
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 text-white cursor-pointer">
                        <input
                          type="checkbox"
                          checked={packageForm.featured}
                          onChange={(e) => setPackageForm({ ...packageForm, featured: e.target.checked })}
                          className="w-5 h-5 rounded bg-slate-800/50 border-white/10"
                        />
                        <span>⭐ Featured</span>
                      </label>
                      <label className="flex items-center gap-2 text-white cursor-pointer">
                        <input
                          type="checkbox"
                          checked={packageForm.popular}
                          onChange={(e) => setPackageForm({ ...packageForm, popular: e.target.checked })}
                          className="w-5 h-5 rounded bg-slate-800/50 border-white/10"
                        />
                        <span>🔥 Popular</span>
                      </label>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={editingPackage ? handlePackageUpdate : handlePackageCreate}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-xl hover:shadow-xl transition"
                      >
                        💾 {editingPackage ? 'Update' : 'Create'}
                      </button>
                      <button
                        onClick={() => {
                          setShowPackageModal(false);
                          setEditingPackage(null);
                          resetPackageForm();
                        }}
                        className="flex-1 bg-slate-800 text-white font-bold py-3 rounded-xl hover:bg-slate-700 transition"
                      >
                        ✖️ Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">⭐ Testimonials</h2>
              <button
                onClick={() => {
                  resetTestimonialForm();
                  setShowTestimonialModal(true);
                }}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-xl transition"
              >
                ➕ Create Testimonial
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial._id} className={`glass-dark p-6 rounded-2xl border ${testimonial.approved ? 'border-green-500/30' : 'border-orange-500/30'} hover-lift`}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">{testimonial.clientName}</h3>
                    <div className="flex gap-1">
                      {testimonial.featured && <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">⭐</span>}
                      <span className={`text-xs px-2 py-1 rounded ${testimonial.approved ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                        {testimonial.approved ? '✅' : '⏳'}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-400 mb-2 text-sm">{testimonial.service}</p>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'}>⭐</span>
                    ))}
                    <span className="text-gray-400 text-sm ml-2">{testimonial.rating}/5</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">{testimonial.review}</p>
                  <p className="text-gray-500 text-xs mb-4">📅 {new Date(testimonial.date).toLocaleDateString()}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openTestimonialModal(testimonial)}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleTestimonialApproval(testimonial)}
                      className={`flex-1 px-3 py-2 text-white text-sm rounded-lg transition ${testimonial.approved ? 'bg-orange-600 hover:bg-orange-700' : 'bg-green-600 hover:bg-green-700'}`}
                    >
                      {testimonial.approved ? '❌' : '✅'}
                    </button>
                    <button
                      onClick={() => handleTestimonialDelete(testimonial._id)}
                      className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial Modal */}
            {showTestimonialModal && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="glass-dark p-8 rounded-3xl border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    {editingTestimonial ? '✏️ Edit Testimonial' : '➕ Create Testimonial'}
                  </h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={testimonialForm.clientName}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, clientName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 text-white border border-white/10"
                      placeholder="Client Name"
                    />
                    <input
                      type="text"
                      value={testimonialForm.photo}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, photo: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 text-white border border-white/10"
                      placeholder="Photo URL"
                    />
                    <input
                      type="text"
                      value={testimonialForm.service}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 text-white border border-white/10"
                      placeholder="Service (e.g., Recording Session)"
                    />
                    <textarea
                      value={testimonialForm.review}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, review: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 text-white border border-white/10"
                      placeholder="Review"
                      rows={4}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-white text-sm mb-2 block">Rating</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setTestimonialForm({ ...testimonialForm, rating: star })}
                              className={`text-3xl transition ${star <= testimonialForm.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                            >
                              ⭐
                            </button>
                          ))}
                        </div>
                      </div>
                      <input
                        type="date"
                        value={testimonialForm.date}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/50 text-white border border-white/10"
                      />
                    </div>

                    {/* Toggles */}
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 text-white cursor-pointer">
                        <input
                          type="checkbox"
                          checked={testimonialForm.featured}
                          onChange={(e) => setTestimonialForm({ ...testimonialForm, featured: e.target.checked })}
                          className="w-5 h-5 rounded bg-slate-800/50 border-white/10"
                        />
                        <span>⭐ Featured</span>
                      </label>
                      <label className="flex items-center gap-2 text-white cursor-pointer">
                        <input
                          type="checkbox"
                          checked={testimonialForm.approved}
                          onChange={(e) => setTestimonialForm({ ...testimonialForm, approved: e.target.checked })}
                          className="w-5 h-5 rounded bg-slate-800/50 border-white/10"
                        />
                        <span>✅ Approved</span>
                      </label>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={editingTestimonial ? handleTestimonialUpdate : handleTestimonialCreate}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-xl hover:shadow-xl transition"
                      >
                        💾 {editingTestimonial ? 'Update' : 'Create'}
                      </button>
                      <button
                        onClick={() => {
                          setShowTestimonialModal(false);
                          setEditingTestimonial(null);
                          resetTestimonialForm();
                        }}
                        className="flex-1 bg-slate-800 text-white font-bold py-3 rounded-xl hover:bg-slate-700 transition"
                      >
                        ✖️ Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto">
              <button
                onClick={() => fetchData()}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white font-semibold transition whitespace-nowrap"
              >
                🎯 All ({bookings.length})
              </button>
              <button
                onClick={async () => {
                  const filtered = await getAllBookings('pending');
                  setBookings(filtered);
                }}
                className="px-4 py-2 bg-orange-600/20 hover:bg-orange-600/30 rounded-lg text-orange-300 font-semibold transition whitespace-nowrap"
              >
                🟡 Pending ({bookings.filter(b => b.status === 'pending').length})
              </button>
              <button
                onClick={async () => {
                  const filtered = await getAllBookings('approved');
                  setBookings(filtered);
                }}
                className="px-4 py-2 bg-green-600/20 hover:bg-green-600/30 rounded-lg text-green-300 font-semibold transition whitespace-nowrap"
              >
                ✅ Approved ({bookings.filter(b => b.status === 'approved').length})
              </button>
              <button
                onClick={async () => {
                  const filtered = await getAllBookings('rejected');
                  setBookings(filtered);
                }}
                className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg text-red-300 font-semibold transition whitespace-nowrap"
              >
                ❌ Rejected ({bookings.filter(b => b.status === 'rejected').length})
              </button>
            </div>

            {/* Bookings Table */}
            <div className="glass-dark rounded-3xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Client</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Package/Service</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date & Time</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                          <div className="flex flex-col items-center gap-3">
                            <span className="text-5xl">📅</span>
                            <p>No bookings found</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      bookings.map((booking) => (
                        <tr
                          key={booking._id}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        >
                          {/* Client Info */}
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-white font-semibold">{booking.clientName}</p>
                              <p className="text-sm text-gray-400">{booking.email}</p>
                              <p className="text-xs text-gray-500">{booking.phone}</p>
                            </div>
                          </td>

                          {/* Package/Service */}
                          <td className="px-6 py-4">
                            <div>
                              {booking.packageName ? (
                                <>
                                  <p className="text-purple-400 font-semibold">📦 {booking.packageName}</p>
                                  <p className="text-xs text-gray-500">Package Booking</p>
                                </>
                              ) : (
                                <>
                                  <p className="text-gray-300">{booking.service || 'N/A'}</p>
                                  <p className="text-xs text-gray-500">Custom Service</p>
                                </>
                              )}
                            </div>
                          </td>

                          {/* Date & Time */}
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-white">📅 {new Date(booking.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}</p>
                              <p className="text-sm text-gray-400">⏰ {booking.timeSlot}</p>
                            </div>
                          </td>

                          {/* Status Badge */}
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'pending'
                              ? 'bg-orange-500/20 text-orange-400'
                              : booking.status === 'approved'
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-red-500/20 text-red-400'
                              }`}>
                              {booking.status === 'pending' && '🟡 Pending'}
                              {booking.status === 'approved' && '✅ Approved'}
                              {booking.status === 'rejected' && '❌ Rejected'}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4">
                            <div className="flex gap-2 justify-end">
                              {booking.status === 'pending' && (
                                <>
                                  <button
                                    onClick={async () => {
                                      if (window.confirm(`Approve booking for ${booking.clientName}?`)) {
                                        try {
                                          await approveBooking(booking._id);
                                          showToast('Booking approved successfully!', 'success');
                                          fetchData();
                                        } catch (error) {
                                          showToast('Failed to approve booking', 'error');
                                        }
                                      }
                                    }}
                                    className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition hover:scale-105"
                                  >
                                    ✅ Approve
                                  </button>
                                  <button
                                    onClick={async () => {
                                      if (window.confirm(`Reject booking for ${booking.clientName}?`)) {
                                        try {
                                          await rejectBooking(booking._id);
                                          showToast('Booking rejected', 'success');
                                          fetchData();
                                        } catch (error) {
                                          showToast('Failed to reject booking', 'error');
                                        }
                                      }
                                    }}
                                    className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition hover:scale-105"
                                  >
                                    ❌ Reject
                                  </button>
                                </>
                              )}
                              {booking.status !== 'pending' && (
                                <div className="text-gray-500 text-sm">
                                  {booking.respondedAt && (
                                    <p>Responded: {new Date(booking.respondedAt).toLocaleDateString()}</p>
                                  )}
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footer with count */}
              {bookings.length > 0 && (
                <div className="px-6 py-4 bg-white/5 border-t border-white/10">
                  <p className="text-gray-400 text-sm">
                    Total: <span className="text-white font-semibold">{bookings.length}</span> booking{bookings.length !== 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div key={contact._id} className="glass-dark p-6 rounded-2xl border border-white/10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{contact.name}</h3>
                    <p className="text-gray-400">{contact.email}</p>
                  </div>
                  <span className="text-sm text-gray-500">{new Date(contact.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-300">{contact.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
