import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const connectToMongoDB = async () => {
    try {
        const uri = process.env.MONGO_DB_URI;

        if (!uri) {
            throw new Error("MongoDB URI is not defined. Please check your .env file.");
        }

        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000, // Increase this value if needed
            socketTimeoutMS: 45000,         // Increase this value if needed
        });

        mongoose.connection.on('connected', () => {
            console.log('Connected to MongoDB');
        });

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err.message);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

export default connectToMongoDB;
