const {Router} = require ('express');
const { check } = require('express-validator');
const { usuariosGetPrueba,usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');

const { esRolValido, existeEmail, esIdValido } = require('../helpers/db-validators');

const { validarCampos,
        validarJWT,
        esAdminRole,
        tieneRole 
} = require('../middlewares');




const router = Router();

//Prueba levantar index
router.get('/prueba',usuariosGetPrueba)

router.get('/', usuariosGet)

router.put('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(esIdValido),
    check('rol').custom(esRolValido),
    validarCampos,
],
    usuariosPut)

router.post('/',[
    check('correo','El correo ingresado no es valido').isEmail(), ///Middleware para hacer verificaciones antes de ejecutar el post
    check('password','El password debe tener mas de 6 letras').isLength({min:6}),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    //check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('correo').custom(existeEmail),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPost)

router.delete('/:id',[
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROL'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(esIdValido),
    validarCampos
],
 usuariosDelete)

router.patch('/',usuariosPatch)

module.exports=router;