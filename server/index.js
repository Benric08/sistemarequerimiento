const server = require('./config/app');
const {dbConnection} = require('./config/db');
const PORT = 3001;

dbConnection.sync({force:true})
.then(()=>{
    
    server.listen(PORT,()=>{
        console.log(`server running in http://localhost:${PORT}`);
    });
});