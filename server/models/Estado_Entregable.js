const {DataTypes} = require('sequelize');
const marks = require('../utils/entregableEstados');
const ubicaciones = marks.map((mark)=>mark.label);
const estados = marks.map((mark)=>mark.level);
module.exports=(dbConnection)=>{
    dbConnection.define('estado_entregable',{
        id_estado_entregable:{//id_estado_entregable
            type: DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true},
       
        ubicacion:{
            type:DataTypes.STRING,
            allowNull:false,
            values: ubicaciones
        },
        estado_entregable:{ //estado_entregable
            type:DataTypes.INTEGER,
            allowNull:false,
            values: estados
        },
        fecha_estado_entregable:{//fecha_estado_entregable
            type:DataTypes.DATEONLY,
            allowNull:false
        },
        observacion:{
            type:DataTypes.STRING,
            allowNull:false,
            defaultValue:'Normal'
        },
        valor_estado:{//valor_estado
            type:DataTypes.VIRTUAL,
            get() {
                return marks[this.estado_entregable-1].value ;
              }
        } 
    });
}