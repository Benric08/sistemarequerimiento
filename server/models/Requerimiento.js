const {DataTypes} = require('sequelize');

module.exports=(dbConnection)=>{
    dbConnection.define('Requerimeinto',{
        idRequerimiento:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        descripcion:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        detalle:{
            type:DataTypes.STRING,
        },
        estado:{
            type:DataTypes.ENUM,
            values:['Activo','Anulado'],
            allowNull:false
        },
        
        unidad_medida:{
            type:DataTypes.ENUM,
            values:['Bien','Servicio'],
            allowNull:false
        },
        cantidad:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        precio_unitario:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        total:{
            type:DataTypes.VIRTUAL,
            get() {
                return this.precio_unitario* this.cantidad;
              },
              set(value) {
                throw new Error('No trate de modificar el `total`');
              }
        }
    
    
    });
}