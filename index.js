const Server = require('./models/server');
require('dotenv').config();

const server = new Server();

server.ejecutarServer(); 

//Servidor de express
// const express = require('express');

// const app = express();

//Servidor de sockets
// const serve = require('http').createServer(app);



//Configuracion del socketServer
// const io = require('socket.io')(serve);

//Desplegar el direcctorio publico
// app.use(express.static(__dirname + '/public'))

//Config de cuando el cliente se conecta 
// io.on('connection', ( socket )=>{
//     // socket.emit('mensaje', { 
//     //     id :socket.id,
//     //     fecha: new Date()
//     // })

//     socket.on("mensajeNuevo", (data)=>{
//         console.log(data);
//         io.emit("mensajeNuevo-fromServer", data)
//     })
// });

