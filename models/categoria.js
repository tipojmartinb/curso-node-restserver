const {Schema,model}=require('mongoose');

const CategoriaSchemma = Schema({
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
    }
})

CategoriaSchemma.methods.toJSON = function (){   //SOBREESCRITURA DE METODOS NATIVOS DE OBJETOS. En este caso sobreescribo toJSON.
    const {__v,_id,...categoria} = this.toObject();
    categoria.uid=_id;
    return categoria;
}


// Actualizar categoria

// Borrar Categoria - cambiar estado a false

module.exports = model('Categoria',CategoriaSchemma);