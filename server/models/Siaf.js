const {DataTypes}=require('sequelize');

module.exports=(dbConnection)=>{
    dbConnection.define('Siaf',{
        idSiaf:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true},
        codigoSiaf:{
            type:DataTypes.STRING,
            allowNull:false
        },
        /* certificado:{},
        comprometido:{}, */
        idOrdenServicio:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
    });
}