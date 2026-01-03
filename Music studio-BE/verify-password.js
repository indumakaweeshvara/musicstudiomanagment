const bcrypt = require('bcryptjs');

// The hashed password from your database for admin@studio.com
const hashedPasswordFromDB = '$2b$10$DcOvRnJ4GSCi5uRPTcmmXuQGuaTehVRqv6Tlom01t91/UUSzWVQV.';

// The password you're trying to use
const passwordToTest = 'Admin@123';

// Test if they match
bcrypt.compare(passwordToTest, hashedPasswordFromDB, (err, isMatch) => {
    if (err) {
        console.error('Error:', err);
        return;
    }

    console.log('Password match result:', isMatch);
    console.log(`Does "Admin@123" match the hashed password? ${isMatch ? 'YES' : 'NO'}`);

    // Generate a new hash for Admin@123 if it doesn't match
    if (!isMatch) {
        console.log('\n--- Generating new hash for "Admin@123" ---');
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash('Admin@123', salt, (err, newHash) => {
                console.log('New hash for "Admin@123":', newHash);
                console.log('\nYou need to update the database password to this hash.');
            });
        });
    }
});
