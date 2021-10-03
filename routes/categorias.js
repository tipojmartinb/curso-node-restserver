const {Router} = require ('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-validators');


const { validarJWT,validarCampos, tieneRole } = require('../middlewares');

const router = Router();

//Obtener categorias - publico.
router.get('/',
    obtenerCategorias
);

//Obtener una categoria por id - publico
router.get('/:id',[
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],
    obtenerCategoria);

//Crear CATEGORIA - privado - cualquiera con token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
    ],
    crearCategoria,
);

//ACTUALIZAR UNA CATEGORIA - privado - cualquiera con token valido
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos],
    actualizarCategoria);

//BORRAR UNA CATEGORIA - ADMIN
router.delete('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
    ],
    borrarCategoria);


module.exports=router;