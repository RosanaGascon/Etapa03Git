const Carrito = require('../models/carritoModel');

// Crear un nuevo carrito o agregar productos al existente
exports.addToCarrito = async (req, res) => {
  const productos = req.body;
  let total = 0;

  // Calculando el total
  productos.forEach(producto => {
    total += producto.precio * producto.cantidad;
  });

  const carrito = new Carrito({
    productos,
    total
  });

  try {
    const nuevoCarrito = await carrito.save();
    res.status(201).json(nuevoCarrito);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
