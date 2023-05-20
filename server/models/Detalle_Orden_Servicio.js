const {DataTypes}=require('sequelize');

module.exports=(dbConnection)=>{
    dbConnection.define('Detalle_Orden_servicio',{
        idDetalleOrdenServicio:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true},
        idOrdenServicio:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        montoOrdenServicio:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        fechaVencimiento:{
            type:DataTypes.DATEONLY,
            allowNull:false
        },
        estado:{
            type:DataTypes.DATEONLY,
            allowNull:false
        }
    });
}