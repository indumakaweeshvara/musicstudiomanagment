import React, { useEffect, useState } from 'react';
import { getAllPackages, type IPackage } from '../services/package.service';

const HireMePage: React.FC = () => {
  const [packages, setPackages] = useState<IPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const data = await getAllPackages();
      setPackages(data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { icon: '🎵', number: '500+', label: 'Projects Completed' },
    { icon: '😊', number: '100+', label: 'Happy Clients' },
    { icon: '⭐', number: '4.9/5', label: 'Average Rating' },
    { icon: '🏆', number: '10+', label: 'Years Experience' },
  ];

  const benefits = [
    {
      icon: '💎',
      title: 'Professional Quality',
      description: 'Industry-standard mixing and mastering with top-tier equipment and expertise',
    },
    {
      icon: '⚡',
      title: 'Fast Delivery',
      description: 'Quick turnaround times without compromising on quality',
    },
    {
      icon: '🎯',
      title: 'Tailored Solutions',
      description: 'Customized packages to fit your specific needs and budget',
    },
    {
      icon: '💬',
      title: '24/7 Support',
      description: 'Always available to answer questions and provide updates',
    },
    {
      icon: '🔄',
      title: 'Unlimited Revisions',
      description: 'Work together until you\'re 100% satisfied with the result',
    },
    {
      icon: '🎼',
      title: 'Genre Expertise',
      description: 'Experience across multiple genres from pop to electronic to hip-hop',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Singer-Songwriter',
      image: '/images/testimonial_client_2_1767328794360.png',
      rating: 5,
      text: 'Working with MrIndu was an absolute pleasure! The mixing quality exceeded my expectations and the turnaround was incredibly fast.',
    },
    {
      name: 'Michael Chen',
      role: 'Music Producer',
      image: '/images/testimonial_client_1_1767328771411.png',
      rating: 5,
      text: 'Professional, talented, and easy to work with. My tracks have never sounded better. Highly recommended!',
    },
    {
      name: 'Alex Rivera',
      role: 'DJ & Producer',
      image: '/images/testimonial_client_3_1767328813929.png',
      rating: 5,
      text: 'The attention to detail is incredible. MrIndu understood exactly what I wanted and delivered beyond expectations.',
    },
  ];

  const faqs = [
    {
      question: 'What is included in each package?',
      answer: 'Each package includes professional mixing/mastering, unlimited revisions, and delivery in multiple formats (WAV, MP3). Specific features vary by package tier.',
    },
    {
      question: 'How long does the process take?',
      answer: 'Typical turnaround is 3-7 days depending on the package and project complexity. Rush delivery options are available for urgent projects.',
    },
    {
      question: 'Do you offer revisions?',
      answer: 'Yes! All packages include unlimited revisions until you\'re completely satisfied with the final result.',
    },
    {
      question: 'What file formats do you accept?',
      answer: 'I accept WAV, AIFF, and high-quality MP3 files. For best results, please provide uncompressed audio files at the highest quality available.',
    },
    {
      question: 'Can I get a custom package?',
      answer: 'Absolutely! Contact me to discuss your specific needs and I\'ll create a custom package tailored to your project.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header Image Section */}
        <div className="container mx-auto px-6 py-20">
          <div className="relative mb-12 rounded-3xl overflow-hidden animate-slide-down">
            <div className="relative h-[300px]">
              <img
                src="/images/equipment-packages.png"
                alt="Studio Equipment"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block mb-4">
                    <span className="px-6 py-2 bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/50 rounded-full text-purple-300 font-semibold text-sm backdrop-blur-sm">
                      💼 SERVICES & PACKAGES
                    </span>
                  </div>
                  <h1 className="text-6xl md:text-7xl font-black text-white mb-4 tracking-tight">
                    Hire <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent">MrIndu</span>
                  </h1>
                  <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    Choose the perfect package for your music production needs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="container mx-auto px-6 py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="glass-dark rounded-2xl p-8 text-center border border-white/10 hover-lift animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-5xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-black text-white mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Packages Section */}
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-4">
              Choose Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Package</span>
            </h2>
            <p className="text-gray-400 text-lg">Select the perfect plan for your music production needs</p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
              <p className="text-gray-400 mt-4">Loading packages...</p>
            </div>
          ) : packages.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📦</div>
              <p className="text-xl text-gray-400">No packages available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {packages.map((pkg, index) => {
                // Determine background image based on category
                const categoryImages: Record<string, string> = {
                  'mixing': '/images/mixing-service.png',
                  'mastering': '/images/mastering-service.png',
                  'production': '/images/production-service.png',
                };
                const bgImage = categoryImages[pkg.category] || '/images/production-service.png';

                return (
                  <div
                    key={pkg._id}
                    className="glass-dark rounded-3xl p-8 border border-white/10 hover-lift animate-slide-up relative overflow-hidden group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                      <img
                        src={bgImage}
                        alt={pkg.category}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="mb-6">
                        <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                          {pkg.category === 'mixing' ? '🎚️' : pkg.category === 'mastering' ? '🎼' : '🎹'}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{pkg.name}</h3>
                        <p className="text-gray-400 text-sm mb-4 group-hover:text-gray-300 transition-colors">{pkg.description}</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-black text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">Rs {pkg.price}</span>
                          <span className="text-gray-500 group-hover:text-gray-400 transition-colors">/ {pkg.duration}</span>
                        </div>
                      </div>

                      <div className="space-y-3 mb-8">
                        {pkg.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2 group/item">
                            <span className="text-purple-400 mt-1 group-hover/item:scale-125 transition-transform">✓</span>
                            <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <a
                        href="/booking"
                        className="block w-full text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-xl hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300"
                      >
                        Choose Package
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Why Choose Me Section */}
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-4">
              Why Choose <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Me?</span>
            </h2>
            <p className="text-gray-400 text-lg">What sets my services apart from the rest</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => {
              // Category-specific gradient themes
              const gradients = [
                'from-purple-600/10 to-pink-600/10',      // Professional Quality
                'from-pink-600/10 to-rose-600/10',        // Fast Delivery
                'from-blue-600/10 to-cyan-600/10',        // Tailored Solutions
                'from-green-600/10 to-emerald-600/10',    // 24/7 Support
                'from-orange-600/10 to-amber-600/10',     // Unlimited Revisions
                'from-violet-600/10 to-purple-600/10',    // Genre Expertise
              ];
              const gradient = gradients[index % gradients.length];

              return (
                <div
                  key={index}
                  className="glass-dark rounded-2xl p-8 border border-white/10 hover-lift animate-slide-up group relative overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">{benefit.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">{benefit.title}</h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-4">
              Client <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Testimonials</span>
            </h2>
            <p className="text-gray-400 text-lg">What my clients say about working with me</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="glass-dark rounded-2xl p-8 border border-white/10 hover-lift animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"
                  />
                  <div>
                    <h4 className="text-white font-bold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <p className="text-gray-300 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-4">
              Frequently Asked <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-gray-400 text-lg">Everything you need to know about my services</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="glass-dark rounded-2xl border border-white/10 overflow-hidden animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <span className="text-white font-bold text-lg">{faq.question}</span>
                  <span className="text-purple-400 text-2xl transition-transform duration-300" style={{ transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    ▼
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: openFaq === index ? '500px' : '0',
                    opacity: openFaq === index ? 1 : 0,
                  }}
                >
                  <div className="px-8 pb-6 text-gray-400">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="container mx-auto px-6 py-20">
          <div className="glass-dark rounded-3xl p-12 border border-white/10 text-center max-w-4xl mx-auto animate-scale-in">
            <h2 className="text-5xl font-black text-white mb-6">
              Ready to Elevate Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Music?</span>
            </h2>
            <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto">
              Let's work together to bring your musical vision to life. Choose a package and get started today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/booking"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 text-lg"
              >
                Book Now
              </a>
              <a
                href="/contact"
                className="px-8 py-4 border-2 border-purple-500 text-white font-bold rounded-xl hover:bg-purple-500/10 transition-all duration-300 text-lg"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HireMePage;
