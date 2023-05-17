const express = require('express');
const app = express();
const cors = require('cors');
const requerimientoRoutes = require('../routes/requerimientoRoutes');

app.use(cors());
app.use(express.json());
app.use('/requerimiento',requerimientoRoutes);



module.exports=app;