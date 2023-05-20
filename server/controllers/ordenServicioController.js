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

module.exports = {
    uploadFileOrdenServicio,
}