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
            allowNull:false
        },
        numeroOrdenServicio:{
            type:DataTypes.STRING,
            allowNull:false
        },
        fechaOrdenServicio:{
            type:DataTypes.DATEONLY,
            allowNull:false
        },
        idRequerimiento:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    });
}