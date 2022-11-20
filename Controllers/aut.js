const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')
const {generarJWT}  = require('../helpers/jwt')


const crearUsuario = async (req, res) => {

    try {

        const {email, passwd} = req.body;
        const existEmail = await Usuario.findOne({email});
        // //Verificar que el email no exista 
        if(existEmail){
            return res.status(400).json({
                ok:false,
                msg: 'el correo ya existe'
            })
        };

         
        //Guardar Usuario en Base de datos 
        const usuario = new Usuario(req.body);

        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        usuario.passwd = bcrypt.hashSync(passwd, salt);

        await usuario.save();

        //Generar el jwt
        const token = await generarJWT(usuario.id);

        res.json({
            ok:true,
            usuario,
            token,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg : "Hable con el administrador"
        });
    }

    // res.json({
    //     ok: true,
    //     msg : "ABC"
    // })
}

//Login
const login = async (req, res) => {
    
    const {email, passwd} = req.body;

    try {
        //Verificar si existe el correo 
        const usuarioDB = await Usuario.findOne({email});
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg: "El email no se encontro"
            })
        }
        //Validar el password
        const validPassword = bcrypt.compareSync(passwd, usuarioDB.passwd);
        if(!validPassword){
            return  res.status(404).json({
                ok:false,
                msg: "El pass no es correcto"
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuarioDB.id)
        //Regresar al usuario con el jwt 
        res.json({
            ok: true,
            usuario : usuarioDB,
            token
        })
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg : "Hable con el administrador"
        });
        
    }
   
} 

//Renew Token 
const renewToken =  async (req, res) => {
    const uid = req.uid;
    //Generar un nuevo token 
    const token = await generarJWT(uid)

    //Obtener el usuario por uid
    const usuario = await Usuario.findById(uid)
    res.json({
        ok: true,
        usuario,
        token
    })
}

module.exports = {
    crearUsuario,
    login,
    renewToken
}