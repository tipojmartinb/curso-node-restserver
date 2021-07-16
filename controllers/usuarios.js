const {response, request} = require('express')



const usuariosGet = (req=request, res=response) =>{
    //const query = req.query;
    const {nombre='Sin Nombre',apellido='Sin Apellido',apikey=0}=req.query;
    //res.send('Hello World')
    res.status(201).json({
        nombre,
        apellido,
        apikey,
        messsage:'Get API - controlador'});
  }

const usuariosPut=(req=request, res=response) =>{
    const {id}= req.params;
    //res.send('Hello World')
    res.json({
        ok: true,
        params:id,
        messsage:'PUT Api - Controller'});
  }

const usuariosPost =(req, res=response) =>{

    const body = req.body;
    //res.send('Hello World')
    res.json({
        messsage:'Post Api - Controller',
        nombre:body.nombre,
        edad:body.edad,
    });
  }

const usuariosDelete = (req, res=response) =>{
    //res.send('Hello World')
    res.json({
        messsage:'Delete Api - Controller'});
  }

const usuariosPatch= (req, res=response) =>{
    //res.send('Hello World')
    res.json({
        messsage:'Patch Api - Controller'});
  }

module.exports={
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}