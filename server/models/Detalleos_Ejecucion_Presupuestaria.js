const {DataTypes}=require('sequelize');
const Detalle_Orden_Servicio = require('./Detalle_Orden_Servicio');
const Ejecucion_Presupuestaria = require('./Ejecucion_Presupuestaria');

module.exports=(dbConnection)=>{
    dbConnection.define('Detalleos_Ejecucion_Presupuestaria',{
       
        
        fechaEstado:{
            type:DataTypes.DATEONLY,
            allowNull:false
        }
    },{timestamps:false});
}