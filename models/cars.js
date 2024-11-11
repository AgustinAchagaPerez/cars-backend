import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['available', 'rented', 'sold'], // Mejora en los estados
    default: 'available' 
  },
  type: { type: String, enum: ['compra', 'alquiler'], required: true },
  description: { type: String },
  imageUrl: { type: String }
});

const Car = mongoose.model('Car', carSchema);

export default Car;
