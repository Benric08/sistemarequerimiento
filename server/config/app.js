const express = require('express');
const app = express();
const cors = require('cors');
const { dirname, extname, join } = require('path');
const requerimientoRoutes = require('../routes/requerimientoRoutes');
const routerOrdenServicio = require('../routes/ordenServicioRoutes');
const routerRequerimientoOrden = require('../routes/requerimientoOrdenRoutes');
const routerProveedor = require('../routes/proveedorRoutes');
const routerEntregable = require('../routes/entregableRoutes');
const routerUsuario = require('../routes/usuarioRoutes');
const CURRENT_DIR = dirname(require.resolve('./app.js'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/requerimiento',requerimientoRoutes);
app.use('/orden_servicio',routerRequerimientoOrden);
app.use('/orden_servicio',routerOrdenServicio);
app.use('/proveedor',routerProveedor);
app.use('/entregable',routerEntregable);
app.use('/usuario',routerUsuario);
app.use('/ordenservicio/pdf',express.static(join(CURRENT_DIR, '../file_uploads/orden_servicio')));


module.exports=app;