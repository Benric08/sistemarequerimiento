const routerRequerimiento = require('express').Router();


const {createRequerimiento, getAllRequirements, getRequerimientoById, updateRequerimiento} = require('../controllers/requerimientoController');
routerRequerimiento.post('/',async(req,res)=>{
    const requerimiento=req.body;
    console.log(`imprimiendo el objeto del post insert element`, requerimiento);
    try {
       const newRequerimineto = await createRequerimiento(requerimiento);
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
routerRequerimiento.get('/:id',async (req,res)=>{
    const {id} = req.params;
    console.log(`imprimiendo el id ${id}`);
    try {
        const requerimiento = await getRequerimientoById(parseInt(id));
        console.log('vemos la consulta',requerimiento);
        if(requerimiento)  res.status(200).json(requerimiento);
        else throw new Error("empty");
    } catch (error) {
        res.status(404).json({"error": `${error.message}`});
    }
});
routerRequerimiento.put('/:id',async (req,res)=>{
    const {id} = req.params;
    const modifyRequerimiento=req.body;
    console.log(`imprimiendo el id del put routes ${id}`);
    console.log(`imprimiendo el objeto recibido en put`,modifyRequerimiento);
    try {
        const requerimiento = await updateRequerimiento(parseInt(id),modifyRequerimiento);
        console.log('vemos la consulta',requerimiento);
        if(requerimiento[0])  res.status(200).json(requerimiento);
        else throw new Error("No se realizo la actualizacion");
    } catch (error) {
        res.status(404).json({"error": `${error.message}`});
    }
}); 


module.exports=routerRequerimiento;
