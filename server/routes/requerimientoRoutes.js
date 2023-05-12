const routerRequerimiento = require('express').Router();

const {createRequerimiento, getAllRequirements} = require('../controllers/requerimientoController');
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
routerRequerimiento.get('/',async (req,res)=>{
    try {
        const allRequirements= await getAllRequirements();
        if(allRequirements.length)  res.status(200).json(allRequirements);
        else throw new Error("empty");
    } catch (error) {
        res.status(404).json({"error": `${error.message}`});
    }
});


module.exports=routerRequerimiento;
