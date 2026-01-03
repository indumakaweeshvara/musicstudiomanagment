const mongoose = require('mongoose');
const Package = require('./dist/models/Package').default;

// MongoDB connection
const MONGODB_URI = 'mongodb://localhost:27017/music-studio';

const packages = [
    {
        name: 'Basic Recording',
        price: 15000,
        currency: 'LKR',
        duration: '2 hours',
        features: [
            'Professional recording session',
            'Basic mixing included',
            'High-quality audio files',
            'Studio engineer support',
            'One revision included'
        ],
        category: 'recording',
        description: 'Perfect for solo artists and beginners looking to record their first tracks professionally.',
        featured: false,
        popular: false
    },
    {
        name: 'Pro Mixing & Mastering',
        price: 25000,
        currency: 'LKR',
        duration: '1 track',
        features: [
            'Professional mixing service',
            'Audio mastering included',
            'Unlimited revisions',
            'Stem delivery available',
            'Radio-ready quality',
            'Fast 3-day turnaround'
        ],
        category: 'mixing',
        description: 'Transform your raw recordings into polished, professional tracks ready for release.',
        featured: true,
        popular: true
    },
    {
        name: 'Full Production Package',
        price: 50000,
        currency: 'LKR',
        duration: '1 song',
        features: [
            'Complete song production',
            'Recording, mixing & mastering',
            'Beat production included',
            'Vocal tuning & editing',
            'Unlimited studio time',
            'Professional arrangement',
            'Distribution ready files'
        ],
        category: 'production',
        description: 'Complete music production from concept to final master. Perfect for serious artists.',
        featured: true,
        popular: true
    },
    {
        name: 'Album Package',
        price: 200000,
        currency: 'LKR',
        duration: '10 tracks',
        features: [
            'Full album production',
            'Recording for 10 songs',
            'Professional mixing & mastering',
            'Beat production available',
            'Album artwork consultation',
            'Priority scheduling',
            'Dedicated project manager',
            'Distribution support'
        ],
        category: 'album',
        description: 'Complete album production package with premium support and priority service.',
        featured: false,
        popular: false
    }
];

async function addPackages() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ MongoDB Connected!');

        // Clear existing packages (optional)
        // await Package.deleteMany({});
        // console.log('🗑️ Cleared existing packages');

        // Add new packages
        const result = await Package.insertMany(packages);
        console.log(`✅ Successfully added ${result.length} packages!`);

        result.forEach(pkg => {
            console.log(`   📦 ${pkg.name} - ${pkg.currency} ${pkg.price}`);
        });

        await mongoose.connection.close();
        console.log('\n✅ Database connection closed');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

addPackages();
