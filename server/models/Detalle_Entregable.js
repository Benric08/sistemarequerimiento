const {DataTypes}=require('sequelize');
module.exports=(dbConnection)=>{
    dbConnection.define('detalle_entregable',{
        id_detalle_entregable:{ //id_entregable
            type: DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        
        numero_informe_conformidad:{
            type:DataTypes.STRING,
            allowNull:false
        },
        file_informe_conformidad:{//file_entregable
            type:DataTypes.STRING,
            allowNull:false
        },
        fecha_informe_conformidad:{//fecha_entregable
            type:DataTypes.DATEONLY,
            allowNull:true
        },
        numero_recibo_honorarios:{
            type:DataTypes.STRING,
            allowNull:false
        },
        file_recibo_honorarios:{//file_entregable
            type:DataTypes.STRING,
            allowNull:false
        },
        fecha_recibo_honorarios:{//fecha_entregable
            type:DataTypes.DATEONLY,
            allowNull:true
        },
        numero_comprobante_pago:{
            type:DataTypes.STRING,
            allowNull:false
        },
        file_comprobante_pago:{//file_entregable
            type:DataTypes.STRING,
            allowNull:false
        },
        fecha_comprobante_pago:{//fecha_entregable
            type:DataTypes.DATEONLY,
            allowNull:true
        },
       
    }

    );
}