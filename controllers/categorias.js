const {response} = require('express');
const {Categoria} = require('../models');

const crearCategoria = async (req,res=response) =>{

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre:nombre});

    if (categoriaDB){
        res.status(400).json({
            msg:`Ya existe categoria ${nombre}`
        })
    }

    // Generar datos a guardar

    const data ={
        nombre,
        usuario:req.usuarioAutenticado._id
    }

    const categoria = new Categoria (data);
    await categoria.save();

    res.status(201).json({
        categoria
    })
}



// Obtener Categorias - paginado - total - populate.
const obtenerCategorias = async (req, res)=>{
    const {limite=1,desde = 0} = req.query;

    const [total,categorias] = await Promise.all([         ///PONGO el Await para esperar la respuesta de ambas promesas
        Categoria.countDocuments({estado:true}), //promesa
        Categoria.find({estado:true}).populate('usuario',['nombre','correo']) //promesa
               .limit(Number(limite))
               .skip(Number(desde)),
      ])
  
      res.status(201).json({
          total,
          categorias
          //messsage:'Get API - controlador'
      });

    res.json({
        limite,
        desde,
    })

}

// Obtener Categoria - populate.
const obtenerCategoria = async (req,res)=>{
    const {id} = req.params;

    const categoria = await Categoria.findById(id).populate('usuario','nombre');


    res.status(201).json({
        categoria
    })
}

const actualizarCategoria = async (req,res)=>{
    const {id} = req.params;
    const{_id,estado,usuario,...resto}= req.body;

    resto.usuario=req.usuarioAutenticado.id;
    resto.nombre=resto.nombre.toUpperCase();
    const categoria = await Categoria.findByIdAndUpdate(id,resto,{new:true}).populate('usuario','nombre');

    res.status(201).json({
        categoria
    });
}

const borrarCategoria = async (req,res)=>{
    const {id} = req.params;
    //const {uid}=req.uid;
    //const usuarioAutenticado=req.usuarioAutenticado;
    
    //BORRADO FISICO
    //const usuario = await Usuario.findByIdAndDelete(id);
    const categoria = await Categoria.findByIdAndUpdate(id,{estado:false,usuario:req.usuarioAutenticado.id},{new:true}).populate('usuario');
    res.status(201).json({
        categoria
    })
}

module.exports={
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}