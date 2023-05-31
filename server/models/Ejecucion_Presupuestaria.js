const {DataTypes}=require('sequelize');

module.exports=(dbConnection)=>{
    dbConnection.define('ejecucion_presupuestaria',{
        id_ejecucion_presupuestaria:{//id_ejecucion_presupuestaria
            type: DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
       
        ejecucion_presupuestaria:{//ejecucion_presupuestaria
            type:DataTypes.ENUM,
            values:['Certificado','Comprometido','Devengado','Girado'],
            allowNull:false
        }
    });
}