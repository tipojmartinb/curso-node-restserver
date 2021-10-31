const dbValidators = require ('../helpers/db-validators');
const generarJWT = require ('../helpers/generar-jwt');
const googleVerify = require ('../helpers/google-verify');
const validarArchivo=require('../helpers/file-validators');

module.exports={
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...validarArchivo,
}