import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to DB Cluster');
        });

        await mongoose.connect(`${process.env.MONGODB_URL}/mern-auth`);        
    } catch (error) {
        console.error(error);
    }
};

export default connectDB;
