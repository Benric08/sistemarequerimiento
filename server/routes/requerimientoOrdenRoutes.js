const routerRequerimientoOrden = require('express').Router();

const {getRequerimientoOrdenServicio, getFiles} = require('../controllers/requerimientoOrdenController');

routerRequerimientoOrden.get('/detalle',async (req,res)=>{
    
    try {
        const requerimientoOrden = await getRequerimientoOrdenServicio();
        res.status(200).json(requerimientoOrden);    
    } catch (error) {
        res.status(404).json(error.message);
    }
});
routerRequerimientoOrden.get('/documentospdf',async (req,res)=>{
    
    try {
        const documentosPdf = await getFiles();
        res.status(200).json(documentosPdf);    
    } catch (error) {
        res.status(404).json(error.message);
    }
});

module.exports=routerRequerimientoOrden;