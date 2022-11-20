const {Router} = require('express');
const { crearUsuario, login, renewToken } = require('../Controllers/aut');
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validarCampos');
const { validarJWT } = require('../helpers/validarJtw');
const router = Router(); 

//Crear Nuevos Usuarios 
router.post("/new",[
  check('nombre', 'el nombre es obligatorio').not().isEmpty(),
  check('passwd', 'el password es obligatorio').not().isEmpty(),
  check('email', 'el email es obligatorio').isEmail(),
  validarCampos
],crearUsuario)

//Login 

router.post("/", [
    check('email', 'el email es obligatorio').isEmail(),
    check('passwd', 'el password es obligatorio').not().isEmpty(),
    validarCampos
] ,login)

//Revalidar Token 

router.get("/renew", validarJWT ,renewToken)


module.exports = router;