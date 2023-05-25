const {
    
    proveedor,
    orden_servicio,
    detalle_orden_servicio
    
    } = require('../config/db');

const getAllProveedores = async()=>{
    const allProveedores = await proveedor.findAll();
    return allProveedores;
}

const getAllProveedoresDetalle = async()=>{
    const requerimientoDetalle = await proveedor.findAll({
        //where: { idRequerimiento: 4 },
        include: [{ 
            model: orden_servicio, 
            include:[{
                model:detalle_orden_servicio,
            }]
        }],
    });
   
    return requerimientoDetalle;
}


module.exports={
    getAllProveedores,
    getAllProveedoresDetalle
}