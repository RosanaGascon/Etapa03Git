const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
  productos: [
    {
      productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
      cantidad: { type: Number, required: true, min: 1 },  // Se asegura de que la cantidad sea un número positivo
    }
  ],
  total: { type: Number, default: 0 }
});

const Carrito = mongoose.model('Carrito', carritoSchema);
module.exports = Carrito;
