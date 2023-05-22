const {
    Requerimiento,
    Orden_Servicio,
    Proveedor,
    Detalle_Orden_Servicio,
    Detalleos_Ejecucion_Presupuestaria
    } = require('../config/db');

const getRequerimientoOrdenServicio = async()=>{
    const requerimientoDetalle = await Requerimiento.findAll({
        //where: { idRequerimiento: 4 },
        include: [{ 
            model: Orden_Servicio, 
            include:[{
                model:Detalle_Orden_Servicio
            }]
        }],
    });
    return requerimientoDetalle;
}

module.exports={
    getRequerimientoOrdenServicio,
}