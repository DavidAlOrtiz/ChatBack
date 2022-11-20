
const express = require('express')
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');
const Sockets = require('./Sockets')
const {dbConexion} = require('../DB/config')

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT ;

        //Conexion a la base de datos
        dbConexion();
        //Http Server
        this.server = http.createServer( this.app );

        //Configuracion de Sokets
        this.io = socketio( this.server , {
            // configuraciones del socket
        });
    }

    middleware(){
        //Desplegar el directorio publico
        this.app.use(express.static(path.resolve(__dirname, "../public")))
        //Habilitar cors 
        this.app.use( cors() );

        //Parseo del body 
        this.app.use(express.json());

        //aPI 
        this.app.use('/api/login', require('../routers/auth'))
        this.app.use('/api/mensajes', require('../routers/mensajes'))

    }

    //La configuracion de los Sockets
    configurarSockets(){
        new Sockets( this.io );

        
    }

    ejecutarServer(){
        //Ejecutar middleware
        this.middleware();

        //Inicializar sockets
        this.configurarSockets();

        //Inicializar server
        this.server.listen(this.port, ()=>{
            console.log("Conectado en el puerto 3000")
        });
    }
}

module.exports = Server;