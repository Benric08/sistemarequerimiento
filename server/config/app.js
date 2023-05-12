const express = require('express');
const app = express();
const requerimientoRoutes = require('../routes/requerimientoRoutes');

app.use(express.json());

app.use('/requerimiento',requerimientoRoutes);



module.exports=app;