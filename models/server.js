const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor(){
        this.app= express();
        this.port =process.env.PORT;

        this.paths={        
            auth:       '/api/auth/',
            buscar:     '/api/buscar/',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            usuarios:   '/api/usuarios',
        }

        //CONECTAR A BASE DE DATOS
        this.conectarDB();

        //MIDDLEWARES
        //SON FUNCIONES QUE LE AGREGAN FUNCIONALIDAD A NUESTRO WEB SERVER.
        this.middlewares();

        //Rutas de mi aplicacion
        this.route();
    }

    async conectarDB(){
        await dbConnection();
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
        this.app.use(this.paths.auth,require('../routes/auth'));
        this.app.use(this.paths.buscar,require('../routes/buscar'));
        this.app.use(this.paths.productos,require('../routes/productos'));
        this.app.use(this.paths.usuarios,require('../routes/usuarios'));
        this.app.use(this.paths.categorias,require('../routes/categorias'));
        //this.app.use('',require('../routes/usuarios'));        
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto: ',this.port)
        })
    }
}

module.exports=Server;