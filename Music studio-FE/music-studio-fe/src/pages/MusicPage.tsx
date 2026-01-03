import React, { useEffect, useState } from 'react';
import { fetchAllMusic, type IMusic } from '../services/music.service';

const MusicPage: React.FC = () => {
  const [music, setMusic] = useState<IMusic[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'audio' | 'video'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<IMusic | null>(null);

  useEffect(() => {
    fetchMusic();
  }, []);

  const fetchMusic = async () => {
    try {
      const data = await fetchAllMusic();
      setMusic(data);
    } catch (error) {
      console.error('Error fetching music:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMusic = music
    .filter((m) => filter === 'all' || m.category === filter)
    .filter((m) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.artist?.toLowerCase() ?? '').includes(searchQuery.toLowerCase())
    );

  const studioPhotos = [
    '/images/studio_photo_1_1767329619650.png',
    '/images/studio_photo_2_1767329635834.png',
    '/images/music-workspace.png',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Premium Banner Section with Studio Photos */}
        <div className="container mx-auto px-6 py-12">
          <div className="relative mb-12 rounded-3xl overflow-hidden animate-slide-down">
            <div className="relative h-[250px]">
              {/* Studio Photos Grid */}
              <div className="grid grid-cols-3 h-full gap-2">
                {studioPhotos.map((photo, index) => (
                  <div key={index} className="relative overflow-hidden">
                    <img
                      src={photo}
                      alt={`Studio ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block mb-3">
                    <span className="px-6 py-2 bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/50 rounded-full text-purple-300 font-semibold text-sm backdrop-blur-sm">
                      🎵 MUSIC LIBRARY
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">
                    My <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent">Music</span>
                  </h1>
                  <p className="text-base text-gray-300 max-w-2xl mx-auto">
                    Explore my latest tracks, productions, and collaborations
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Premium Search Bar */}
          <div className="max-w-2xl mx-auto mb-8 animate-slide-down" style={{ animationDelay: '0.1s' }}>
            <div className="relative group">
              {/* Gradient glow effect on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity"></div>

              <div className="relative">
                {/* Search Icon */}
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-purple-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <input
                  type="text"
                  placeholder="Search by song name or artist..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-14 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all backdrop-blur-lg group-hover:border-purple-500/50 group-hover:bg-white/10"
                />

                {/* Clear Button */}
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition-all hover:scale-110"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Animated underline effect */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-4 mb-12 animate-slide-down" style={{ animationDelay: '0.2s' }}>
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${filter === 'all'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
            >
              All ({music.length})
            </button>
            <button
              onClick={() => setFilter('audio')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${filter === 'audio'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
            >
              🎵 Audio ({music.filter((m) => m.category === 'audio').length})
            </button>
            <button
              onClick={() => setFilter('video')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${filter === 'video'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
            >
              🎬 Video ({music.filter((m) => m.category === 'video').length})
            </button>
          </div>

          {/* Results Count */}
          {searchQuery && (
            <div className="text-center mb-6">
              <p className="text-gray-400">
                Found <span className="text-purple-400 font-bold">{filteredMusic.length}</span> result{filteredMusic.length !== 1 ? 's' : ''} for "{searchQuery}"
              </p>
            </div>
          )}
        </div>

        {/* Music Grid - 6 columns */}
        <div className="container mx-auto px-6 pb-20">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
              <p className="text-gray-400 mt-4">Loading music...</p>
            </div>
          ) : filteredMusic.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎵</div>
              <p className="text-xl text-gray-400">
                {searchQuery ? `No music found for "${searchQuery}"` : 'No music found'}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 max-w-[1600px] mx-auto">
              {filteredMusic.map((track, index) => {
                // Dynamic gradient colors for visual variety
                const gradients = [
                  'from-purple-600 via-pink-600 to-red-600',
                  'from-blue-600 via-purple-600 to-pink-600',
                  'from-cyan-600 via-blue-600 to-purple-600',
                  'from-pink-600 via-rose-600 to-orange-600',
                  'from-indigo-600 via-purple-600 to-pink-600',
                  'from-violet-600 via-fuchsia-600 to-pink-600',
                ];

                const gradientClass = gradients[index % gradients.length];

                // Default thumbnails for tracks without custom thumbnails (12 varieties)
                const defaultThumbnails = [
                  '/images/music_thumbnail_1_1767346735936.png',
                  '/images/music_thumbnail_2_1767346754526.png',
                  '/images/music_thumbnail_3_1767346774408.png',
                  '/images/music_thumbnail_4_1767346796079.png',
                  '/images/music_thumbnail_5_1767346813349.png',
                  '/images/music_thumbnail_6_1767346832090.png',
                  '/images/music_thumbnail_7_1767347376411.png',
                  '/images/music_thumbnail_8_1767347415289.png',
                  '/images/music_thumbnail_9_1767347464316.png',
                  '/images/music_thumbnail_10_1767347499977.png',
                  '/images/music_thumbnail_11_1767347568652.png',
                  '/images/music_thumbnail_12_1767347600056.png',
                ];
                const defaultThumbnail = defaultThumbnails[index % defaultThumbnails.length];

                return (
                  <div
                    key={track._id}
                    onClick={() => setSelectedTrack(track)}
                    className="glass-dark rounded-2xl overflow-hidden border border-white/10 hover-lift group animate-slide-up cursor-pointer"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className={`relative aspect-square bg-gradient-to-br ${gradientClass} overflow-hidden`}>
                      {track.thumbnailUrl || defaultThumbnail ? (
                        <img
                          src={track.thumbnailUrl || defaultThumbnail}
                          alt={track.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-4 relative">
                          {/* Decorative corner accents */}
                          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/30 rounded-tl-lg"></div>
                          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/30 rounded-tr-lg"></div>
                          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/30 rounded-bl-lg"></div>
                          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/30 rounded-br-lg"></div>

                          {/* Floating musical notes decoration */}
                          <div className="absolute top-2 left-2 text-white/20 text-xl animate-float">♪</div>
                          <div className="absolute top-4 right-3 text-white/20 text-sm animate-float" style={{ animationDelay: '1s' }}>♫</div>
                          <div className="absolute bottom-3 left-3 text-white/20 text-lg animate-float" style={{ animationDelay: '2s' }}>♬</div>

                          {/* Large Icon with glow */}
                          <div className="text-6xl mb-3 animate-float relative">
                            <div className="absolute inset-0 blur-xl opacity-50">
                              {track.category === 'video' ? '🎬' : '🎵'}
                            </div>
                            <div className="relative">
                              {track.category === 'video' ? '🎬' : '🎵'}
                            </div>
                          </div>

                          {/* Track Title on Card */}
                          <h3 className="text-white font-bold text-center text-sm line-clamp-2 mb-1 relative z-10">
                            {track.title}
                          </h3>
                          <p className="text-white/80 text-xs text-center line-clamp-1 relative z-10">
                            {track.artist}
                          </p>

                          {/* Pulsing glow effect */}
                          <div className="absolute inset-0 bg-white/5 rounded-lg animate-pulse" style={{ animationDuration: '3s' }}></div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                      {/* Shine effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl border-2 border-white/30 group-hover:scale-110 transition-transform">
                          <span className="text-white text-3xl ml-1">▶</span>
                        </div>
                      </div>

                      {/* Category Badge with glow */}
                      <div className="absolute top-2 right-2">
                        <span className="inline-block px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-xs font-semibold text-white border border-white/20 shadow-lg">
                          {track.category === 'video' ? '🎬 VIDEO' : '🎵 AUDIO'}
                        </span>
                      </div>

                      {/* View Count Badge with animation */}
                      <div className="absolute bottom-2 left-2">
                        <span className="inline-block px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-xs font-semibold text-white border border-white/20 flex items-center gap-1 shadow-lg group-hover:scale-105 transition-transform">
                          👁️ {track.views}
                        </span>
                      </div>
                    </div>

                    {/* Always show title/artist below the image */}
                    <div className="p-3">
                      <h3 className="text-sm font-bold text-white mb-1 line-clamp-1">{track.title}</h3>
                      <p className="text-xs text-gray-400 line-clamp-1">{track.artist || 'Unknown Artist'}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Modal for Playing Music/Video */}
      {selectedTrack && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedTrack(null)}
        >
          <div
            className="glass-dark rounded-3xl p-6 max-w-2xl w-full border border-white/10 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-black text-white mb-1">{selectedTrack.title}</h2>
                <p className="text-gray-400 text-base">{selectedTrack.artist}</p>
              </div>
              <button
                onClick={() => setSelectedTrack(null)}
                className="text-gray-400 hover:text-white text-2xl transition-colors"
              >
                ✕
              </button>
            </div>

            {selectedTrack.category === 'audio' ? (
              <div className="space-y-4">
                {selectedTrack.thumbnailUrl && (
                  <img
                    src={selectedTrack.thumbnailUrl}
                    alt={selectedTrack.title}
                    className="w-full h-48 object-cover rounded-2xl"
                  />
                )}
                <audio controls className="w-full" autoPlay>
                  <source src={selectedTrack.fileUrl} type="audio/mpeg" />
                </audio>
              </div>
            ) : (
              <video
                controls
                autoPlay
                className="w-full rounded-2xl max-h-[60vh]"
                preload="metadata"
              >
                <source src={selectedTrack.fileUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="px-3 py-1.5 bg-purple-600/20 border border-purple-500/50 rounded-full text-purple-300 text-xs font-semibold">
                  {selectedTrack.category.toUpperCase()}
                </span>
                <span className="text-gray-400 text-sm flex items-center gap-2">
                  👁️ {selectedTrack.views} views
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicPage;
