import mongoose from "mongoose";

// Cache the connection to reuse it across serverless function invocations
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    // If already connected, return the existing connection
    if (cached.conn) {
        return cached.conn;
    }

    // If connection is in progress, wait for it
    if (!cached.promise) {
        const opts = {
            bufferCommands: false, // Disable mongoose buffering for serverless
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
        };

        cached.promise = mongoose.connect(`${process.env.MONGODB_URL}/mern-auth`, opts)
            .then((mongoose) => {
                console.log('Mongoose connected to DB Cluster');
                return mongoose;
            })
            .catch((error) => {
                cached.promise = null; // Reset promise on error so we can retry
                console.error('MongoDB connection error:', error);
                throw error;
            });
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error;
    }

    return cached.conn;
};

export default connectDB;
