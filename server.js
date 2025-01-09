const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const productoRoutes = require('./routes/productoRoutes');
const carritoRoutes = require('./routes/carritoRoutes');

dotenv.config();

// Conectar a la base de datos MongoDB usando el string de conexión de .env
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conexión exitosa a MongoDB");
  })
  .catch((err) => {
    console.log("Error de conexión a MongoDB:", err);
  });

const app = express();
app.use(cors());
app.use(express.json()); // Para recibir JSON

// Servir archivos estáticos (por ejemplo, index.html)
app.use(express.static(path.join(__dirname, 'views')));

// Rutas para productos y carrito
app.use('/api/productos', productoRoutes);
app.use('/api/carrito', carritoRoutes);

// Ruta para manejar errores 404
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Iniciar el servidor
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
