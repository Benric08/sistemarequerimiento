const { detalle_entregable } = require('../config/db');
const multer = require('multer');
const { dirname, extname, join } = require('path');
const CURRENT_DIR = dirname(require.resolve('./detalleEntregableController.js'));
const MIMETYPES = ['application/pdf'];
const uploadFile = () => {
    const storage = multer.diskStorage({
        destination: join(CURRENT_DIR, '../file_uploads/entregables/detalle'),
        filename: (req, file, cb) => {
            
            const fileExtension = extname(file.originalname);
            cb(null, `${file.fieldname}-${Date.now()}${fileExtension}`);
        },
    });
    const uploadFileOrdenServicio = multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            if (MIMETYPES.includes(file.mimetype)) cb(null, true);
            else cb(new Error(`Solo archivos ${MIMETYPES.join(' ')} son admitidos`));
        },
        limits: {
            fieldSize: 20000000,
        }
    }).fields([{name:'IC' , maxCount:1},{name:'RHE', maxCount:1},{name:'CP', maxCount:1}]);
    return uploadFileOrdenServicio;
}
const addDetalleEntregable = async (detalleEntregable) => {
    console.log('insertando en detealle Entregable',detalleEntregable);
    
        const addDetalleEntre = await detalle_entregable.create(detalleEntregable);
        if (addDetalleEntre) {
            return addDetalleEntre;
        }
        throw new Error("no se inserto en la base de datos");
}
module.exports ={
    uploadFile,
    addDetalleEntregable
}