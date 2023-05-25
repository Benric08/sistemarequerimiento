const routerProveedor = require('express').Router();

const {getAllProveedores,getAllProveedoresDetalle} = require('../controllers/proveedorController');

routerProveedor.get('/',async (req,res)=>{
    
    try {
        const allProveedores = await getAllProveedores();
        res.status(200).json(allProveedores);    
    } catch (error) {
        res.status(404).json(error.message);
    }
});
routerProveedor.get('/orden_servicio',async (req,res)=>{
    
    try {
        const allProveedoresDetalle = await getAllProveedoresDetalle();
        res.status(200).json(allProveedoresDetalle);    
    } catch (error) {
        res.status(404).json(error.message);
    }
});

module.exports=routerProveedor;