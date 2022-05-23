const express = require('express');
const empresaControlador = require('../controllers/empresaController');
const md_autenticacion = require('../middlewares/autenticacion');
const api = express.Router();

api.post('/agregarEmpresa',md_autenticacion.Auth ,empresaControlador.nuevaEmpresa);// Agregar empresas
api.put('/editarEmpresa/:idEmpresa', md_autenticacion.Auth, empresaControlador.actualizarEmpresa);//editar empresas
api.get('/obtenerEmpresas', md_autenticacion.Auth,empresaControlador.conseguirEmpresa);//obtener empresas
api.delete('/eliminarEmpresa/:idEmpresa', md_autenticacion.Auth, empresaControlador.borrarEmpresa); //eliminar empresas
api.put('/agregarProductosSucursal/:idSucursal/:idProducto', md_autenticacion.Auth, empresaControlador.nuevoProductosSucursal);//agregar productos



module.exports = api;