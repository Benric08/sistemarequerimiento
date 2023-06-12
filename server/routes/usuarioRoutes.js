const routerUsuario = require('express').Router();
const {createUser,getUserToken} = require('../controllers/usuarioController');

routerUsuario.post('/',async (req,res)=>{
    const usuario=req.body;
    //console.log('recuperando el body de usuario',usuario);
    try {
        const usuarioInserted= await createUser(usuario);
        res.status(200).json(usuarioInserted);
    
    } catch (error) {
        res.status(404).json({"error":error});
    }
});
routerUsuario.post('/token',async (req,res)=>{
    const usuario=req.body;
    //console.log('recuperando el body de usuario',usuario);
    try {
        const userToken= await getUserToken(usuario);
        res.status(200).json({token:userToken});
        
    } catch (error) {
        console.log('veamos el error',error);
        res.status(404).json({error:error.message});
    }
});

module.exports=routerUsuario;
