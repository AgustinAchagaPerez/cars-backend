import Car from '../models/car.js';
import User from '../models/user.js';

// Agregar un nuevo auto (sólo para administradores)
export const addCar = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado' });
  }

  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar el auto', error });
  }
};

// Eliminar un auto del inventario (sólo para administradores)
export const deleteCar = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado' });
  }

  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Auto no encontrado' });
    }
    res.status(200).json({ message: 'Auto eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el auto', error });
  }
};

// Comprar un auto (para usuarios)
export const purchaseCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car || car.status === 'no disponible' || car.type !== 'compra') {
      return res.status(404).json({ message: 'Auto no disponible para la compra' });
    }

    car.status = 'no disponible';
    await car.save();

    const user = await User.findById(req.user._id);
    user.purchasedCars.push(car._id);
    await user.save();

    res.status(200).json({ message: 'Compra exitosa', car });
  } catch (error) {
    res.status(500).json({ message: 'Error al comprar el auto', error });
  }
};

// Alquilar un auto (para usuarios)
export const rentCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car || car.status === 'no disponible' || car.type !== 'alquiler') {
      return res.status(404).json({ message: 'Auto no disponible para alquiler' });
    }

    car.status = 'no disponible';
    await car.save();

    const user = await User.findById(req.user._id);
    user.rentedCars.push(car._id);
    await user.save();

    res.status(200).json({ message: 'Alquiler exitoso', car });
  } catch (error) {
    res.status(500).json({ message: 'Error al alquilar el auto', error });
  }
};
