//Importamos las dependencias necesarias
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';

//Creamos la aplicación Express
const app = express();

//Middleware para parsear JSON
app.use(express.json());

//Conectamos a la base de datos MongoDB
connectDB();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Rutas de posts
app.use('/api/posts', postRoutes);

// Rutas de usuarios
app.use('/api/users', userRoutes);
