// api/mensajes
const {Router} = require('express');
const { obtenerChat } = require('../Controllers/mensajes');
const { validarJWT } = require('../helpers/validarJtw');

const router = Router()

router.get("/:de", validarJWT, obtenerChat)

module.exports = router;