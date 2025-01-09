const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

router.get('/', productoController.getProductos);
router.post('/', productoController.createProducto);
router.delete('/:id', productoController.deleteProducto); // Ruta para eliminar producto por ID

module.exports = router;
