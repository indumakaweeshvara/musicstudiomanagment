const mongoose = require('mongoose');

// MongoDB connection
const MONGODB_URI = 'mongodb://localhost:27017/musicstudio';

// Define Package Schema inline
const PackageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: 'LKR' },
    duration: { type: String, required: true },
    features: { type: [String], required: true },
    category: { type: String, required: true },
    description: { type: String },
    featured: { type: Boolean, default: false },
    popular: { type: Boolean, default: false }
}, { timestamps: true });

const Package = mongoose.model('Package', PackageSchema);

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
        category: 'Recording',
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
        category: 'Mixing',
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
        category: 'Full Production',
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
        category: 'Other',
        description: 'Complete album production package with premium support and priority service.',
        featured: false,
        popular: false
    }
];

async function addPackages() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ MongoDB Connected!\n');

        console.log('📦 Adding packages...\n');

        for (const pkg of packages) {
            const result = await Package.create(pkg);
            console.log(`✅ Added: ${result.name} - ${result.currency} ${result.price}`);
        }

        console.log('\n🎉 Successfully added all packages!');

        await mongoose.connection.close();
        console.log('👋 Database connection closed\n');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

addPackages();
