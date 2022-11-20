const jtw = require('jsonwebtoken');

const generarJWT = (uid) =>{
    return new Promise((resolve, reject) =>{
        const payLoad = {uid};

        jtw.sign(payLoad, process.env.JWT_KEY,{
            expiresIn: '24h'
        }, (error, token )=>{
            if(error){
                console.log(error)
                reject("No se pudo generar el jwt")
            }else{
                resolve(token);
            }
        })
    })
}

const comprobarJWTS = (token = "") =>{
    try {
        const datos = jtw.verify(token, process.env.JWT_KEY);
        return [true, datos.uid]
    } catch (error) {
        console.log(error);
        return [false, null]
    }
}

module.exports = {
    generarJWT,
    comprobarJWTS
}