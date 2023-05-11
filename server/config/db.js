require('dotenv').config();
const {Sequelize, DataTypes} = require('sequelize');

const {DB_HOST,DB_PASSWORD,DB_DATABASE_NAME,DB_USER_NAME} = process.env;
const dbConnection = new Sequelize(`postgres://${DB_USER_NAME}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE_NAME}`);





module.exports={
    dbConnection
}