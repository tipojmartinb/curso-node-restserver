const {Schema,model}=require('mongoose');

const ProductoSchemma = Schema({
    nombre:{type:String,
        require:[true,'El nombre es obligatorio'],
        unique:true},
    estado:{
        type:Boolean,
        default:true,
        require:true
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        require:true
    },

    categoria:{
        type:Schema.Types.ObjectId,
        ref:'Categoria',
        require:true
    },

    precio:{
        type:Number,
        default:0
    },

    descripcion:{type: String},
    disponible:{type:Boolean,default:true},
    img:{type:String,}

})

ProductoSchemma.methods.toJSON = function (){   //SOBREESCRITURA DE METODOS NATIVOS DE OBJETOS. En este caso sobreescribo toJSON.
    const {__v,_id,...data} = this.toObject();
    data.uid=_id;
    return data;
}


// Actualizar categoria

// Borrar Categoria - cambiar estado a false

module.exports = model('Producto',ProductoSchemma);