const { Sequelize } = require('sequelize');
const {
    requerimiento,
    orden_servicio,
    proveedor,
    detalle_orden_servicio,
    Detalleos_Ejecucion_Presupuestaria,
    dbConnection

    } = require('../config/db');

const getRequerimientoOrdenServicio = async()=>{
    const requerimientoDetalle = await requerimiento.findAll({
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
    getRequerimientoOrdenServicio,
}