const {DataTypes}=require('sequelize');


module.exports=(dbConnection)=>{
    dbConnection.define('orden_servicio_ejecucion_presupuestaria',{
       
        
        fecha_estado:{
            type:DataTypes.DATEONLY,
            allowNull:false
        }
    },{timestamps:false});
}