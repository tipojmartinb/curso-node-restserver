const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req =request,res=response,next)=>{
    const token = req.header('x-token');

    if (!token){
        return res.status(401).json({
            msg:'No existe token en la peticion'
        })
    } 

    try {
        
        const {uid}=jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        //req.uid=uid; //Creo una nueva propiedad dentro de request. Lo voy a tener disponible cuando llegue al controller.

        const usuario = await Usuario.findById(uid);


        //Verificar si el usuario existe
        if (!usuario){
            res.status(401).json({
                msg:'Token no valido - Usuario inexistente'
            })
        }
        //Verificar si el UID tiene estado en true
        if (!usuario.estado){
            res.status(401).json({
                msg:'Token no valido - Usuario deshabilitado'
            })
        }

        req.usuarioAutenticado=usuario;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no es valido'
        })
    }

};

module.exports={
    validarJWT,
}