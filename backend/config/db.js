import dotenv from 'dotenv';
import mongoose from 'mongoose'; 
dotenv.config();

const connectDB = async() => {
  const url = process.env.MONGOURL;
    try {
     await mongoose.connect(url);
     console.log("DataBase Connected");
    } catch (error) {
        console.log("Error in connecting database", error.message);
    }
};

export default connectDB;