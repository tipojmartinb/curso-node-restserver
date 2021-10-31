const {Router} = require ('express');
const { check } = require('express-validator');
const {cargarArchivos,actualizarImagen,mostrarImagen, actualizarImagenCloudinary} = require('../controllers/');
const { coleccionesPermitidas } = require('../helpers');
const { validarArchivo,validarCampos } = require('../middlewares');

const router = Router();

router.post('/',[validarArchivo,
    validarCampos],
    cargarArchivos);


router.put('/:coleccion/:id',[
    check('id','El id debe ser de Mongo DB').isMongoId(),
    check('coleccion').custom(coleccion =>coleccionesPermitidas(coleccion,['usuarios','productos'])),
    validarArchivo,
    validarCampos
],actualizarImagenCloudinary);
//],actualizarImagen)

router.get('/:coleccion/:id',[
    check('id','El id debe ser de Mongo DB').isMongoId(),
    check('coleccion').custom(coleccion =>coleccionesPermitidas(coleccion,['usuarios','productos'])),
    validarCampos
],mostrarImagen);


module.exports=router;