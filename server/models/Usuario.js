const {DataTypes}=require('sequelize');

module.exports=(dbConnection)=>{
    dbConnection.define('Usuario',{
        id_usuario:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull:true,
        },
        apellido_paterno:{
            type: DataTypes.STRING,
            allowNull:true,
        },
        apellido_materno:{
            type: DataTypes.STRING,
            allowNull:true,
        },
        correo_electronico:{
            type: DataTypes.STRING,
            allowNull:true,
            unique:true
        },
        contrasenia:{
            type: DataTypes.STRING,
            allowNull:true,
        },
    })
}