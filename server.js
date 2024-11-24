import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import carRoutes from './routes/carRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para manejar JSON
app.use(bodyParser.json());

app.use(cors());
//app.listen(3002, ()=>console.log("server is running"))

// Rutas para manejar las operaciones CRUD de autos y usuarios
app.use('/cars', carRoutes); 
//app.use('/', userRoutes);


// Conexión a MongoDB Atlas 
mongoose
  .connect(process.env.MONGOURI)
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => console.error('Error de conexión a MongoDB:', error));
