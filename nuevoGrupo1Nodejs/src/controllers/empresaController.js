const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt')
const res = require('express/lib/response');
const Empresa = require('../models/empresa.model')
const Usuario = require('../models/usuario.model')
const Sucursales = require('../models/sucursales.model')


function nuevaEmpresa(req, res) {
    const parametros = req.body;
    const modeloEmpresa = new Empresa();

    if (req.user.rol == 'Administrador') {
        bcrypt.hash(parametros.password, null, null, (err, passwordEncryptada) => {


            modeloEmpresa.nombre = parametros.nombre;
            modeloEmpresa.direccion = parametros.direccion;
            modeloEmpresa.descripcion = parametros.descripcion;
            modeloEmpresa.rol = 'Empresa';

            modeloEmpresa.password = passwordEncryptada
            modeloEmpresa.save((err, empresaGuardada) => {
                if (err) return res.status(500)
                    .send({ mensaje: 'Hubo un error en la peticion' })
                if (!empresaGuardada) return res.status(500)
                    .send({ mensaje: 'error al intentar crear una nueva Empresa D:' })

                return res.status(200).send({ empresa: empresaGuardada })
            })
        })






    } else {
        return res.status(500)
            .send({ mensaje: 'Unicamente los ADMIN pueden agregar empresas' })
    }



}


function borrarEmpresa(req, res) {
    const idEmpresa = req.params.idEmpresa;

    if (req.user.rol == 'Administrador') {
        Empresa.findByIdAndDelete({ _id: idEmpresa }, (err, empresaEliminada) => {
            if (err) return res.status(500)
                .send({ mensaje: 'Hubo un error en la peticion' });
            if (!empresaEliminada) return res.status(500)
                .send({ mensaje: 'No se logro borrar la empresa D:' });

            return res.status(200)
                .send({ empresa: empresaEliminada })
        })
    } else {
        return res.status(500)
            .send({ mensaje: 'Unicamente los ADMIN pueden eliminar las empresaw :D' })
    }

}


function conseguirEmpresa(req, res) {
    rol = req.user.rol;

    if (rol == 'Administrador') {

        Empresa.find({}, (err, empresaEncontradas) => {
            if (err) return res.status(500)
                .send({ mensaje: 'Hubo un error en la peticion' })
            if (!empresaEncontradas) return res.status(500)
                .send({ mensaje: 'no se pudo conseguir la empresa D:' })

            return res.status(200)
                .send({ empresa: empresaEncontradas })
        })



    } else {
        Empresa.find({ _id: req.user.sub }, (err, empresaEncontradas) => {
            if (err) return res.status(500)
                .send({ mensaje: 'Hubo un error en la peticion' })
            if (!empresaEncontradas) return res.status(500)
                .send({ mensaje: 'no se pudo conseguir la empesa D:' })
            return res.status(200)
                .send({ empresa: empresaEncontradas })
        })
    }



}




function actualizarEmpresa(req, res) {
    const parametros = req.body;
    const idEmpresa = req.params.idEmpresa;
    if (req.user.rol = 'Administrador') {

        Empresa.findByIdAndUpdate(idEmpresa, parametros, { new: true }, (err, empresaActualizada) => {
            if (err) return res.status(500)
                .send({ mensaje: 'Hubo en la peticion' });
            if (!empresaActualizada) res.status(500)
                .send({ mensaje: 'error a intentar actalizar la empresa D:' })

            return res.status(200)
                .send({ empresa: empresaActualizada })
        })

    } else {
        return res.status(500)
            .send({ mensaje: 'Uniucamente los ADMIN pueden actalizar las empresas :D' })
    }
}

function nuevoProductosSucursal(req, res) {
    const parametros = req.body;
    const idSucursal = req.params.idSucursal;
    const idUsuario = req.user.rol;
    const idProducto = req.params.idProducto;
    if (idUsuario == 'Empresa') {
        Sucursales.findByIdAndUpdate(idSucursal, { $push: { productos: { nombreProducto: parametros.nombreProducto, precioProducto: parametros.precioProducto, stock: parametros.stock } } }, { new: true }, (err, productoAgregado) => {

            Empresa.updateOne({ "productos._id": idProducto }, { $inc: { "productos.$.stock": -parametros.stock } }, { new: true }, (err, empresaActualizada) => {
                if (err) return res.status(500)
                    .send({ mensaje: 'Hubo un error en la peticion' })
                if (!empresaActualizada) return res.status(500)
                    .send({ mensaje: 'error al actualizar el stok(almacen de la empresa UnU)' })
            })


            if (err) return res.status(500)
                .send({ mensaje: 'Hubo un error en la peticion' })
            if (!productoAgregado) return res.status(500)
                .send({ mensaje: 'error al intentar actualizae la sucursal D:' })
            return res.status(200).send({ producto: productoAgregado })
        })


    } else {


        return res.status(500)
            .send({ mensaje: 'Unicamente las EMPRESAS tienen permiso de agregar nuevos productos :D' })

    }


}


module.exports = {
    nuevoProductosSucursal,
    nuevaEmpresa,
    actualizarEmpresa,
    borrarEmpresa,
    conseguirEmpresa

}