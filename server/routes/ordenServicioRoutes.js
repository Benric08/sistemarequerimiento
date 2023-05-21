
const routerOrdenServicio = require('express').Router();

const {uploadFileOrdenServicio, insertOrdenServicio} = require('../controllers/ordenServicioController');


routerOrdenServicio.post('/',async (req,res)=>{
    const formOsBody=req.body
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
