const path = require('path');
const fs = require('fs');
const { response } = require("express");
const {subirArchivo} = require("../helpers/");
const { validarArchivo } = require("../middlewares");
const {Usuario,Producto} =require("../models")

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);


const cargarArchivos = async(req,res=response)=>{

    const pathCompleto= await subirArchivo(req.files,['png','txt','md'],'texto')
                                .catch(err => res.json({err, }))

    res.json({
        pathCompleto,
    })
  
}

const actualizarImagen= async (req,res=response) =>{

    const {id,coleccion}= req.params;

    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo){
                return res.status(404).json({msg:'No existe el id de usuario ingresado.'});
            }
            break;    
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo){
                return res.status(404).json({msg:'No existe el id de producto ingresado.'});
            }
            break;
        default:
            return res.status(500).json({msg:'Se me olvido validar esto'});
    }



    //Limpiar imagenes previas
    try {
        if (modelo.img){
            pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img);
            if (fs.existsSync(pathImagen)){
                fs.unlinkSync(pathImagen)
            }
        }   
    } catch (error) {
        console.log(error)
    }

    modelo.img = await subirArchivo(req.files,undefined,coleccion).catch(err => res.json(err))

    modelo.save();

    res.status(201).json({modelo})
}


const actualizarImagenCloudinary= async (req,res=response) =>{

    const {id,coleccion}= req.params;

    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo){
                return res.status(404).json({msg:'No existe el id de usuario ingresado.'});
            }
            break;    
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo){
                return res.status(404).json({msg:'No existe el id de producto ingresado.'});
            }
            break;
        default:
            return res.status(500).json({msg:'Se me olvido validar esto'});
    }

        //Limpiar imagenes previas
        try {
            if (modelo.img){            
                const splitUrl = modelo.img.split('/')
                const splitIdImagen = splitUrl[splitUrl.length-1].split('.');
                const [publicIdImagen] = splitIdImagen;
                cloudinary.uploader.destroy(publicIdImagen); //NO ES NECESARIO EL AWAIT, PORQUE NO NECESITAMOS ESPERAR LA RESPUESTA PARA SEGUIR.
            }   
        } catch (error) {
            console.log(error)
        }
    
        const {tempFilePath}=req.files.archivo;
        const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
        modelo.img=secure_url;
        
        modelo.save();
    
        res.status(201).json({secure_url})
}

const mostrarImagen = async (req,res=response)=>{

    const {id,coleccion} = req.params;

    
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo){
                return res.status(404).json({msg:'No existe el id de usuario ingresado.'});
            }
            break;    
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo){
                return res.status(404).json({msg:'No existe el id de producto ingresado.'});
            }
            break;
        default:
            return res.status(500).json({msg:'Se me olvido validar esto'});
    }


    //Limpiar imagenes previas

    try {
        if (modelo.img){
            //console.log (modelo.img);
            return res.redirect(modelo.img);

            //ESTO ES PARA CUANDO LA IMAGEN ESTA EN EL MISMO SERVIDOR QUE MI APP.
            /*const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img);            
            if (fs.existsSync(pathImagen)){
                return res.sendFile(pathImagen)
            }*/
        }   
    } catch (error) {
        console.log(error)
    }

    const pathPlaceHolder=path.join(__dirname,'../assets','no-image.jpg')
    
    res.sendFile(pathPlaceHolder);
}


module.exports = {
    actualizarImagen,
    actualizarImagenCloudinary,
    cargarArchivos,
    mostrarImagen};