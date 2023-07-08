const {requerimiento,estado_requerimiento} = require('../config/db');
const { marksRequerimiento } = require('../utils/estadosEntregable');

const createRequerimiento = async({descripcion,detalle,unidad_medida,cantidad,precio_unitario})=>{
    const newRequerimiento = await requerimiento.create({
        descripcion,
        detalle,
        unidad_medida,
        cantidad:+cantidad,
        precio_unitario:+precio_unitario
    });

    return newRequerimiento;
}

const updateRequerimiento = async(id,updateRequerimiento)=>{
    //const requerimiento = getRequerimientoById(id);
    const requerimientoUpdated = await requerimiento.update(updateRequerimiento,{
        where:{
            id_requerimiento:id
        }
    }).then(()=>getRequerimientoById(id))
    .catch((error)=>error);



    return requerimientoUpdated;
} 

const getRequerimientoById=async(id)=>{
    const requerimientoById = await requerimiento.findByPk(id);
    return requerimientoById;
}

const getAllRequirements = async()=>{
    const allRequirements = await requerimiento.findAll({attributes:['descripcion','detalle','unidad_medida','cantidad','precio_unitario','total']});
    return allRequirements;
}
const deleteRequerimiento = async(id)=>{
    const deleteRequirement = await requerimiento.destroy({
        where:{
            id_requerimiento:id
        }
    });
    return deleteRequirement;
}

const addEstadoRequerimiento = async(estadoRequerimiento)=>{
    const {id_requerimiento,observacion,fechaRequerimiento,sliderUbicacion} = estadoRequerimiento;
    const estado=marksRequerimiento.find((mark)=>{return mark.value===sliderUbicacion});
    
    const estadosActuales = await estado_requerimiento.findAll({
        where:{
            id_requerimiento:id_requerimiento
        }
    });
    const estadoscreados=[];
    let estadoActual={};
    if(estadosActuales.length>0){
        // si el valor es menor solo se agrega un registro
        
        estadoActual=estadosActuales.pop();
        console.log('ultimo esatdo',estadoActual);
        if (estado.level===estadoActual.estado_requerimiento) {
            console.log("no huvo cambios en el estado");
        }   else if(estado.level<estadoActual.estado_requerimiento){
            const estadoInser = await estado_requerimiento.create({
                id_requerimiento:id_requerimiento,
                ubicacion:estado.label,
                observacion,
                estado_requerimiento:estado.level,
                fecha_estado_requerimiento:fechaRequerimiento,
            }) ;
            estadoscreados.push(estadoInser);
        }else{
            for (let i = estadoActual.estado_requerimiento; i < estado.level; i++) {
                const estadoInser = await estado_requerimiento.create({
                    id_requerimiento:id_requerimiento,
                    ubicacion:marksRequerimiento[i].label,
                    observacion,
                    estado_requerimiento:marksRequerimiento[i].level,
                    fecha_estado_requerimiento:fechaRequerimiento,
                }) 
                estadoscreados.push(estadoInser);
            }
        }

    }else{

        for (let i = 0; i < estado.level; i++) {
            const estadoInser = await estado_requerimiento.create({
                id_requerimiento:id_requerimiento,
                ubicacion:marksRequerimiento[i].label,
                observacion,
                estado_requerimiento:marksRequerimiento[i].level,
                fecha_estado_requerimiento:fechaRequerimiento,
            }) ;
            estadoscreados.push(estadoInser);
        }
    }

    const er = await getEstadoRequerimiento();

    return er;

}

const getEstadoRequerimiento = async ()=>{
    //console.log('me estan llamando get estado Requerimiento');
    const estadosRequerimiento = await requerimiento.findAll({
        include:[{
                model:estado_requerimiento,
                order: [['createdAt', 'DESC']],
                limit: 1
        }]
      });
    return estadosRequerimiento;
    /* const allRequirements = await requerimiento.findAll({attributes:['descripcion','detalle','unidad_medida','cantidad','precio_unitario','total']});
    return allRequirements; */
}
module.exports={
    createRequerimiento,
    getAllRequirements,
    getRequerimientoById,
    updateRequerimiento,
    deleteRequerimiento,
    addEstadoRequerimiento,
    getEstadoRequerimiento
}