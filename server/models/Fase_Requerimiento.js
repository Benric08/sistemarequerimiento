const {DataTypes}=require('sequelize');

module.exports=(dbConnection)=>{
    dbConnection.define('fase_requerimiento',{
        id_fase_requerimiento:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        fase:{
            type:DataTypes.ENUM,
            values:['Autorizacion','Implementacion','Ejecucion','Liquidacion'],
            allowNull:false        
        },
        fecha:{
            type:DataTypes.DATEONLY,
            allowNull:false
        },
        id_requerimiento:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    })
}