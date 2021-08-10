const {response, request} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs=require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');



const login = async(req,res=response)=>{
    const {correo='no definido',password}=req.body

    try {

        //Verificar si el Mail existe
        const usuario = await Usuario.findOne({correo:correo});
        if (!usuario){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - correo',
            })
        }

        //Si el usuario esta activo
        if (!usuario.estado){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - estado: false',
            })
        }

        //Verificar password
        const validPassword=bcryptjs.compareSync(password,usuario.password)
        if (!validPassword){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - password',
            })
        }

        //Generar JWT

        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        })
    }


}



module.exports={
    login
}
