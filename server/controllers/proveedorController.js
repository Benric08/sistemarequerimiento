const { QueryTypes } = require('sequelize');
const {
    
    proveedor,
    orden_servicio,
    detalle_orden_servicio,
    entregable,
    estado_entregable,
    dbConnection
    
    } = require('../config/db');

const getAllProveedores = async()=>{
    const allProveedores = await proveedor.findAll();
    return allProveedores;
}

const getAllProveedoresDetalle = async()=>{
    const requerimientoDetalle = await proveedor.findAll({
        //where: { id_requerimiento: 4 },
        include: [{ 
            model: orden_servicio, 
            include:[
                {model:detalle_orden_servicio,
                                   
                },
                
            ]
        }],
    });
   
    return requerimientoDetalle;
}

const getAllProveedorDetalleOdenServicio = async ()=>{
    const proveedores = dbConnection.query(`select po.nombre|| ' '||po.apellido_paterno as nombre_completo, des.descripcion,des.fecha_vencimiento,des.estado from proveedors po inner join orden_servicios os on po.id_proveedor=os.id_proveedor 
    inner join detalle_orden_servicios des on os.id_orden_servicio=des.id_orden_servicio`,{type:QueryTypes.SELECT});

    return proveedores;
} 


module.exports={
    getAllProveedores,
    getAllProveedoresDetalle,
    getAllProveedorDetalleOdenServicio
}