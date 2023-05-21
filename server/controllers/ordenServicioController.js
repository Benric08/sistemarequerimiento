const {Orden_Servicio,Proveedor,Detalle_Orden_Servicio,Detalleos_Ejecucion_Presupuestaria} = require('../config/db');
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
  const {proveedor} = formordenServicio;

  

  const newProveedor=await Proveedor.create(proveedor);
  //return newProveedor;
  //obteneridprovedor
  //instertar orden servicio
  const {numeroOrdenServicio,
    idRequerimiento,
  numeroCertificacion,
  expedienteSiaf,
  fechaOrdenServicio,
  fileOrdenServicio,
  precio_unitario,
  cantidad}= formordenServicio;

  const ordenServicio={
    numeroOrdenServicio,
    idRequerimiento,
    numeroCertificacion,
    expedienteSiaf,
    fechaOrdenServicio,
    fileOrdenServicio,
    idProveedor:newProveedor.idProveedor
  }

 /*  {"numeroOrdenServicio":"283",
"idRequerimiento":1,
  "numeroCertificacion":"1290",
  "expedienteSiaf":"123",
  "fechaOrdenServicio":"2023-04-20",
  "fileOrdenServicio":"/os-richard.pdf",
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

  

  const newOrdenServicio = await Orden_Servicio.create(ordenServicio);
  
  const detalleordenServicio={
    idOrdenServicio:newOrdenServicio.idOrdenServicio,
    montoOrdenServicio:precio_unitario,
    fechaVencimiento:newOrdenServicio.fechaOrdenServicio
  }
  const arrDetalles=[];
  for (let i = 1; i <= cantidad; i++) {
    const fecha = new Date(detalleordenServicio.fechaVencimiento);
    const fechaSumada = new Date(fecha.getTime() + (31 * 24 * 60 * 60 * 1000));
    console.log(fechaSumada);
    const dia = fechaSumada.getDate();
    const mes = fechaSumada.getMonth() + 1;
    const año = fechaSumada.getFullYear();
    const fechaFormateada = `${año}-${mes<10?'0'+mes:mes}-${dia<10?'0'+dia:dia}`;
    console.log(fechaFormateada);
    detalleordenServicio['fechaVencimiento']=fechaFormateada;
    arrDetalles.push(await Detalle_Orden_Servicio.create(detalleordenServicio));
    
  }
  return {
    ...newOrdenServicio,
    proveedor:newProveedor,
    detalleOrdenServiciop:arrDetalles

  }
  //return newOrdenServicio;
  //inserar detalle orden servicio
  //insertar detalleos ejecucion pressupuestaria

}

module.exports = {
    uploadFileOrdenServicio,
    insertOrdenServicio
}