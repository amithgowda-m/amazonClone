const mongoose = require('mongoose');
require('dotenv').config();

async function test() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/amazon_clone');
        console.log("Connected to MongoDB");

        const User = require('./models/User');
        const bcrypt = require('bcryptjs');

        // Try creating a user directly
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("test123", salt);

        const user = new User({
            name: "Amith",
            email: "amith_direct@test.com",
            password: hashedPassword
        });

        const saved = await user.save();
        console.log("User saved successfully:", saved);
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected");
    }
}

test();
