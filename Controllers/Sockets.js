const Usuario = require("../models/Usuario")
const Mensaje = require("../models/Mensaje")

const usuarioConectado = async (uid) =>{
    const  usuario = await Usuario.findById(uid);
    usuario.online = true;
    await usuario.save();

    return usuario;
}

const usuarioDesconectado = async (uid) =>{
    const  usuario = await Usuario.findById(uid);
    usuario.online = false;
    await usuario.save();

    return usuario;
}

const getUsuarios = async () => {
   const usuarios = await Usuario.
    find().sort('-online');
   return usuarios;
}

const grabarMensaje = async (payLoad) =>{
    try {

        const mensaje = new Mensaje(payLoad);
        await mensaje.save();

        return mensaje

        
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    getUsuarios,
    grabarMensaje
}