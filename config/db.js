import mongoose from "mongoose";
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Salir del proceso si hay un error
  }
};

export default connectDB;

