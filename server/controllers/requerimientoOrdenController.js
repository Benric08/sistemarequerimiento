const { Sequelize, QueryTypes } = require('sequelize');
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
        //where: { id_requerimiento: 4 },
        include: [{ 
            model: orden_servicio, 
            include:[{
                model:detalle_orden_servicio
            }]
        }],
    }); 
   //dbConnection.query('select*from orden_servicios inner join detalle_orden_servicios on orden_servicios.id_orden_servicio=detalle_orden_servicios.id_orden_servicio', { type: QueryTypes.SELECT })
    return requerimientoDetalle;
}

module.exports={
    getRequerimientoOrdenServicio,
}