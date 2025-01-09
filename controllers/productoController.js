const Producto = require('../models/productoModel');

// Obtener todos los productos
exports.getProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Agregar un nuevo producto
exports.createProducto = async (req, res) => {
  const { nombre, descripcion, precio, stock } = req.body;

  // Verificar si el stock es válido
  if (stock === undefined || stock < 0) {
    return res.status(400).json({ message: 'Stock debe ser un número válido.' });
  }

  const producto = new Producto({
    nombre,
    descripcion,
    precio,
    stock,
  });

  try {
    const nuevoProducto = await producto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Ruta para procesar el carrito de compras
exports.procesarCarrito = async (req, res) => {
  const carrito = req.body;

  // Mostrar los productos en el carrito en la consola del servidor
  console.log('Carrito recibido:', carrito);

  // Opcional: Guardar en la base de datos o en un archivo, según sea necesario
  // Aquí se podría implementar la lógica para almacenar la información

  res.json({ message: 'Carrito procesado correctamente' });
};
