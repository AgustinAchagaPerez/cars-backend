import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ['available', 'rented', 'sold'], default: 'available' },
  type: { type: String, enum: ['compra', 'alquiler'], required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const Car = mongoose.model('Car', carSchema);

export default Car;
