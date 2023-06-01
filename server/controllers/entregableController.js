const {entregable,estado_entregable,historial_entregable,detalle_orden_servicio,orden_servicio,dbConnection} = require('../config/db');
const multer = require('multer');
const { dirname, extname, join } = require('path');
const marks = require('../utils/entregableEstados');
const { QueryTypes } = require('sequelize');

const CURRENT_DIR = dirname(require.resolve('./ordenServicioController.js'));
const MIMETYPES = ['image/jpeg', 'image/png', 'application/pdf'];
console.log("current dir",CURRENT_DIR);

const storage = multer.diskStorage({

    destination: join(CURRENT_DIR, '../file_uploads/entregables'),
    filename: (req, file, cb) => {
            
            const fileExtension = extname(file.originalname);
            const fileName = file.originalname.split(fileExtension)[0];

            cb(null, `${Date.now()}-OS-${fileName}${fileExtension}`);
    },
  });

const uploadfile_entregable = multer({
    storage:storage,
    fileFilter:(req,file,cb)=>{
        if(MIMETYPES.includes(file.mimetype)) cb(null,true);
        else cb(new Error(`Only ${MIMETYPES.join(' ')} mimetypes are allowed`));
    },
    limits:{
        fieldSize:2000000,
    }
});

const insertEntregable= async({file_entregable,
    observacion,
    fecha_entregable,
    id_detalle_os,ubicacion})=>{
    
    const [entregableInsertado,created] = await entregable.findOrCreate({
        where:{
            id_detalle_os:id_detalle_os
        },
        defaults:{id_detalle_os,
            observacion,fecha_entregable,file_entregable}
    });
    console.log('imprimimos si fue creado o no', created);
    if(created) {
        const updateDetalleOS = await detalle_orden_servicio.update({estado:'Entregado'},{
        where:{
            id_detalle_os:id_detalle_os
        }});      
    }
    // agregando estados del entregable
    
    const estado=marks.find((mark)=>{return mark.value===ubicacion});
    
    const estadosActuales = await estado_entregable.findAll({
        where:{
            id_entregable:entregableInsertado.id_entregable
        }
    });
    const estadoscreados=[];
    let estadoActual={};
    if(estadosActuales.length>0){
    // si el valor es menor solo se agrega un registro
    // ordenar por fecha de agregado
        /* estadosActuales.sort((a,b)=>a.createdAt>b.createdAt);
        console.log('Estados ordenados por fecha',estadosActuales); */
     estadoActual=estadosActuales.pop();
     console.log('ultimo esatdo',estadoActual);
     if (estado.level===estadoActual.estado_entregable) {
        console.log("no huvo cambios en el estado");
     }   else if(estado.level<estadoActual.estado_entregable){
        const estadoInser = await estado_entregable.create({
            id_entregable:entregableInsertado.id_entregable,
            ubicacion:estado.label,
            observacion,
            estado_entregable:estado.level,
            fecha_estado_entregable:fecha_entregable,
        }) ;
        estadoscreados.push(estadoInser);
     }else{
        for (let i = estadoActual.estado_entregable; i < estado.level; i++) {
            const estadoInser = await estado_entregable.create({
                id_entregable:entregableInsertado.id_entregable,
                ubicacion:marks[i].label,
                observacion,
                estado_entregable:marks[i].level,
                fecha_estado_entregable:fecha_entregable,
            }) 
            estadoscreados.push(estadoInser);
        }
     }

    }else{

        for (let i = 0; i < estado.level; i++) {
            const estadoInser = await estado_entregable.create({
                id_entregable:entregableInsertado.id_entregable,
                ubicacion:marks[i].label,
                observacion,
                estado_entregable:marks[i].level,
                fecha_estado_entregable:fecha_entregable,
            }) ;
            estadoscreados.push(estadoInser);
        }
    }

    /* if (estado.level===8) {
        console.log('generar devengado en detalleordenservcio');
    }
    if (estado.level===9) {
        console.log('generar giro en detalleordenservicio');
        
    } */

    const ea = await getEntregableByIdDOS();

    return ea;
    /**Task for doing */
    // cuando estado.level es 8 generar devengado en el orden de servicio
    // cuando estado.level es 9 generar girado en el orden de servicio

    /**
     * id_entregable
     * ubicacion
     * observacion
     * fecha_estado_entregable
     */

}


const getEntregableByIdDOS = async ()=>{
    /* const entregableR = await entregable.findAll({
        where:{
            id_detalle_os : id_detalle_os
        },
        include: [{
            model: estado_entregable,
            order:[['createdAt', 'DESC']],
            limit: 1
          }]
      }); */
    const entregableR = await detalle_orden_servicio.findAll({
        /* where:{
            id_detalle_os : id_detalle_os
        }, */
        include:[{
            model:entregable,
            include:[{
                model:estado_entregable,
                order: [['createdAt', 'DESC']],
                limit: 1
            }] 
        }]
      });
    return entregableR;
}
/* const getEntregableByIdDOS = async (id_detalle_os)=>{
    const entregableR = await entregable.findOne({
        where:{
            id_detalle_os : id_detalle_os
        }
      });
      console.log('quiero ver que es entregableR ',entregableR);
    if(entregableR){
        const lastEstadoEntregable = await estado_entregable.findOne({
            where:{
                id_entregable : entregableR.id_entregable
            },
            order: [['createdAt', 'DESC']],
            limit: 1
          }
    
        );
        return lastEstadoEntregable;
    }else return {};
} */
module.exports={
    uploadfile_entregable,
    insertEntregable,
    getEntregableByIdDOS
}