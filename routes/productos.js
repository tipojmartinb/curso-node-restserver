const {Router} = require ('express');
const { check } = require('express-validator');
const {crearProducto,obtenerProductos,obtenerProducto,actualizarProducto,borrarProducto} = require('../controllers/productos')
const { existeCategoria,existeProducto} = require('../helpers/db-validators');
const { validarJWT,validarCampos, tieneRole } = require('../middlewares');

const router = Router();

//Obtener productos - publico.
router.get('/',
    obtenerProductos
);

router.post('/',[
    validarJWT,
    check('nombre','El nombre del producto es obligatorio').not().isEmpty(),
    check('idCategoria','El id de categoria no es valido de Mongo').isMongoId(),
    check('idCategoria','El id de categoria es obligatorio').not().isEmpty(),
    check('idCategoria').custom(existeCategoria),
    validarCampos
],
    crearProducto
);

router.get('/:id',[
    check('id','No es un id de producto valido.').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],
    obtenerProducto
);


router.put('/:id',[
    validarJWT,
    //check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeProducto),
    check('categoria').custom(existeCategoria),
    validarCampos
],
    actualizarProducto)

router.delete('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
    ],
        borrarProducto)
    

module.exports=router;