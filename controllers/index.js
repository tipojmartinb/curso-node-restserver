const  auth= require('../controllers/auth');
const  buscar= require('../controllers/buscar');
const  categorias = require('../controllers/categorias');
const  productos = require('../controllers/productos');
const  usuarios = require('../controllers/usuarios');
const  uploads = require('../controllers/uploads');


module.exports={
    ...auth,
    ...buscar,
    ...categorias,
    ...productos,
    ...uploads,
}