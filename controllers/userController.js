import User from '../models/user.js';

// Crear un nuevo usuario
export const createUser = async (req, res) => {
  try {
    console.log('Creando usuario con los datos:', req.body);  
    const user = new User(req.body);
    const savedUser = await user.save();
    console.log('Usuario creado:', savedUser);  
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error al crear usuario:", error);  
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log('Usuarios obtenidos:', users);  
    res.json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);  
    res.status(500).json({ error: error.message });
  }
};

// Obtener un usuario por ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      console.log('Usuario encontrado:', user);  
      res.json(user);
    } else {
      console.log('Usuario no encontrado con ID:', req.params.id);  
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error);  
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (user) {
      console.log('Usuario actualizado:', user);  
      res.json(user);
    } else {
      console.log('Usuario no encontrado para actualizar con ID:', req.params.id);  
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error("Error al actualizar usuario:", error);  
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      console.log('Usuario eliminado:', user);  
      res.json({ message: 'Usuario eliminado' });
    } else {
      console.log('Usuario no encontrado para eliminar con ID:', req.params.id);  
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error("Error al eliminar usuario:", error);  
    res.status(500).json({ error: error.message });
  }
};
