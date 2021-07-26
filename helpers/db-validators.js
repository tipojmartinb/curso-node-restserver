const Role = require('../models/rol'); //Importo el modelo Role
const Usuario = require('../models/usuario'); //Importo el modelo Usuario

//VERIFICAR SI EL ROL ES VALIDO
const esRolValido = async (rol='')=>{
    const existeRol = await Role.findOne({rol});
    if (!existeRol){
        throw new Error (`El rol ${rol} no esta registrado en BD`);
    }
}

//VERIFICAR SI CORREO EXISTE
const existeEmail = async(correo='')=>{
    const email = await Usuario.findOne({correo});
    if (email){
        throw new Error (`El email ${correo} ya existe`);
    }
}   
//VERIFICAR SI CORREO EXISTE
const esIdValido = async(id='')=>{
    const existeId = await Usuario.findById(id);
    if (!existeId){
        throw new Error (`El id ${id} no existe`);
    }
}   

module.exports={esRolValido,existeEmail,esIdValido}