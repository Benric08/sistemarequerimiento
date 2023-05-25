const express = require('express');
const app = express();
const cors = require('cors');
const requerimientoRoutes = require('../routes/requerimientoRoutes');
const routerOrdenServicio = require('../routes/ordenServicioRoutes');
const routerRequerimientoOrden = require('../routes/requerimientoOrdenRoutes');
const routerProveedor = require('../routes/proveedorRoutes');
app.use(cors());
app.use(express.json());
app.use('/requerimiento',requerimientoRoutes);
app.use('/orden_servicio',routerRequerimientoOrden);
app.use('/orden_servicio',routerOrdenServicio);
app.use('/proveedor',routerProveedor);



module.exports=app;