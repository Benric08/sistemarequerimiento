const {Requerimiento} = require('../config/db');

const createRequerimiento = ({descripcion,detalle,unidad_medida,cantidad,precio_unitario})=>{
    const newRequerimiento= Requerimiento.create({
        descripcion,
        detalle,
        unidad_medida,
        cantidad,
        precio_unitario
    });

    return newRequerimiento;
}

const getAllRequirements = ()=>{
    const allRequirements = Requerimiento.findAll({attributes:['descripcion','detalle','unidad_medida','cantidad','precio_unitario','total']});
    return allRequirements;
}

module.exports={
    createRequerimiento,
    getAllRequirements
}