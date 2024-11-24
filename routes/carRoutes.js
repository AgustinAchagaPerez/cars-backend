import express from 'express';
import Car from '../models/cars.js';

const router = express.Router();

// Crear un nuevo auto
router.post('/', async (req, res) => {
  try {
    const car = new Car(req.body);
    const savedCar = await car.save();
    res.status(201).json(savedCar);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los autos
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un auto por ID
router.get('/:id', async (req, res) => {
  console.log(req.params.id);
  
  try {
    const car = await Car.findById(req.params.id);
    console.log(car);
    console.log("FFFFFF");

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

// Alquilar un auto
router.post('/cars/:id/rent', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (car) {
      if (car.status === 'available') {
        car.status = 'rented';
        const rentedCar = await car.save();
        res.json({ message: 'Auto alquilado', car: rentedCar });
      } else {
        res.status(400).json({ message: 'El auto no está disponible para alquiler' });
      }
    } else {
      res.status(404).json({ message: 'Auto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Comprar un auto
router.post('/cars/:id/purchase', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (car) {
      if (car.status === 'available') {
        car.status = 'sold';
        const soldCar = await car.save();
        res.json({ message: 'Auto comprado', car: soldCar });
      } else {
        res.status(400).json({ message: 'El auto no está disponible para compra' });
      }
    } else {
      res.status(404).json({ message: 'Auto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
