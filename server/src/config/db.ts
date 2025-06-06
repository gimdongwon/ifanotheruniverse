import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '');
    console.log('MongoDB connected successfully');
  } catch (error) {
    if (error instanceof Error) {
      console.error('MongoDB connection failed:', error.message);
    } else {
      console.error('MongoDB connection failed:', error);
    }
    process.exit(1);
  }
};

export default connectDB;
