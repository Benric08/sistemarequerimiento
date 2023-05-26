const bodyParser = require('body-parser');
const routerEntregable = require('express').Router();

const {uploadFileEntregable, insertEntregable} = require('../controllers/entregableController');

const jsonParser = bodyParser.json();
routerEntregable.post('/',async (req,res)=>{
    const formOsBody=req.body
    console.log('body del form',formOsBody);
    //console.log('espero sea el file',file);
    
    try {
        const Entregable = await insertEntregable(formOsBody);
        res.status(200).json(Entregable);
    } catch (error) {
        res.status(404).json({error:error.message});
    } 
    
});
/* routerEntregable.post('/',uploadFileEntregable.single('file'),async (req,res)=>{
    const formOsBody=JSON.parse(req.body.entregable);
    if(req.file) {
        const file=req.file.path;
        formOsBody.fileEntregable=file;
    }
    console.log('body del form',formOsBody);
    //console.log('espero sea el file',file);
    
    try {
        const Entregable = await insertEntregable(formOsBody);
        res.status(200).json(Entregable);
    } catch (error) {
        res.status(404).json({error:error.message});
    } 
    
}); */


module.exports=routerEntregable;
