const bodyParser = require('body-parser');
const routerOrdenServicio = require('express').Router();

const {uploadFileOrdenServicio, insertOrdenServicio} = require('../controllers/ordenServicioController');
const { addEjecucionPresupuestariaDetalleOS } = require('../controllers/detalleOrdenServicioController');

const jsonParser = bodyParser.json();
routerOrdenServicio.post('/',uploadFileOrdenServicio.single('file'),async (req,res)=>{
    const formOsBody=JSON.parse(req.body.orden);
    if(req.file) {
        const file=req.file.path;
        formOsBody.file_orden_servicio=file;
    }
    console.log('body del form',formOsBody);
    //console.log('espero sea el file',file);
    
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

routerOrdenServicio.post('/detalle_orden_servicio',async(req,res)=>{
    const detalleOS =req.body;
    try {
        const ejecDOS = await addEjecucionPresupuestariaDetalleOS(detalleOS);
        res.status(200).json(ejecDOS);
    } catch (error) {
        res.status(404).json({error:error.message});
    }
})

module.exports=routerOrdenServicio;
