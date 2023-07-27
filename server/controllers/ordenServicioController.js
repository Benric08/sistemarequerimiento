const {orden_servicio,proveedor,detalle_orden_servicio,detalleos_ejecucion_presupuestaria} = require('../config/db');
const multer = require('multer');
const { dirname, extname, join } = require('path');



const CURRENT_DIR = dirname(require.resolve('./ordenServicioController.js'));
const MIMETYPES = ['image/jpeg', 'image/png', 'application/pdf'];
console.log("current dir",CURRENT_DIR);

console.log('current plus path',join(CURRENT_DIR, '../file_uploads/orden_servicio'));
const storage = multer.diskStorage({
   

    destination: join(CURRENT_DIR, '../file_uploads/orden_servicio'),
    filename: (req, file, cb) => {
            
            const fileExtension = extname(file.originalname);
            const fileName = file.originalname.split(fileExtension)[0];

            cb(null, `OS-${Date.now()}${fileExtension}`);
    },
  });

const uploadFileOrdenServicio = multer({
    storage:storage,
    fileFilter:(req,file,cb)=>{
        if(MIMETYPES.includes(file.mimetype)) cb(null,true);
        else cb(new Error(`Only ${MIMETYPES.join(' ')} mimetypes are allowed`));
    },
    limits:{
        fieldSize:20000000,
    }
});

const insertOrdenServicio = async(formordenServicio)=>{
  //insertar proveedor
  const {proveedorf} = formordenServicio;
  console.log('recueprando el provvedor en el controlador',proveedor);
  const [newProveedor,created]=await proveedor.findOrCreate({
    where: { dni: proveedorf.dni },
    defaults: proveedorf
  });
  console.log('proveedor insertado',newProveedor);
  //instertar orden servicio
  const {numero_orden_servicio,
    id_requerimiento,
  numero_certificacion,
  expediente_siaf,
  fecha_orden_servicio,
  file_orden_servicio,
  precio_unitario,
  cantidad,meta,clasificador}= formordenServicio;

  const ordenServicio={
    numero_orden_servicio,
    id_requerimiento,
    numero_certificacion,
    expediente_siaf,
    fecha_orden_servicio,
    file_orden_servicio,
    meta,
    clasificador,
    id_proveedor:newProveedor.id_proveedor
  }

   const newOrdenServicio = await orden_servicio.create(ordenServicio);
  //insertar orden Servico Detalle
  const detalleordenServicio={
    id_orden_servicio:newOrdenServicio.id_orden_servicio,
    monto_orden_servicio:precio_unitario,
    fecha_vencimiento:newOrdenServicio.fecha_orden_servicio
  }
  const arrDetalles=[];
  const cardinals=['','Primer','Segundo','Tercer','Cuarto','Quinto','Sexto','Septimo','Octavo','Noveno']
  for (let i = 1; i <= cantidad; i++) {
    const fecha = new Date(detalleordenServicio.fecha_vencimiento);
    const fechaSumada = new Date(fecha.getTime() + (30 * 24 * 60 * 60 * 1000));
    console.log('fecha con suma de 30 dias',fechaSumada);
    const dia = fechaSumada.getDate();
    const mes = fechaSumada.getMonth() + 1;
    const año = fechaSumada.getFullYear();
    const fechaFormateada = `${año}-${mes<10?'0'+mes:mes}-${dia<10?'0'+dia:dia}`;
    console.log(fechaFormateada);
    detalleordenServicio['fecha_vencimiento'] = fechaFormateada;
    detalleordenServicio['descripcion'] = `${cardinals[i]} Entregable`;
    arrDetalles.push(await detalle_orden_servicio.create(detalleordenServicio));
    
  }


  return {
    orden_servicio:{
      ...newOrdenServicio.dataValues,
      detalle_orden_servicios:arrDetalles
    },
    id_requerimiento
    

  }
  //return newOrdenServicio;
  //inserar detalle orden servicio
  //insertar detalleos ejecucion pressupuestaria

}

module.exports = {
    uploadFileOrdenServicio,
    insertOrdenServicio
}