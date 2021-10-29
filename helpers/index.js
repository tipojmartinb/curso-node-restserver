const dbValidators = require('./db-validators');
const generarJWT = require('./generar-jwt');
const googleVerify = require('./google-verify');
const fileValidators = require('./file-validators');


module.exports={
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...fileValidators
}