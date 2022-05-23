const Usuario = require('../models/usuario.model');
const Empresa = require('../models/empresa.model')
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');


function UsuarioDefault(req, res) {
    var modeloUsuario = new Usuario();
    Usuario.find({ email: "SuperAdministrador@yahoo.com", nombre: "SuperAdmin" }, (err, usuarioEncontrado) => {
        if (usuarioEncontrado.length > 0) {
            console.log({ mensaje: "ADMINISTRADOR YA CREADO :d" })
        } else {
            modeloUsuario.nombre = "SuperAdmin";
            modeloUsuario.email = "SuperAdministrador@yahoo.com";
            modeloUsuario.password = "123456";
            modeloUsuario.rol = "Administrador";
            bcrypt.hash(modeloUsuario.password, null, null, (err, passwordEncryptada) => {
                modeloUsuario.password = passwordEncryptada
                modeloUsuario.save((err, usuarioGuardado) => {


                    if (err) console.log({ mensaje: 'error en la peticion ' })
                    if (!usuarioGuardado) console.log({ mensaje: 'error al intentar crear al USER que viene por defecto D: ' })
                    console.log({ Usuario: usuarioGuardado })

                })
            })
        }
    })

}

function Login(req, res) {
    var parametros = req.body;

    Usuario.findOne({ nombre : parametros.nombre }, (err, usuarioEncontrado) => {
        if(err) return res.status(500)
                .send({ mensaje: 'Error en la peticion'});
        if (usuarioEncontrado){
            bcrypt.compare(parametros.password, usuarioEncontrado.password, 
                (err, verificacionPassword) => {//TRUE OR FALSE
                    if (verificacionPassword) {
                        if(parametros.obtenerToken == 'true'){
                            return res.status(200)
                    .send({ token: jwt.crearToken(usuarioEncontrado) })
                        } else {
                            usuarioEncontrado.password = undefined;

                            return res.status(200)
                        .send({ usuario: usuarioEncontrado })
                        }                       
                    } else {
                        return res.status(500)
                            .send({ mensaje: 'La contraseña no es correcta >:( .'})
                    }
                })
        } else {
            Empresa.findOne({nombre: parametros.nombre }, (err, empresaEncontrado) => {
                if(err) return res.status(500)
                                .send({ mensaje: 'Error en la peticion'});
                if (empresaEncontrado){


                    bcrypt.compare(parametros.password, empresaEncontrado.password, 
                        (err, verificacionPassword) => {//TRUE OR FALSE
                            if (verificacionPassword) {
                                if(parametros.obtenerToken == 'true'){
                                    return res.status(200)
                                        .send({ token: jwt.crearToken(empresaEncontrado) })
                                } else {
                                    empresaEncontrado.password = undefined;
        
                                    return res.status(200)
                                            .send({ empresa: empresaEncontrado })
                                }                       
                            } else {
                                return res.status(500)
                                                .send({ mensaje: 'La contrasena no es correwcta >:(.'})
                            }
                        })

                } else {
                    return res.status(500)
                                                    .send({ mensaje: 'El usuario no existe'})
                }
            })
        }
    })    
}
module.exports = {
    UsuarioDefault,
    Login
}