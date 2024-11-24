import express from "express"; 
import cors from "cors";
import connectDB from "./config/db.js";  // Importación correcta de la función
import carRoutes from "./routes/carRoutes.js"; 

// Inicializar la app
const app = express();

// Conectar a la base de datos
connectDB();  // Llamar la función para conectar a la base de datos

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use("/cars", carRoutes);

// Ruta principal
app.get("/", (req, res) => {
  res.send("¡Servidor corriendo!");
});

// Puerto
const PORT = process.env.PORT || 3002;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
