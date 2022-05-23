// IMPORTACIONES
const express = require('express');
const productosControlador = require('../controllers/productorController');
const md_autenticacion = require('../middlewares/autenticacion');

// RUTAS
const api = express.Router();

api.get('/productos', md_autenticacion.Auth ,productosControlador.ObtenerProductos);
api.post('/agregarProductos', productosControlador.AgregarProductos);
api.put('/editarProducto/:idProducto', productosControlador.EditarProductos);
api.delete('/eliminarProducto/:idProducto', productosControlador.EliminarProductos);
api.put('/controlStock/:idProducto', productosControlador.stockProducto);
api.get('/producto/:idProducto', productosControlador.ObtenerProductoId)

// PROVEEDOR
api.post('/agregarProveedor', productosControlador.agregarProveedor);
api.put('/agregarProveedorAProducto/:idProducto/:idProveedor', productosControlador.agregarProvedorProducto)
api.get('/buscarProductoXProveedor/:idProveedor', productosControlador.buscarProductoXProveedor)
api.put('/editarProveedorProducto/:idProveedor', productosControlador.editarProveedorProducto)
api.put('/eliminarProveedorProducto/:idProveedor', productosControlador.eliminarProveedorProducto)

module.exports = api;