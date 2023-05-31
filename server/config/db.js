require('dotenv').config();
const {Sequelize, DataTypes} = require('sequelize');
const requerimientoModel = require('../models/Requerimiento');
const ordenServicioModel = require('../models/Orden_Servicio');
const proveedorModel = require('../models/Proveedor');
const detalleOrdenServicioModel = require('../models/Detalle_Orden_Servicio');
const ejecucionPresupuestariaModel = require('../models/Ejecucion_Presupuestaria');
const detalleOSEjecucionPresupuestariaModel = require('../models/Detalleos_Ejecucion_Presupuestaria');
const entregableModel = require('../models/Entregable');
const estadoEntregableModel = require('../models/Estado_Entregable');
const historialEntregableModel = require('../models/Historial_Entregable');
const ordenServicioEjecucionPresupuestariaModel = require('../models/OrdenServicio_EjecucionPresupuestaria')
const {DB_HOST,DB_PASSWORD,DB_DATABASE_NAME,DB_USER_NAME} = process.env;
const dbConnection = new Sequelize(`postgres://${DB_USER_NAME}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE_NAME}`,{logging:true});

requerimientoModel(dbConnection); 
ordenServicioModel(dbConnection);
proveedorModel(dbConnection);
detalleOrdenServicioModel(dbConnection);
ejecucionPresupuestariaModel(dbConnection);
detalleOSEjecucionPresupuestariaModel(dbConnection);
entregableModel(dbConnection);
estadoEntregableModel(dbConnection);
historialEntregableModel(dbConnection);
ordenServicioEjecucionPresupuestariaModel(dbConnection); 
const {requerimiento,
    orden_servicio,
    proveedor,
    detalle_orden_servicio,
    ejecucion_presupuestaria,
    detalleos_ejecucion_presupuestaria,
    entregable,
    estado_entregable,
    historial_entregable,
    orden_servicio_ejecucion_presupuestaria
} = dbConnection.models; 

//relations  between requerimeinto and Orden Servicio

requerimiento.hasOne(orden_servicio,{
    foreignKey:{
            name:"id_requerimiento",
            type:DataTypes.INTEGER,
            allowNull:false}
});
orden_servicio.belongsTo(requerimiento,{
    foreignKey:{
            name:"id_requerimiento",
            type:DataTypes.INTEGER,
            allowNull:false}
});

//relation between orden servico and proveedor

 proveedor.hasMany(orden_servicio,{
    foreignKey:{
        name:"id_proveedor",
        allowNull:false,
        type:DataTypes.INTEGER
    }
});
orden_servicio.belongsTo(proveedor,{
    foreignKey:{
        name:"id_proveedor",
        allowNull:false,
        type:DataTypes.INTEGER
    }
}); 

//relation between orden servicio and detalle orden servicio

orden_servicio.hasMany(detalle_orden_servicio,{
    foreignKey:{
        name:"id_orden_servicio",
        allowNull:false,
        type:DataTypes.INTEGER
    }
});
detalle_orden_servicio.belongsTo(orden_servicio,{
    foreignKey:{
        name:"id_orden_servicio",
        allowNull:false,
        type:DataTypes.INTEGER
    }
});

//relation between detalle orden sevcio and ejecucion presupuestal

detalle_orden_servicio.belongsToMany(ejecucion_presupuestaria,{
    through: detalleos_ejecucion_presupuestaria,
    uniqueKey:'id_detalleos_ejecucion'
});
ejecucion_presupuestaria.belongsToMany(detalle_orden_servicio,{
    through: detalleos_ejecucion_presupuestaria
}); 
console.log("imprimiendo los modelos de mi bd",dbConnection.models);

// detalle orden servicio realacion Entregable

detalle_orden_servicio.hasOne(entregable,{
    foreignKey:{
            name:"id_detalle_os",
            type:DataTypes.INTEGER,
            allowNull:false}
});
entregable.belongsTo(detalle_orden_servicio,{
    foreignKey:{
            name:"id_detalle_os",
            type:DataTypes.INTEGER,
            allowNull:false}
});

//Entregable --- Estado entregable
entregable.hasMany(estado_entregable,{
    foreignKey:{
            name:"id_entregable",
            type:DataTypes.INTEGER,
            allowNull:false}
});
estado_entregable.belongsTo(entregable,{
    foreignKey:{
            name:"id_entregable",
            type:DataTypes.INTEGER,
            allowNull:false}
});
// entregable-estado_entregable-historialentregable

/* estado_entregable.belongsToMany(entregable,{
    through: historial_entregable,
    uniqueKey:'id_historial_entregable'
}); 

entregable.belongsToMany(estado_entregable,{
    through: historial_entregable
}); */


// relacion orden servicio and ordenservicio - ejecucion_presupuestaria
orden_servicio.belongsToMany(ejecucion_presupuestaria,{
    through: orden_servicio_ejecucion_presupuestaria,
    uniqueKey:'id_orden_ejecucion'
});
ejecucion_presupuestaria.belongsToMany(orden_servicio,{
    through: orden_servicio_ejecucion_presupuestaria
}); 

module.exports={
    dbConnection,
    ...dbConnection.models
}