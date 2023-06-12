const {DataTypes}=require('sequelize');
const bcrypt = require('bcrypt');
module.exports=(dbConnection)=>{
    dbConnection.define('usuario',{
        id_usuario:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true

        },
        nombre_usuario:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            
        }
    },{
        timestamps:false,
        hooks:{
           async beforeCreate(usuario){
            
                //console.log('me ejecute hook before creaeed ',usuario);
                const saltRounds = 10;
                //console.log('usuariopass',usuario.password);
                const hashedPassword = await bcrypt.hash(usuario.password, saltRounds);
                //console.log('password generedo',hashedPassword);
                usuario.password = hashedPassword;
            
           }
        }

        
    });
}