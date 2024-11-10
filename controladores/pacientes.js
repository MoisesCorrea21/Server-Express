const path = require('path');
const db = require('../configuraciones/DB.js');
const passport = require('../configuraciones/passport.js');
const { Console } = require('console');
const { message } = require('statuses');

const rcPacientes = {};

rcPacientes.GETlistar = (req, res) => { // busco datos de pacientes en general.
    console.log("hola");
    db.query('SELECT * FROM formulario_registro_paciente', (err, resultado) => { //callback cuando termine de rescatar la tabla
        if (err) {
            return res.status(400).json({ message: 'Error al obtener informacion de pacientes: ' + err.message }); //tiro error si falla la db
        }
        else {
            return res.status(200).json({ message: '+', pacientes: resultado }); //devulev listad pacientes de haberlos
            
        }
    });
};

rcPacientes.GETbusqueda = (req, res) => {
    const query = req.params.query;

    const sql = 'SELECT * FROM formulario_registro_paciente WHERE apellido LIKE ? OR dni LIKE ?';
    const values = [`%${query}%`, `%${query}%`];

    db.query(sql, values, (err, resultados) => {
        if (err) {
            return res.status(400).json({ message: 'Error al buscar pacientes:' + err.message });
        }
        return res.status(200).json({ message: 'Datos obtenidos', data: resultados });
    });
};


rcPacientes.POSTcargar = (req, res) => {
    console.log("Hola");
    console.log(req.body);
    // Obtenemos los datos a cargar del cuerpo de la peticion
    const { nombre, apellido, dni, genero, obraSocial, telefono, correo, fechaNacimiento, direccion } = req.body;

    // Definimos la consulta SQL para insertar los datos
    const sql = 'INSERT INTO formulario_registro_paciente (nombre, apellido, dni, genero, obra_social, telefono, correo_electronico, fecha_nacimiento, direccion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [nombre, apellido, dni, genero, obraSocial, telefono, correo, fechaNacimiento, direccion];
    // Ejecutamos la consulta pasandole los datos a insertar
    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Error al registrar el paciente: ' + err.message });
        }
        return res.status(200).json({ message: 'Registro exitoso', id: result.insertId }); // Devolvemos el mensaje y el ID del paciente insertado
    });
};

rcPacientes.GETpaciente = (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM formulario_registro_paciente WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Error al obtener informacion del paciente:' + err.message });
        }
        return res.status(200).json({ message: 'Informacion obtenida', data: result });
    });
};

rcPacientes.PUTmodificar = (req, res) => {
    const id = req. params.id;
    const { telefono, correo, direccion } = req.body;

    const sql = 'UPDATE formulario_registro_paciente SET telefono = ?, correo_electronico = ?, direccion = ? WHERE id = ?';
    const values = [telefono, correo, direccion, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Error al editar el paciente:' + err.message });
        }
        return res.status(200).json({ message: 'Datos actualizados' });
    });
};

// Con este metodo se elimina el paciente nada mas
rcPacientes.DELETEpaciente = (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM formulario_registro_paciente WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Error al eliminar paciente:' + err.message });
        }
        return res.status(200).json({ message: 'Paciente eliminado' });
    });
};

// Con este elimina el paciente y todas las consultas y anotaciones del mismo paciente
rcPacientes.DELETEdatospaciente = (req, res) => {
    const id = req.params.id;

    const sqlPaciente = 'DELETE FROM formulario_registro_paciente WHERE id = ?';
    const sqlConsulta = 'DELETE FROM consulta_paciente WHERE id_paciente = ?';
    const sqlAnotacion = 'DELETE FROM anotaciones_extra WHERE idPaciente = ?';

    db.query(sqlConsulta, [id], (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Error al eliminar las consultas del paciente:' + err.message });
        }
    });

    db.query(sqlAnotacion, [id], (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Error al eliminar las anotaciones del paciente:' + err.message });
        }
    });

    db.query(sqlPaciente, [id], (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Error al eliminar el paciente:' + err.message });
        }
        return res.status(200).json({ message: 'Paciente eliminado' });
    });
};

rcPacientes.GEThistorial = (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM consulta_paciente WHERE id_paciente = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Error al obtener el historial del paciente:' + err.message });
        }
        return res.status(200).json({ message: 'Historial obtenido', data: result });
    });
};

rcPacientes.POSTconsulta = (req, res) => {
    const { idPatient, fecha, peso, altura, presion, motivo, diagnostico, tratamiento, estudios } = req.body;

    const sql = 'INSERT INTO consulta_paciente (id_paciente, fecha, peso, altura, presion_arterial, diagnostico, tratamiento, estudios_a_realizar, motivo_visita) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [idPatient, fecha, peso, altura, presion, diagnostico, tratamiento, estudios, motivo];

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Error al realizar la consulta:' + err.message });
        }
        return res.status(200).json({ message: 'Registro exitoso', id: result.insertId });
    });
};

rcPacientes.PUTestado = (req, res) => {
    const id = req.params.id;
    const { estado } = req.body;

    const sql = 'UPDATE formulario_registro_paciente SET estado = ? WHERE id = ?';
    const values = [estado, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Error al editar el estado del paciente:' + err.message });
        }
        return res.status(200).json({ message: 'Estado actualizado' });
    });
};

rcPacientes.GETporEstado = (req, res) => {
    const estado = req.params.estado;
    const sql = 'SELECT * FROM formulario_registro_paciente WHERE estado = ?';

    db.query(sql, [estado], (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Error al obtener pacientes:' + err.message });
        }
        return res.status(200).json({ message: 'Informacion obtenida', pacientes: result });
    });
};


rcPacientes.POSTanotacion = (req, res) => {
    const { idPatient, anotacion, fecha } = req.body;

    const sql = 'INSERT INTO anotaciones_extra (idPaciente, anotacion, fecha) VALUES (?, ?, ?)';
    const values = [idPatient, anotacion, fecha];

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Error al guardar la anotacion:' + err.message });
        }
        return res.status(200).json({ message: 'Anotacion guardada', id: result.insertId });
    });
};


rcPacientes.GETanotaciones = (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM anotaciones_extra WHERE idPaciente = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Error al obtener las anotaciones:' + err.message });
        }
        return res.status(200).json({ message: 'Anotaciones obtenidas', anotaciones: result });
    });
};


module.exports = rcPacientes;