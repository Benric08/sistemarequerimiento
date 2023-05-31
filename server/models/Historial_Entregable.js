const {DataTypes}=require('sequelize');

module.exports=(dbConnection)=>{
    dbConnection.define('historial_entregable',{
       id_historial_entregable:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
       }
    },{timestamps:false});
}