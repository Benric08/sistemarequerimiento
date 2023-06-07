const {DataTypes} = require('sequelize');
const {marksRequerimiento} = require('../utils/estadosEntregable');
const ubicaciones = marksRequerimiento.map((mark)=>mark.label);
const estados = marksRequerimiento.map((mark)=>mark.level);
module.exports=(dbConnection)=>{
    dbConnection.define('estado_requerimiento',{
        id_estado_requerimiento:{//id_estado_requerimiento
            type: DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true},
       
        ubicacion:{
            type:DataTypes.STRING,
            allowNull:false,
            values: ubicaciones
        },
        estado_requerimiento:{ //estado_requerimiento
            type:DataTypes.INTEGER,
            allowNull:false,
            values: estados
        },
        fecha_estado_requerimiento:{//fecha_estado_requerimiento
            type:DataTypes.DATEONLY,
            allowNull:false
        },
        observacion:{
            type:DataTypes.STRING,
            allowNull:false,
            defaultValue:'Ninguna'
        },
        valor_estado:{//valor_estado
            type:DataTypes.VIRTUAL,
            get() {
                return marksRequerimiento[this.estado_requerimiento-1].value ;
              }
        } 
    }, {
        hooks: {
          beforeValidate: (estadoReq) => {
            if (estadoReq.observacion === null || estadoReq.observacion === undefined || estadoReq.observacion === '') {
                estadoReq.observacion = 'Ninguna'; //Establecer valor por defecto
            }
          }
        }
      });
}