const moongose = require('mongoose')

const dbConexion = async()=>{
    try {
        await moongose.connect(process.env.DB_CON_STRING,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
        })

        console.log("Conectado")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    dbConexion
}