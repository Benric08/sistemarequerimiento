require('dotenv').config();
const {Sequelize, DataTypes} = require('sequelize');
const requerimientoModel = require('../models/Requerimiento');
const ordenServicioModel = require('../models/Orden_Servicio');
const proveedorModel = require('../models/Proveedor');
const detalleOrdenServicioModel = require('../models/Detalle_Orden_Servicio');
const ejecucionPresupuestariaModel = require('../models/Ejecucion_Presupuestaria');
const detalleOSEjecucionPresupuestariaModel = require('../models/Detalleos_Ejecucion_Presupuestaria');

const {DB_HOST,DB_PASSWORD,DB_DATABASE_NAME,DB_USER_NAME} = process.env;
const dbConnection = new Sequelize(`postgres://${DB_USER_NAME}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE_NAME}`,{logging:false});

requerimientoModel(dbConnection); 
ordenServicioModel(dbConnection);
proveedorModel(dbConnection);
detalleOrdenServicioModel(dbConnection);
ejecucionPresupuestariaModel(dbConnection);
detalleOSEjecucionPresupuestariaModel(dbConnection);

const {Requerimiento,
    Orden_Servicio,
    Proveedor,
    Detalle_Orden_Servicio,
    Ejecucion_Presupuestaria,
    Detalleos_Ejecucion_Presupuestaria
} = dbConnection.models; 

//relations  between requerimeinto and Orden Servicio

Requerimiento.hasOne(Orden_Servicio,{
    foreignKey:{
            name:"idRequerimiento",
            type:DataTypes.INTEGER,
            allowNull:false}
});
Orden_Servicio.belongsTo(Requerimiento,{
    foreignKey:{
            name:"idRequerimiento",
            type:DataTypes.INTEGER,
            allowNull:false}
});

//relation between orden servico and proveedor

 Proveedor.hasMany(Orden_Servicio,{
    foreignKey:{
        name:"idProveedor",
        allowNull:false,
        type:DataTypes.INTEGER
    }
});
Orden_Servicio.belongsTo(Proveedor,{
    foreignKey:{
        name:"idProveedor",
        allowNull:false,
        type:DataTypes.INTEGER
    }
}); 

//relation between orden servicio and detalle orden servicio

Orden_Servicio.hasMany(Detalle_Orden_Servicio,{
    foreignKey:{
        name:"idOrdenServicio",
        allowNull:false,
        type:DataTypes.INTEGER
    }
});
Detalle_Orden_Servicio.belongsTo(Orden_Servicio);

//relation between detalle orden sevcio and ejecucion presupuestal

Detalle_Orden_Servicio.belongsToMany(Ejecucion_Presupuestaria,{
    through: Detalleos_Ejecucion_Presupuestaria,
    uniqueKey:'idDetalleosEjecucion'
});
Ejecucion_Presupuestaria.belongsToMany(Detalle_Orden_Servicio,{
    through: Detalleos_Ejecucion_Presupuestaria
}); 
console.log("imprimiendo los modelos de mi bd",dbConnection.models);



module.exports={
    dbConnection,
    ...dbConnection.models
}