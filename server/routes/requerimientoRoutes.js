const routerRequerimiento = require('express').Router();



const {createRequerimiento, getAllRequirements, getRequerimientoById, updateRequerimiento, 
    deleteRequerimiento,
    addEstadoRequerimiento,
    getEstadoRequerimiento} = require('../controllers/requerimientoController');
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
        res.status(200).json(requerimiento);
        
    } catch (error) {
        res.status(404).json({"error": `${error.message}`});
    }
}); 
routerRequerimiento.delete('/:id',async (req,res)=>{
    const {id} = req.params;
    
    try {
        const requerimientoDeleted = await deleteRequerimiento(parseInt(id));
        console.log('vemos la consulta',requerimientoDeleted);
        res.status(200).json(requerimientoDeleted);
        
    } catch (error) {
        res.status(404).json({"error": `${error.message}`});
    }
}); 

routerRequerimiento.post('/detalle/estado',async (req,res)=>{
    
    const estadoRequerimiento=req.body;
    try {
        const estado_requerimiento = await addEstadoRequerimiento(estadoRequerimiento);
        res.status(200).json(estado_requerimiento);
    } catch (error) {
        res.status(404).json({"error":error.message});
    } 
    
}); 

routerRequerimiento.get('/detalle/estado',async(req,res)=>{
    //console.log('soy el controlerr y me estan llamando ');
    try {
        const allRequirements = await getEstadoRequerimiento();
        if(allRequirements.length)  res.status(200).json(allRequirements);
        else throw new Error("empty");
    } catch (error) {
        res.status(404).json({"error": `${error.message}`});
    }
});


module.exports=routerRequerimiento;
