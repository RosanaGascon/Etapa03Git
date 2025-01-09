const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Obtener todos los productos
router.get('/', productoController.getProductos);

// Agregar un nuevo producto
router.post('/', productoController.createProducto);

module.exports = router;
