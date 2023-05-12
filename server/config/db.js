require('dotenv').config();
const {Sequelize, DataTypes} = require('sequelize');
const requerimiento = require('../models/Requerimiento');
const ordenServicio = require('../models/Orden_Servicio');

const {DB_HOST,DB_PASSWORD,DB_DATABASE_NAME,DB_USER_NAME} = process.env;
const dbConnection = new Sequelize(`postgres://${DB_USER_NAME}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE_NAME}`);

requerimiento(dbConnection);
ordenServicio(dbConnection);

console.log(dbConnection.models);



module.exports={
    dbConnection,
    ...dbConnection.models
}