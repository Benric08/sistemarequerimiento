const { Sequelize, QueryTypes } = require('sequelize');
const {
    requerimiento,
    orden_servicio,
    proveedor,
    detalle_orden_servicio,
    Detalleos_Ejecucion_Presupuestaria,
    entregable,
    detalle_entregable,
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
const getFiles = async()=>{
    /* const requerimientoDetalle = await requerimiento.findAll({
        //where: { id_requerimiento: 4 },
        attributes:['descripcion'],
        include: [{ 
            model: orden_servicio,
            attributes:['numero_orden_servicio','file_orden_servicio'],
            include:[{
                model:detalle_orden_servicio,
                attributes:['descripcion'],
                include:[{
                    model:entregable,
                   
                    include:[{
                        model:detalle_entregable,
                        
                    }]
                }]
            } ,{
                model:proveedor,
                attributes:['nombre_completo']
            } ]
        }],
    }); */ 
   //dbConnection.query('select*from orden_servicios inner join detalle_orden_servicios on orden_servicios.id_orden_servicio=detalle_orden_servicios.id_orden_servicio', { type: QueryTypes.SELECT })
   requerimientoDetalle=dbConnection.query(`Select r.descripcion,concat(p.nombre,' ',p.apellido_paterno,' ',p.apellido_materno) as nombre_completo, os.numero_orden_servicio,os.file_orden_servicio,
   json_agg(json_build_object('descripcion',dos.descripcion,'entregable',json_build_object('file_entregable',e.file_entregable,'detalle_entregable',
   json_build_object('file_conformidad',de.file_informe_conformidad,'file_recibo',de.file_recibo_honorarios,'file_comprobante',de.file_comprobante_pago)))) as detalle_orden_servicio
   from public.requerimientos r
   left join public.orden_servicios os USING (id_requerimiento)
   join public.proveedors p USING(id_proveedor)
   left join public.detalle_orden_servicios dos USING(id_orden_servicio ) 
   left join public.entregables e USING(id_detalle_os)
   left join public.detalle_entregables de USING(id_entregable)
   group by r.descripcion,p.nombre,p.apellido_paterno,p.apellido_materno,os.numero_orden_servicio,os.file_orden_servicio
   order by os.numero_orden_servicio DESC`) 
   return requerimientoDetalle;
}

module.exports={
    getRequerimientoOrdenServicio,
    getFiles
}