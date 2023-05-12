const routerRequerimiento = require('express').Router();

const {createRequerimiento} = require('../controllers/requerimientoController');
routerRequerimiento.post('/',async(req,res)=>{
    const requerimiento=req.body;
    console.log(requerimiento);
    try {
       const newRequerimineto= await createRequerimiento(requerimiento);
       res.status(200).json(newRequerimineto);
    } catch (error) {
        res.status(404).json({"error": `${error.message}`});
    }
});


module.exports=routerRequerimiento;
