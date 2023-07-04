const {DataTypes}=require('sequelize');
module.exports=(dbConnection)=>{
    dbConnection.define('entregable',{
        id_entregable:{ //id_entregable
            type: DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true},
        observacion:{
            type:DataTypes.STRING,
            allowNull:false
        },
        numero_informe:{
            type:DataTypes.STRING,
            allowNull:false
        },
        file_entregable:{//file_entregable
            type:DataTypes.STRING,
            allowNull:false
        },
        fecha_entregable:{//fecha_entregable
            type:DataTypes.DATEONLY,
            allowNull:false
        },
       /*  estado:{
            type:DataTypes.STRING,
            allowNull:false,
            values:['Pendiente','Entregable'],
            defaultValue:'Pendiente'
        } */
    }

    );
}