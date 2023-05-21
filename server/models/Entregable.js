const {DataTypes}=require('sequelize');
module.exports=(dbConnection)=>{
    dbConnection.define('Entregable',{
        idEntregable:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true},
        idDetalleOrdenServicio:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        descripcion:{
            type:DataTypes.STRING,
            allowNull:false
        },
        fileEntregable:{
            type:DataTypes.STRING,
            allowNull:false
        },
        fechaEntregable:{
            type:DataTypes.DATEONLY,
            allowNull:false
        },
        estado:{
            type:DataTypes.STRING,
            allowNull:false,
            values:['Pendiente','Entregable'],
            defaultValue:'Pendiente'
        }
    }

    )
}