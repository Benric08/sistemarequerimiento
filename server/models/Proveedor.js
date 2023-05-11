const {DataTypes}=require('sequelize');

module.exports=(dbConnection)=>{
    dbConnection.define('Proveedor',{
    
        idProveedor:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull:false
        },
        apellido_paterno:{
            type: DataTypes.STRING,
            allowNull:false
        },
        apellido_materno:{
            type: DataTypes.STRING,
            allowNull:false
        },
        dni:{
            type: DataTypes.STRING,
            
        },
        ruc:{
            type: DataTypes.STRING,
            
        },
    
    });
}