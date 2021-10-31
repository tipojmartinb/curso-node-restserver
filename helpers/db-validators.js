const { request } = require('express');
const { Categoria,Producto } = require('../models');
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
//VERIFICAR SI ES VALIDO EL ID DE USUARIO
const esIdValido = async(id='')=>{
    const existeId = await Usuario.findById(id);
    if (!existeId){
        throw new Error (`El id ${id} no existe`);
    }
}   

//VERIFICAR SI ES VALIDO EL ID DE CATEGORIA

const existeCategoria = async (id='')=>{
    const existeId = await Categoria.findById(id);
    if (!existeId){
        throw new Error (`El id de categoria no existe`);
    }
    request.categoriaValida = existeId;
}

const existeProducto = async (id='')=>{
    const existeId = await Producto.findById(id);
    if (!existeId){
        throw new Error (`El id de producto no existe`);
    }
    request.productoValidado = existeId;
}

/**
 * Validar colecciones permitidas
 */
 const coleccionesPermitidas = ( coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes( coleccion );
    if ( !incluida ) {
        throw new Error(`La colección ${ coleccion } no es permitida, ${ colecciones }`);
    }
    return true;
}


module.exports={esRolValido,existeEmail,esIdValido,existeCategoria,existeProducto,coleccionesPermitidas}