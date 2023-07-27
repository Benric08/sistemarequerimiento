const {DataTypes} = require('sequelize');

module.exports=(dbConnection)=>{
    dbConnection.define('orden_servicio',{
        id_orden_servicio:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        meta:{
            type:DataTypes.STRING,
            allowNull:false,   
        },
        clasificador:{
            type:DataTypes.STRING,
            allowNull:false, 
        },
        numero_orden_servicio:{
            type:DataTypes.STRING,
            allowNull:false,

        },
        numero_certificacion:{
            type:DataTypes.STRING,
            allowNull:false
        },
        expediente_siaf:{
            type:DataTypes.STRING,
            allowNull:false
        },
        fecha_orden_servicio:{
            type:DataTypes.DATEONLY,
            allowNull:false
        },
        file_orden_servicio:{
            type:DataTypes.STRING,
            defaultValue:''
        },
     

    },
    {
        timestamps:false
    });
}