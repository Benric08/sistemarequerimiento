const {DataTypes}=require('sequelize');

module.exports=(dbConnection)=>{
    dbConnection.define('detalle_orden_servicio',{
        id_detalle_os:{//id_detalle_os
            type: DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false, 
            autoIncrement:true},
        descripcion:{
            type:DataTypes.STRING,
            allowNull:false
        }, 
        monto_orden_servicio:{//monto_orden_servicio
            type:DataTypes.INTEGER,
            allowNull:false
        },
        fecha_vencimiento:{//fecha_vencimiento
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