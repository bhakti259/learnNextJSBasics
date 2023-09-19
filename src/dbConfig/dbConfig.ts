import mongoose from "mongoose";

export async function connect() {
  try {
    const mongoUri = process.env.MONGO_URI!; // Retrieve MongoDB URI from environment variable
    mongoose.connect(mongoUri);
    const connection = mongoose.connection;
    connection.on('connected', () => {
        console.log('Mongo db connected successfully');
    })
    connection.on('error', (err) => {
        console.log('Mongo db connection err', err);
    })
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
