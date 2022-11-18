class Sockets {
  constructor(io) {
    this.io = io;
    this.socketsEvt();
  }

  socketsEvt() {
    //Escucha la conexion del los clientes
    this.io.on("connection", ( socket ) => {
      
     //Escucha el evento emitido por el cliente
      socket.on("mensajeNuevo", ( data ) => {
        console.log(data);
        this.io.emit("mensajeNuevo-fromServer", data);
      });



    });
  }
}

module.exports = Sockets;
