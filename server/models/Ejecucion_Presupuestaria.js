const {DataTypes}=require('sequelize');

module.exports=(dbConnection)=>{
    dbConnection.define('ejecucion_presupuestaria',{
        idEjecucionPresupuestaria:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
       
        ejecucionPresupuestaria:{
            type:DataTypes.ENUM,
            values:['Certificado','Comprometido','Devengado','Girado'],
            allowNull:false
        }
    });
}