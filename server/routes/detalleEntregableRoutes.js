
const routerDetalleEntregable = require('express').Router();

const {
    addDetalleEntregable,
    
    uploadFile} = require('../controllers/detalleEntregableController');


routerDetalleEntregable.post('/',uploadFile(),async (req,res)=>{
    const formICBody=JSON.parse(req.body.detalleEntregable);
    console.log('body',req.body);
    console.log('files',req.files.IC[0]);
    if(req.files) {
        
        formICBody.file_informe_conformidad=req.files.IC[0].filename;
        formICBody.file_recibo_honorarios=req.files.RHE[0].filename;
        formICBody.file_comprobante_pago=req.files.CP[0].filename;
    }
    console.log('body del form',formICBody);
    //console.log('espero sea el file',file);
    
    try {
        const dataDetalleEntregable = await addDetalleEntregable(formICBody);
        res.status(200).json(dataDetalleEntregable);
    } catch (error) {
        res.status(404).json(error);
    } 
    
});



module.exports=routerDetalleEntregable;
