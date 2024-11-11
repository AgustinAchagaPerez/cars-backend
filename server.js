import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import carRoutes from './routes/carRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config(); //carga las variables de entorno desde el archivo .env

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para manejar JSON
app.use(bodyParser.json());

// Rutas para manejar las operaciones CRUD de autos
app.use('/api', carRoutes);

// Conexión a MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Conectado a MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => console.error('Error de conexión a MongoDB:', error));
