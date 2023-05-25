const {DataTypes}=require('sequelize');

module.exports=(dbConnection)=>{
    dbConnection.define('detalle_orden_servicio',{
        idDetalleOrdenServicio:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true},
        descripcion:{
            type:DataTypes.STRING,
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
            type:DataTypes.STRING,
            allowNull:false,
            values:['Pendiente','Entregado'],
            defaultValue:'Pendiente'
        }
    });
}