const {
  usuarioConectado,
  usuarioDesconectado,
  getUsuarios,
  grabarMensaje,
} = require("../Controllers/Sockets");
const { comprobarJWTS } = require("../helpers/jwt");

class Sockets {
  constructor(io) {
    this.io = io;
    this.socketsEvt();
  }

  socketsEvt() {
    //Escucha la conexion del los clientes
    this.io.on("connection", async (socket) => {
      const [valido, uid] = comprobarJWTS(socket.handshake.query["x-token"]);
      if (!valido) {
        console.log("Socket no identificado");
        return socket.disconnect();
      }
      console.log("Cliente conectado", uid );
      await usuarioConectado(uid);

      //Unir al usuario a una sala de chat de socket.IO
      socket.join(uid)


      //Emitir todos los usuarios conectados
      this.io.emit("lista-usuarios", await getUsuarios());

      //Escuchar el cliente que esta mandando el mensaje 

      socket.on('m', async (payLoad) =>{
        const mensaje = await grabarMensaje(payLoad);
        console.log(mensaje)
        this.io.to(payLoad.para).emit('m', mensaje)
        this.io.to(payLoad.de).emit('m', mensaje)
      })

      //Deconectar al cliente
      socket.on("disconnect", async () => {
        console.log("Cliente desconectado");
        await usuarioDesconectado(uid);
        this.io.emit("lista-usuarios", await getUsuarios());
      });

      //Se valida el JWT

      //Saber que usuario esta activo mediane el UID


      //Unirme a una sala especifica Socket Join

      //Escuchar cuando el chiente manda mensaje

      //Disconect
      //Emitir todos los usuarios conectados

      //  //Escucha el evento emitido por el cliente
      //   socket.on("mensajeNuevo", ( data ) => {
      //     console.log(data);
      //     this.io.emit("mensajeNuevo-fromServer", data);
      //   });
    });
  }
}

module.exports = Sockets;
