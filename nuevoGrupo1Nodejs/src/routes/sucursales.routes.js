const express = require('express');
const sucursalesControlador = require('../controllers/sucursalesController');
const md_autenticacion = require('../middlewares/autenticacion');
const api = express.Router();


api.post('/agregarSucursal', md_autenticacion.Auth, sucursalesControlador.nuevoSucursal);
api.put('/editarSucursal/:idSucursal', md_autenticacion.Auth, sucursalesControlador.actualizarSucursal);
api.get('/obtenerSucursales', md_autenticacion.Auth,sucursalesControlador.conseguirSucursales);
api.delete('/eliminarSucursales/:idSucursal', md_autenticacion.Auth, sucursalesControlador.borrarSucursal); 
api.get('/obtenerSucursal/:idSucursal', md_autenticacion.Auth,sucursalesControlador.ObtenerSucursalId);
api.put('/generarVenta/:idProducto/:idSucursal', md_autenticacion.Auth, sucursalesControlador.generarVenta)

module.exports = api;