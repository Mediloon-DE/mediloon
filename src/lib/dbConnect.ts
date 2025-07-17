
import mongoose, { Connection } from 'mongoose';


const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please add the MONGODB_URI environment variable inside .env');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectToDB = async (): Promise<Connection> => {
    if (cached.conn) {
      return cached.conn;
    }
  
    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
        maxPoolSize: 10,
      };
  
      cached.promise = mongoose.connect(MONGODB_URI, opts)
        .then((mongoose) => mongoose.connection);
    }
  
    try {
      cached.conn = await cached.promise;
      console.log('Connected to MongoDB');
      return cached.conn;
    } catch (error) {
      cached.promise = null;
      throw new Error(`Failed to connect to MongoDB: ${error instanceof Error ? error.message : String(error)}`);
    }
  };