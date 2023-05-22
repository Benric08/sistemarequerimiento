const bodyParser = require('body-parser');
const routerOrdenServicio = require('express').Router();

const {uploadFileOrdenServicio, insertOrdenServicio} = require('../controllers/ordenServicioController');

const jsonParser = bodyParser.json();
routerOrdenServicio.post('/',uploadFileOrdenServicio.single('file'),async (req,res)=>{
    const formOsBody=JSON.parse(req.body.orden);
    const file=req.file.path;
    formOsBody.fileOrdenServicio=file;
    console.log('body del form',formOsBody);
    console.log('espero sea el file',file);
    
    try {
        const proveedorInsertado = await insertOrdenServicio(formOsBody);
        res.status(200).json(proveedorInsertado);
    } catch (error) {
        res.status(404).json({error:error.message});
    } 
    
});
/* routerOrdenServicio.post('/',uploadFileOrdenServicio.single('orderServiceFile'),(req,res)=>{
    console.log('imprimiendo el file',req.orderServiceFile);
    res.sendStatus(200);
    
}); */

module.exports=routerOrdenServicio;
