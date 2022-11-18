
const express = require('express')
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./Sockets')

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT ;

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