const {response}= require ('express');
const {ObjectId} = require('mongoose').Types;
const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas=[
    'usuarios',
    'categorias',
    'productos',
    'roles',
];

const buscarUsuarios = async (termino='',res=response)=>{
    const esMongoId = ObjectId.isValid(termino);

    if (esMongoId){
        usuario = await Usuario.findById(termino);
        return res.json({
            results:(usuario)?[usuario]:'No existe usuario',
        })
    }

    const regEx = new RegExp(termino,'i');

    const usuarios = await Usuario.find({
        $or:[{nombre:regEx},{correo:regEx}],
        $and:[{estado:true}],        
    });

    res.json({
        result:usuarios,
    })
}

const buscarCategorias = async (termino='',res=response)=>{
    const esMongoId = ObjectId.isValid(termino);

    if (esMongoId){
        categoria = await Categoria.findById(termino);
        return res.json({
            results:(categoria)?[categoria]:'No existe categoria',
        })
    }

    const regEx = new RegExp(termino,'i');

    const categorias = await Categoria.find({nombre:regEx,estado:true});

    res.json({
        result:categorias,
    })
}

const buscarProductos = async (termino='',res=response)=>{
    const esMongoId = ObjectId.isValid(termino);

    if (esMongoId){
        producto = await Producto.findById(termino)
        .populate('usuario','nombre')
        .populate('categoria','nombre');;
        return res.json({
            results:(producto)?[producto]:'No existe categoria',
        })
    }

    const regEx = new RegExp(termino,'i');

    const productos = await Producto.find({
        $or:[{nombre:regEx},{descripcion:regEx},{categoria:termino}],
        $and:[{estado:true}],        
    })
    .populate('usuario','nombre')
    .populate('categoria','nombre');

    res.json({
        result:productos,
    })
}




const buscar = async (req,res=response)=>{

    const {coleccion, termino}=req.params;

    if (!coleccionesPermitidas.includes(coleccion)){
        res.status(400).json({
            msg:`No existe la coleccion. Permitidas ${coleccionesPermitidas}`,
        })
    }else{

        switch (coleccion) {
            case 'categorias':
                buscarCategorias(termino,res);
                break;
            case 'productos':
                buscarProductos(termino,res);
                break;
            case 'usuarios':
                buscarUsuarios(termino,res);
                break;    
            default:
                res.status(500).json({
                    coleccion,
                    termino
                })
        }


    }

}

module.exports={
    buscar
};