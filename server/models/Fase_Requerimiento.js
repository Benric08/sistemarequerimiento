const {DataTypes}=require('sequelize');

module.exports=(dbConnection)=>{
    dbConnection.define('Fase_Requerimiento',{
        idFaseRequerimiento:{
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
        idRequerimiento:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    })
}