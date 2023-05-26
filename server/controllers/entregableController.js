const {entregable,estado_entregable,historial_entregable,detalle_orden_servicio} = require('../config/db');
const multer = require('multer');
const { dirname, extname, join } = require('path');
const marks = require('../utils/entregableEstados');
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

const uploadFileEntregable = multer({
    storage:storage,
    fileFilter:(req,file,cb)=>{
        if(MIMETYPES.includes(file.mimetype)) cb(null,true);
        else cb(new Error(`Only ${MIMETYPES.join(' ')} mimetypes are allowed`));
    },
    limits:{
        fieldSize:2000000,
    }
});

const insertEntregable= async({fileEntregable,
    observacion,
    fechaEntregable,
    idDetalleOrdenServicio,ubicacion})=>{
    
    const [entregableInsertado,created] = await entregable.findOrCreate({
        where:{
            idDetalleOrdenServicio:idDetalleOrdenServicio
        },
        defaults:{idDetalleOrdenServicio,
            observacion,fechaEntregable,fileEntregable}
    });
    console.log('imprimimos si fue creado o no', created);
    if(created) {
        const updateDetalleOS = await detalle_orden_servicio.update({estado:'Entregado'},{
        where:{
            idDetalleOrdenServicio:idDetalleOrdenServicio
        }});      
    }
    // agregando estados del entregable
    
    const estado=marks.find((mark)=>{return mark.value===ubicacion});
    
    const estadosActuales = await estado_entregable.findAll({
        where:{
            idEntregable:entregableInsertado.idEntregable
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
     if (estado.level===estadoActual.estadoEntregable) {
        console.log("no huvo cambios en el estado");
     }   else if(estado.level<estadoActual.estadoEntregable){
        const estadoInser = await estado_entregable.create({
            idEntregable:entregableInsertado.idEntregable,
            ubicacion:estado.label,
            observacion,
            estadoEntregable:estado.level,
            fechaEstadoEntregable:fechaEntregable,
        }) ;
        estadoscreados.push(estadoInser);
     }else{
        for (let i = estadoActual.estadoEntregable; i < estado.level; i++) {
            const estadoInser = await estado_entregable.create({
                idEntregable:entregableInsertado.idEntregable,
                ubicacion:marks[i].label,
                observacion,
                estadoEntregable:marks[i].level,
                fechaEstadoEntregable:fechaEntregable,
            }) 
            estadoscreados.push(estadoInser);
        }
     }

    }else{

        for (let i = 0; i < estado.level; i++) {
            const estadoInser = await estado_entregable.create({
                idEntregable:entregableInsertado.idEntregable,
                ubicacion:marks[i].label,
                observacion,
                estadoEntregable:marks[i].level,
                fechaEstadoEntregable:fechaEntregable,
            }) 
            estadoscreados.push(estadoInser);
        }
    }

    if (estado.level===8) {
        console.log('generar devengado en detalleordenservcio');
    }
    if (estado.level===9) {
        console.log('generar giro en detalleordenservicio');
        
    }

    return estadoscreados;
    /**Task for doing */
    // cuando estado.level es 8 generar devengado en el orden de servicio
    // cuando estado.level es 9 generar girado en el orden de servicio

    /**
     * idEntregable
     * ubicacion
     * observacion
     * fechaEstadoEntregable
     */

}

module.exports={
    uploadFileEntregable,
    insertEntregable,

}