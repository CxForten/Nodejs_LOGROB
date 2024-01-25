const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'CxForten',
    password: '123456789', //Cambiar por la contraseña de acceso a la base de
    database: 'node_crud'
});

conexion.connect((error)=>{
    if(error){
        console.error("El error de conexion es: "+error);
        return
    }
    console.log('Conectado a la BD MySQL')
})

module.exports = conexion;