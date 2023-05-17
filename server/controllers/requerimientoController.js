const {Requerimiento} = require('../config/db');

const createRequerimiento = ({descripcion,detalle,unidad_medida,cantidad,precio_unitario})=>{
    const newRequerimiento = Requerimiento.create({
        descripcion,
        detalle,
        unidad_medida,
        cantidad:+cantidad,
        precio_unitario:+precio_unitario
    });

    return newRequerimiento;
}

const updateRequerimiento = (id,updateRequerimiento)=>{
    //const requerimiento = getRequerimientoById(id);
    const requerimientoUpdated = Requerimiento.update(updateRequerimiento,{
        where:{
            idRequerimiento:id
        }
    });

    return requerimientoUpdated;
} 

const getRequerimientoById=(id)=>{
    const requerimiento = Requerimiento.findByPk(id);
    return requerimiento;
}

const getAllRequirements = ()=>{
    const allRequirements = Requerimiento.findAll({attributes:['descripcion','detalle','unidad_medida','cantidad','precio_unitario','total']});
    return allRequirements;
}

module.exports={
    createRequerimiento,
    getAllRequirements,
    getRequerimientoById,
    updateRequerimiento
}