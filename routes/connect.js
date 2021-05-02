const mysql = require('mysql');

//crear la conexion
const db = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'',
        database: 'proyectoexpress'
    }
);

//validar conexion 

db.connect((err)=>{
    if(err) throw err;
    console.log('mysql conectado correctamente...')
});

module.exports=db;