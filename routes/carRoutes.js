import express from 'express';
import Car from '../models/Car.js';

const router = express.Router();

// Crear un nuevo auto
router.post('/cars', async (req, res) => {
  try {
    const car = new Car(req.body);
    const savedCar = await car.save();
    res.status(201).json(savedCar);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los autos
router.get('/cars', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un auto por ID
router.get('/cars/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ message: 'Auto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un auto
router.put('/cars/:id', async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ message: 'Auto no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un auto
router.delete('/cars/:id', async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (car) {
      res.json({ message: 'Auto eliminado' });
    } else {
      res.status(404).json({ message: 'Auto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
