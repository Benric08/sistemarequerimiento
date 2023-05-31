const {DataTypes}=require('sequelize');
const Detalle_Orden_Servicio = require('./Detalle_Orden_Servicio');
const Ejecucion_Presupuestaria = require('./Ejecucion_Presupuestaria');

module.exports=(dbConnection)=>{
    dbConnection.define('detalleos_ejecucion_presupuestaria',{
       
        
        fecha_estado:{//fecha_estado
            type:DataTypes.DATEONLY,
            allowNull:false
        }
    },{timestamps:false});
}