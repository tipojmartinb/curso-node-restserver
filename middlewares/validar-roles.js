const { request, response } = require("express")

const esAdminRole = (req=request,res=response,next)=>{
    if (!req.usuarioAutenticado){
        return res.status(500).json({
            msg:'Se quiere verificar el rol sin validar token primero'
        })

    }
    
    
    const {rol,nombre} = req.usuarioAutenticado;
    if (rol !='ADMIN_ROLE'){
        return res.status(401).json({
            msg:`${nombre} no es administrador - no puede hacer esto`
        })
    }
    next();

}//esAdminRole

const tieneRole=(...roles)=>{  //con los tres punto obtengo el resto de los argumentos que se pasan a una funcion. En forma de Array.
    return (req=request,res=response,next)=>{
        if (!req.usuarioAutenticado){
            return res.status(500).json({
                msg:'Se quiere verificar el rol sin validar token primero'
            })
    
        }
        const {rol,nombre} = req.usuarioAutenticado;
        if (!roles.includes(rol)){
            return res.status(401).json({
                msg:`${nombre} no tiene asignado rol valido - ${roles}`
            })
        }
        next();
    }
}

module.exports= {
    esAdminRole,
    tieneRole};