const { usuario } = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createUser = async ({ email, nombre_usuario, password }) => {
    //console.log('veamos que tenemos en el controler de usuario',usuarioToInsert);


    const newUser = await usuario.create({ email, nombre_usuario, password });
    return newUser;
}

const getUserToken = async ({ nombre_usuario, password }) => {
    /* try { */
        const userFound = await usuario.findOne({ where: { nombre_usuario:nombre_usuario } })
        console.log("VEMOS SI treaemos de la bd",userFound);
        if (!userFound) {
            console.log('ingresando al no encontrado'.userFound);
            throw new Error("Email o Contraseña no coinciden" );
        }
        const confirmaPass = await bcrypt.compare(password, userFound.password);
        console.log('veamos que devuelve comapre',confirmaPass);
        if (confirmaPass) {
            console.log('ingresando al encontrado iguales',userFound);
            const token = jwt.sign(
                { id: userFound.id_usuario, usuario: userFound.nombre_usuario },
                process.env.JWT_SECRET
                )
                return token;
        } else {
            console.log('ingresando al encontrado no iguales',userFound);
                
            throw new Error( "Email o Contraseña no coinciden" );
        }
   /*  } catch (error) {
        console.log(error.message);
    } */


}
module.exports = {
    createUser,
    getUserToken
}