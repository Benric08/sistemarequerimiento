const {DataTypes} = require('sequelize');

module.exports=(dbConnection)=>{
    dbConnection.define('Orden_Servicio',{
        idOrdenServicio:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        clasificador:{
            type:DataTypes.STRING,
            allowNull:false,
            defaultValue:'2.6.8.1.4.3'
        },
        numeroOrdenServicio:{
            type:DataTypes.STRING,
            allowNull:false,

        },
        numeroCertificacion:{
            type:DataTypes.STRING,
            allowNull:false
        },
        expedienteSiaf:{
            type:DataTypes.STRING,
            allowNull:false
        },
        fechaOrdenServicio:{
            type:DataTypes.DATEONLY,
            allowNull:false
        },
        fileOrdenServicio:{
            type:DataTypes.STRING,

        },
     

    },
    {
        timestamps:false
    });
}