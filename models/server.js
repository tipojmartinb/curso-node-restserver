const express = require('express');
const cors = require('cors');

class Server {
    constructor(){
        this.app= express();
        this.port =process.env.PORT;
        this.usuariosPath='/api/usuarios';
        //this.productPath='/api/productos';

        //MIDDLEWARES
        //SON FUNCIONES QUE LE AGREGAN FUNCIONALIDAD A NUESTRO WEB SERVER.
        this.middlewares();

        //Rutas de mi aplicacion
        this.route();
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        //Lectura y parseo del Body
        this.app.use(express.json())

        //Directorio publico.
        this.app.use(express.static('public'))
    }

    route(){

        this.app.use(this.usuariosPath,require('../routes/usuarios'));
        //this.app.use(this.productPath,require('../routes/usuarios'));
        
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto: ',this.port)
        })
    }
}

module.exports=Server;