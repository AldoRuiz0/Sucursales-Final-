const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt')
const res = require('express/lib/response');
const Sucursales = require('../models/sucursales.model')


function nuevoSucursal(req, res) {
    const parametros = req.body;
    const rolEmpresa = req.user.rol;
    const modeloSucursal = new Sucursales();

    if (rolEmpresa == 'Empresa') {

        modeloSucursal.nombre = parametros.nombre;
        modeloSucursal.direccion = parametros.direccion;
        modeloSucursal.idEmpresa = req.user.sub;


        modeloSucursal.save((err, sucursalGuardada) => {
            if (err) return res.status(500)
                .send({ mensaje: 'Hubo un error en la peticion' })
            if (!sucursalGuardada) return res.status(500)
                .send({ mensaje: 'error al intentar crear una nueva sucursal D:' })
            return res.status(200)
                .send({ sucursal: sucursalGuardada })
        })

    } else {
        return res.status(500)
            .send({ mensaje: 'Unicamente las EMPRESAS pueden añadir Sucursales :D' })
    }

}

function borrarSucursal(req, res) {
    const parametros = req.body;
    const idSucursal = req.params.idSucursal;
    const rolEmpresa = req.user.rol;
    const idEmpresaa = req.user.sub;

    Sucursales.findOne({ idEmpresa: idEmpresaa }, (err, sucursalEncontrada) => {
        if (sucursalEncontrada) {
            Sucursales.findByIdAndDelete({ _id: idSucursal }, (err, sucursalEliminada) => {

                if (err) return res.status(500)
                    .send({ mensaje: 'Hubo un error en la peticion' })
                if (!sucursalEliminada) return res.status(500)
                    .send({ mensaje: 'error al intentar quebrarse la sucursal D:' })
                return res.status(200)
                    .send({ sucursal: sucursalEliminada })

            })

        } else {
            return res.status(500)
                .send({ mensaje: 'Su Empresa no puede eliminar sucursales de otras EMPRESAS UnU' })
        }
    })



}

function conseguirSucursales(req, res) {
    const idSucursal = req.params.idSucursal;
    const idEmpresaa = req.user.sub;

    Sucursales.find({ idEmpresa: idEmpresaa }, (err, sucursalesEncontradas) => {
        if (err) return res.status(500)
            .send({ mensaje: 'Hubo un error en la peticion' })
        if (!sucursalesEncontradas) return res.status(500)
            .send({ mensaje: 'error al intentar buscar y conseguir la sucursal D:' })
        return res.status(200)
            .send({ sucursales: sucursalesEncontradas })
    })


}

function actualizarSucursal(req, res) {
    const parametros = req.body;
    const rolEmpresa = req.user.rol;
    const idEmpresaa = req.user.sub;
    const idSucursal = req.params.idSucursal;

    if (rolEmpresa == 'Empresa') {
        Sucursales.findOne({ idEmpresa: idEmpresaa }, (err, sucursalEncontrada) => {
            if (err) return res.status(500)
                .send({ mensaje: 'Hubo un error en la peticion' })

            if (sucursalEncontrada) {
                Sucursales.findByIdAndUpdate(idSucursal, parametros, { new: true }, (err, sucursalEditada) => {
                    if (err) return res.status(500)
                        .send({ mensaje: 'Hubo un error en la peticion' })
                    if (!sucursalEditada) return res.status(500)
                        .send({ mensaje: 'error al intentar actualizar su sucursal D:' })

                    return res.status(200)
                        .send({ sucursal: sucursalEditada })


                })
            } else {
                return res.status(500)
                    .send({ mensaje: 'Unicamente puede actualizar las sucursales de su EMPRESA :D' })
            }



        })


    } else {
        return res.status(500)
            .send({ mensaje: 'Unicamente las EMPRESAS pueden actualizar sucursales :D' })

    }
}

function ObtenerSucursalId(req, res) {
    const idSucursal = req.params.idSucursal;

    Sucursales.findById(idSucursal, (err, sucursalEncontrada) => {
        if (err) return res.status(500)
            .send({ mensaje: 'Error en la peticion' });
        if (!sucursalEncontrada) return res.status(500)
            .send({ mensaje: 'No se pudo conseguir el producto D:' });

        return res.status(200)
            .send({ sucursal: sucursalEncontrada })
    })
}

function generarVenta(req, res) {
    const idProducto = req.params.idProducto
    const idEmpresa = req.user.sub;
    const parametros = req.body;
    const idSucursal = req.params.idSucursal;
    Sucursales.aggregate([
        {
            $match: { "_id": mongoose.Types.ObjectId(idSucursal) }
        },
        {
            $unwind: "$productos"
        },
        {
            $match: { "productos._id": mongoose.Types.ObjectId(idProducto) }
        },
        {
            $group: {
                "_id": "$_id",
                "nombre": { "$first": "$nombre" },
                "productos": { $push: "$productos" }
            }
        }
    ]).exec((err, productosEncontrados) => {

        if (productosEncontrados[0].productos[0].stock < parametros.stock) {
            return res.status(500)
                .send({ mensaje: 'No se encuentra lo sufuciente en el stok :(' })
        } else {
            Sucursales.updateOne({ "productos._id": idProducto }, { $inc: { "productos.$.stock": -parametros.stock } }, { new: true }, (err, productosActualizados) => {

                if (err) return res.status(500)
                    .send({ mensaje: 'Hubo un error en la peticion' })
                if (!productosActualizados) return res.status(500)
                    .send({ mensaje: 'error al intentar actualizar el producto D:' })

                return res.status(200)
                    .send({ producto: productosActualizados })

            })
        }



    })




}

module.exports = {
    conseguirSucursales,
    borrarSucursal,
    actualizarSucursal,
    nuevoSucursal,
    ObtenerSucursalId,
    generarVenta
}