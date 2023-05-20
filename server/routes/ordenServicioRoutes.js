
const routerOrdenServicio = require('express').Router();

const {uploadFileOrdenServicio} = require('../controllers/ordenServicioController');


routerOrdenServicio.post('/',uploadFileOrdenServicio.single('file'),(req,res)=>{
    console.log('imprimiendo el file',req.file);
    res.sendStatus(200);
    
});

module.exports=routerOrdenServicio;
