const {response, request} = require('express')
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const path = require('path');


const usuariosGetPrueba =(req,res)=>{
  //res.status(200).send('OK');
  res.sendFile(path.resolve('public/prueba/prueba.html'));
  //res.redirect('http://www.infobae.com');
  //res.send('<h1>Hola Mundoooooo</h1>');
}

const usuariosGet =async (req=request, res=response) =>{
    //const query = req.query;
    //const {nombre='Sin Nombre',apellido='Sin Apellido',apikey=0}=req.query;
    //res.send('Hello World')
    const {limite = 5,desde=0} = req.query;
    /*const usuarios = await Usuario.find({estado:true}) //promesa
      .limit(Number(limite))
      .skip(Number(desde));

    const total = await Usuario.countDocuments({estado:true});promesa*/

    const [total,usuarios] = await Promise.all([         ///PONGO el Await para esperar la respuesta de ambas promesas
      Usuario.countDocuments({estado:true}), //promesa
      Usuario.find({estado:true}) //promesa
             .limit(Number(limite))
             .skip(Number(desde)),
    ])

    res.status(201).json({
        total,
        usuarios
        //messsage:'Get API - controlador'
    });
  }

const usuariosPut= async(req=request, res=response) =>{
    const {id}= req.params;
    const {_id,password,google,correo, ...resto}=req.body;

    //TODO validar contra BD
    if (password){
      const salt = bcryptjs.genSaltSync();//por defect es 10
      resto.password = bcryptjs.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto)
    //res.send('Hello World')
    res.json(usuario);
  }

const usuariosPost =async (req, res=response) =>{

    const {nombre,correo,password,rol} = req.body; //body para JSON 
    //usuario = new Usuario(body);
    usuario = new Usuario({nombre,correo,password,rol});

    //ENCRIPTAR PASSWORD
    const salt = bcryptjs.genSaltSync();//por defect es 10
    usuario.password = bcryptjs.hashSync(password,salt);


    await usuario.save();
    //res.send('Hello World')
    res.json({
       // messsage:'Post Api - Controller',
        usuario
        //nombre:body.nombre,
        //edad:body.edad,
    });
  }

const usuariosDelete =async (req, res=response) =>{
    const {id} = req.params;
    //const {uid}=req.uid;
    //const usuarioAutenticado=req.usuarioAutenticado;
    
    //BORRADO FISICO
    //const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});

    res.json({  
      id,
      usuario
    });
  }

const usuariosPatch= (req, res=response) =>{
    //res.send('Hello World')
    res.json({
        messsage:'Patch Api - Controller'});
  }

module.exports={
    usuariosGetPrueba,
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}