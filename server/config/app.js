const express = require('express');
const app = express();
const cors = require('cors');
const requerimientoRoutes = require('../routes/requerimientoRoutes');
const routerOrdenServicio = require('../routes/ordenServicioRoutes');

app.use(cors());
app.use(express.json());
app.use('/requerimiento',requerimientoRoutes);
app.use('/orden_servicio',routerOrdenServicio);


module.exports=app;