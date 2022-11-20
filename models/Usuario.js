const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type: 'string',
        required: true
    },
    email:{
        type: 'string',
        required: true,
        uniquie: true
    },
    passwd:{
        type: 'string',
        required: true
    },
    online:{
        type: Boolean,
        default: false
    }
})

UsuarioSchema.method('toJSON', function(){
    const {__v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object
})

module.exports = model('Usuario', UsuarioSchema)