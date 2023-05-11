const {DataTypes}=require('sequelize');

module.exports=(dbConnection)=>{
    dbConnection.define('Ejecucion_Presupuestaria',{
        idEjecucionPresupuestaria:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        idDetalleOrdenServicio:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        ejecucionPresupuestaria:{
            type:DataTypes.ENUM,
            values:['Certificado','Comprometido','Devengado','Girado'],
            allowNull:null
        },
        fechaEjecucionPresupuestaria:{
            type:DataTypes.DATEONLY,
            allowNull:false
        }
    });
}