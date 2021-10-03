const {response, request} = require('express');
const {Usuario,Producto} = require('../models') ;


const crearProducto = async(req,res) => {
    const token=req.header('x-token');
    const nombre = req.body.nombre.toUpperCase();
    const {descripcion='',precio} = req.body;

    const productoDB = await Producto.findOne({'nombre':nombre});

    if (productoDB){
        res.status(201).json({
            msg:`Ya existe producto ${productoDB.nombre}`,            
        })
    }

    const data = {
        nombre:nombre,
        descripcion:descripcion,
        precio:precio,
        categoria:req.categoriaValida,
        usuario: req.usuarioAutenticado,
    }

    const producto = new Producto(data);
    await producto.save(producto);

    res.status(200).json({
        producto:producto,
    })


}

const obtenerProductos = async(req,res) => {
    const {limite=5,desde=0} = req.query;

    const total=new Promise((resolve, reject)=>{
            resolve(Producto.countDocuments({estado:true}));
    })

    const productos =new Promise((resolve,reject)=>{
        resolve (
            Producto.find({estado:true})
            .populate('usuario',['nombre','correo'])
            .populate('categoria',['nombre'])
            .limit(Number(limite))
            .skip(Number(desde))
        )
    })

    const [tot,pro]=await Promise.all([total,productos])
                            .catch(err=>{console.log(err)});


    /*const [tot, pro] = await Promise.all([
        Producto.countDocuments({estado:true}),
        Producto.find({estado:true})
            .populate('usuario',['nombre','correo'])
            .limit(Number(limite))
            .skip(Number(desde))
    ]);*/

  
      res.status(201).json({
          total:tot,
          productos:pro
          //messsage:'Get API - controlador'
      });

}


const obtenerProducto = async(req,res) => {
    const {id} = req.params

    const producto = await Producto.findById(id)
                            .populate('usuario',['nombre'])
                            .populate('categoria',['nombre']);

    res.json({
        producto,
    })
}


const actualizarProducto = async(req,res) => {

    const {id}= req.params;
    const nombre=(req.body.nombre)?req.body.nombre.toUpperCase():false;


    const productoDB = await Producto.findOne({'nombre':nombre});
    if (productoDB){
        res.status(201).json({
            msg:'Ya existe producto con el nuevo nombre que quiere proponer',            
        })
    }else{
        const {uid,...data}=req.body;
        if (nombre){
            data.nombre=nombre;  
        }
        data.categoria=req.categoriaValida;
        data.usuario=req.usuarioAutenticado;

        producto = await Producto.findByIdAndUpdate(id,data,{new:true})
                                .populate('usuario','nombre')
                                .populate('categoria','nombre');

        res.json({
            msg:'Update ok',
            producto
        })
    }
}

const borrarProducto = async(req,res) => {

    const {id}=req.params;

    const producto = await Producto.findByIdAndUpdate(id,{estado:false,usuario:req.usuarioAutenticado},{new:true})

    res.json({
        msg:'Borrado ok',
        producto,
    })
}


module.exports={
    actualizarProducto,
    borrarProducto,
    crearProducto,
    obtenerProductos,
    obtenerProducto,
}