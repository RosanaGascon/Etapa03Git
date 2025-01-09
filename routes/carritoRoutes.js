const express = require('express');
const router = express.Router();
const Carrito = require('../models/carritoModel');

// Ruta para vaciar el carrito
router.delete('/', async (req, res) => {
  try {
    await Carrito.deleteMany(); // Vacía la colección
    res.status(200).json({ message: 'Carrito vaciado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al vaciar el carrito' });
  }
});

module.exports = router;
