const {Schema,model}=require('mongoose');

const UsuarioSchemma = Schema({
    nombre:{
        type:String,
        require:[true,'El nombre es obligatorio']
    },
    correo:{
        type:String,
        require:[true,'El correo es obligatorio'],
        unique:true
    },
    password:{
        type:String,
        require:[true,'El password es obligatorio'],
    },
    img:{
        type:String,
    },
    rol:{
        type:String,
        require:[true,'El rol es obligatorio'],
        //enum:['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
})

UsuarioSchemma.methods.toJSON = function (){   //SOBREESCRITURA DE METODOS NATIVOS DE OBJETOS. En este caso sobreescribo toJSON.
    const {__v,password,...usuario} = this.toObject();
    return usuario;
}

module.exports=model('Usuario',UsuarioSchemma);  //Se exporta el model, pasando el nombre del modelo en singular y el schemma creado.