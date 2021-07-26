const {Schema,model}=require('mongoose');

const rolSchema = Schema({
    rol:{type:String,
        require:[true,'El rol es obligatorio']},
})

module.exports = model('Role',rolSchema);