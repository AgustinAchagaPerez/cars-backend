import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user'], // 'admin' para administrador y 'user' para usuarios normales
    default: 'user'
  },
  rentedCars: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car'
  }],
  purchasedCars: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car'
  }]
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
