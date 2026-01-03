// Simple script to add packages via API
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
    const API_URL = 'http://localhost:5000/api/packages';

    console.log('🚀 Starting to add packages...\n');

    for (const pkg of packages) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pkg)
            });

            if (response.ok) {
                const data = await response.json();
                console.log(`✅ Added: ${pkg.name} - ${pkg.currency} ${pkg.price}`);
            } else {
                const error = await response.text();
                console.log(`❌ Failed to add ${pkg.name}: ${error}`);
            }
        } catch (error) {
            console.error(`❌ Error adding ${pkg.name}:`, error.message);
        }
    }

    console.log('\n✅ Finished adding packages!');
}

addPackages();
