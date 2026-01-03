const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Connect to MongoDB
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/musicstudio';

mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define User schema (simple version for this script)
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

async function updateAdminPassword() {
    try {
        // Find the admin user
        const admin = await User.findOne({ email: 'admin@studio.com' });

        if (!admin) {
            console.log('Admin user not found!');
            process.exit(1);
        }

        console.log('Found admin user:', admin.email);

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('Admin@123', salt);

        console.log('New hashed password:', hashedPassword);

        // Update the password directly
        await User.updateOne(
            { email: 'admin@studio.com' },
            { $set: { password: hashedPassword } }
        );

        console.log('✅ Admin password updated successfully!');
        console.log('You can now login with:');
        console.log('  Email: admin@studio.com');
        console.log('  Password: Admin@123');

        // Verify the update
        const updatedAdmin = await User.findOne({ email: 'admin@studio.com' });
        const isMatch = await bcrypt.compare('Admin@123', updatedAdmin.password);
        console.log('\nPassword verification:', isMatch ? '✅ SUCCESS' : '❌ FAILED');

        process.exit(0);
    } catch (error) {
        console.error('Error updating password:', error);
        process.exit(1);
    }
}

updateAdminPassword();
