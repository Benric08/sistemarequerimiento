const {DataTypes} = require('sequelize');
const marks = require('../utils/entregableEstados');
const ubicaciones = marks.map((mark)=>mark.label);
const estados = marks.map((mark)=>mark.level);
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
            values: ubicaciones
        },
        estadoEntregable:{
            type:DataTypes.INTEGER,
            allowNull:false,
            values: estados
        },
        fechaEstadoEntregable:{
            type:DataTypes.DATE,
            allowNull:false
        },
        observacion:{
            type:DataTypes.STRING,
            allowNull:false,
            defaultValue:'Normal'
        } 
    });
}