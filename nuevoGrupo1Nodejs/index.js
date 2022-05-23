const mongoose = require('mongoose');
const usuarioControlador = require('./src/controllers/usuario.controller');
const app = require('./app');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ControlSucursalesEmpresas', { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("Ya esta conectado a la base de datos :D.");

    app.listen(3000, function () {
        console.log("Esta se encuentra corriendo en el puerto 3000 :D")
        usuarioControlador.UsuarioDefault();
        
    })

}).catch(error => console.log(error));
