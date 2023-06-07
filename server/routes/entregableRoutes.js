const bodyParser = require('body-parser');
const routerEntregable = require('express').Router();

const {uploadfile_entregable, insertEntregable, getEntregableByIdDOS} = require('../controllers/entregableController');

const jsonParser = bodyParser.json();
/* routerEntregable.post('/',async (req,res)=>{
    const formOsBody=req.body
    console.log('body del form',formOsBody);
    //console.log('espero sea el file',file);
    
    try {
        const estado_entregable = await insertEntregable(formOsBody);
        res.status(200).json(estado_entregable);
    } catch (error) {
        res.status(404).json({error:error.message});
    } 
    
}); */
routerEntregable.post('/',uploadfile_entregable.single('file'),async (req,res)=>{
    const formOsBody=JSON.parse(req.body.entregable);
    if(req.file) {
        const file=req.file.path;
        formOsBody.file_entregable=file;
    }
    console.log('body del form',formOsBody);
    //console.log('espero sea el file',file);
    
    try {
        const estado_entregable = await insertEntregable(formOsBody);
        res.status(200).json(estado_entregable);
    } catch (error) {
        res.status(404).json({error:error.message});
    } 
    
}); 

routerEntregable.get('/estado',async(req,res)=>{
    try {
        
        
        const lastEstado = await  getEntregableByIdDOS();
        
        res.status(200).json(lastEstado);
    } catch (error) {
        res.status(404).json({error:error.message});
    }
});




module.exports=routerEntregable;
