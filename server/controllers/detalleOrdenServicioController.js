const dayjs = require('dayjs');
const {detalle_orden_servicio,detalleos_ejecucion_presupuestaria,ejecucion_presupuestaria} = require('../config/db');
const { Op } = require("sequelize");

const addEjecucionPresupuestariaDetalleOS = async({id_detalle_os,level_ep,dateStateEP})=>{
    
    const [estadoDetOS,created] = await detalleos_ejecucion_presupuestaria.findOrCreate(
    {where:{ [Op.and]:[{detalleOrdenServicioIdDetalleOs:id_detalle_os},{ejecucionPresupuestariumIdEjecucionPresupuestaria:level_ep}]},
    defaults:{
        detalleOrdenServicioIdDetalleOs: id_detalle_os,
        ejecucionPresupuestariumIdEjecucionPresupuestaria: level_ep,
        fecha_estado:dateStateEP
    }});
    console.log('asd',estadoDetOS.dataValues);
    return {estadoDetOS,created};
}

module.exports={
    addEjecucionPresupuestariaDetalleOS
}