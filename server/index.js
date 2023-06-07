require('dotenv').config();
const {PORT} = process.env;
const server = require('./config/app');
const {dbConnection} = require('./config/db');


dbConnection.sync({force:false})
.then(()=>{
    
    server.listen(PORT,()=>{
        console.log(`server running in http://localhost:${PORT}`);
    });
}); 