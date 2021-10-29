const path=require("path");
const { v4: uuidv4 } = require("uuid");


const subirArchivo=(files,extensionesValidas=['png','jpg','gif','jpeg','txt'],carpeta='')=>{

  return new Promise((resolve,reject)=>{

    const {archivo} = files;
    const archivoCortado = archivo.name.split('.');
    const extension = archivoCortado[archivoCortado.length - 1];
    
    console.log(extensionesValidas, extension, archivoCortado);

    if (!extensionesValidas.includes(extension)){
        return (reject(`Extension ${extension} no permitida`));
    }
 
    const nombreTemp= uuidv4()+'.'+extension;
    const uploadPath = path.join(__dirname,'../uploads/',carpeta,nombreTemp);

    archivo.mv(uploadPath, (err) =>{
        if (err) {
        return (reject(err));
        }
        resolve (nombreTemp)
        //resolve(uploadPath);
    });


  });



}

module.exports = {subirArchivo};