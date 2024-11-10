const mysql = require ('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});


db.getConnection((err, connection) => {
    if (err) {
        // Verificamos el código del error
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log("Error en la base de datos: se perdió la conexión.");
        } else if (err.code === 'ER_CON_COUNT_ERROR') {
            console.log("Error en la base de datos: se superó la cantidad de conexiones.");
        } else if (err.code === 'ECONNREFUSED') {
            console.log("Error en la base de datos: conexión rechazada.");
        } else {
            console.log("Error en la conexión a la base de datos:", err);
        }
    }

    if (connection) {
        connection.release();
        console.log("Conexion a db exitosa");
    }


});



module.exports = db; //exporto "db"