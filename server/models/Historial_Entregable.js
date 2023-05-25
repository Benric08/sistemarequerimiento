const {DataTypes}=require('sequelize');

module.exports=(dbConnection)=>{
    dbConnection.define('historial_entregable',{
       idHistorialEntregable:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
       }
    },{timestamps:false});
}