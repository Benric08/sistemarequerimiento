const {orden_servicio,proveedor,detalle_orden_servicio,detalleos_ejecucion_presupuestaria} = require('../config/db');
const multer = require('multer');
const { dirname, extname, join } = require('path');
const { fileURLToPath } = require('url');


const CURRENT_DIR = dirname(require.resolve('./ordenServicioController.js'));
const MIMETYPES = ['image/jpeg', 'image/png', 'application/pdf'];
console.log("current dir",CURRENT_DIR);

console.log('current plus path',join(CURRENT_DIR, '../file_uploads/orden_servicio'));
const storage = multer.diskStorage({
   /*  destination: function (req, file, cb) {
      cb(null, '/tmp/my-uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    } */

    destination: join(CURRENT_DIR, '../file_uploads/orden_servicio'),
    filename: (req, file, cb) => {
            
            const fileExtension = extname(file.originalname);
            const fileName = file.originalname.split(fileExtension)[0];

            cb(null, `${Date.now()}-OS-${fileName}${fileExtension}`);
    },
  });

const uploadFileOrdenServicio = multer({
    storage:storage,
    fileFilter:(req,file,cb)=>{
        if(MIMETYPES.includes(file.mimetype)) cb(null,true);
        else cb(new Error(`Only ${MIMETYPES.join(' ')} mimetypes are allowed`));
    },
    limits:{
        fieldSize:2000000,
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
  //return newProveedor;
  //obteneridprovedor
  //instertar orden servicio
  const {numero_orden_servicio,
    id_requerimiento,
  numero_certificacion,
  expediente_siaf,
  fecha_orden_servicio,
  file_orden_servicio,
  precio_unitario,
  cantidad}= formordenServicio;

  const ordenServicio={
    numero_orden_servicio,
    id_requerimiento,
    numero_certificacion,
    expediente_siaf,
    fecha_orden_servicio,
    file_orden_servicio,
    id_proveedor:newProveedor.id_proveedor
  }

 /*  {"numero_orden_servicio":"283",
"id_requerimiento":1,
  "numero_certificacion":"1290",
  "expediente_siaf":"123",
  "fecha_orden_servicio":"2023-04-20",
  "file_orden_servicio":"/os-richard.pdf",
  "precio_unitario":"3000",
  "cantidad":"3"
  "proveedor":{"nombre":"Richard",
    "apellido_paterno":"Bendezu",
    "apellido_materno":"Villena",
    "dni":"46300972",
    "ruc":"10463009720",
    "celular":"952064709"}
  } 
  
  {
    "descripcion":"vamos para alla",
    "detalle":"vamos para alla",
    "unidad_medida":"Servicio",
    "cantidad":"3",
    "precio_unitario":"3000",
  }
  */

  

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
    const fechaSumada = new Date(fecha.getTime() + (31 * 24 * 60 * 60 * 1000));
    console.log(fechaSumada);
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