const {Router} = require ('express');
const { check } = require('express-validator');
const { login, googleSigin } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('password','La contrasena es obligatoria').not().isEmpty(),
    validarCampos,
],
login)

router.post('/google',[
    check('id_token','El id_token es obligatorio').not().isEmpty(),
    validarCampos,
],
googleSigin)

module.exports=router;