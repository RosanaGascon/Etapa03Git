const Carrito = require('../models/carritoModel');
const Producto = require('../models/productoModel');

// Crear un nuevo carrito o agregar productos al existente
exports.addToCarrito = async (req, res) => {
  const productos = req.body;
  let total = 0;

  // Verificación del stock de cada producto
  for (const producto of productos) {
    const productoEnDb = await Producto.findById(producto.productoId);
    if (!productoEnDb || productoEnDb.stock < producto.cantidad) {
      return res.status(400).json({ message: `No hay suficiente stock para el producto: ${producto.nombre}` });
    }
  }

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
