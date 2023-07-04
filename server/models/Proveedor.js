const {DataTypes}=require('sequelize');

module.exports=(dbConnection)=>{
    dbConnection.define('proveedor',{
    
        id_proveedor:{
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
            allowNull:false,
            validate:{
                len:[8],
                isNumeric:true
            }
        },
        ruc:{
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                len:[11],
                isNumeric:true
            }
        },
        nombre_completo:{
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.apellido_paterno} ${this.apellido_materno } ${this.nombre}`;
              },
              set(value) {
                throw new Error('No trate de modificar el `nombre completo`');
              }
        }, 
        celular:{
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                len:[9],
                isNumeric:true
            }
        }
    
    });
}