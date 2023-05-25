const {DataTypes} = require('sequelize');

module.exports=(dbConnection)=>{
    dbConnection.define('estado_entregable',{
        idEstadoEntregable:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true},
        idEntregable:{
            type:DataTypes.INTEGER,
            allowNull:false 
        },
        ubicacion:{
            type:DataTypes.STRING,
            allowNull:false,
            values:['Procompite','Mesa de partes','Gerencia de Desarrollo Economico','Administracion','Logistica','Contabilidad','Tesoreria']
        },
        fechaEstadoEntregable:{
            type:DataTypes.DATEONLY,
            allowNull:false
        },
        observacion:{
            type:DataTypes.STRING,
            allowNull:false,
            defaultValue:'Normal'
        } 
    });
}