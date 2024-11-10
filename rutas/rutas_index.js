const express = require("express")
const enrrutador = express.Router();

const bcrypt = require('bcrypt');
const path = require('path');

const { request } = require("http");

//IMPORTO CONTROLADORES DE RUTAS
const c1Usuario = require ('../controladores/usuarios.js');
const c2Paciente = require('../controladores/pacientes.js');


//DEFINO RUTAS

//Manejo de homescreen
enrrutador.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'index.html'));
});

enrrutador.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'inicioSesion.html'));
});

enrrutador.post('/', c1Usuario.POSTlogin);

enrrutador.get('/Inicio', (req, res) => {
    const reqContendio = {usuario, password} = req.body;
    console.log(reqContendio);
    res.sendFile(path.join(__dirname, '../public', 'html', 'proyecGeneral.html'));
});

//Manejo pacientes
enrrutador.get('/paciente/lista', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'busquedaPaciente.html')); //carga la pagina esperando la tabla.
});

enrrutador.get('/paciente/listado', c2Paciente.GETlistar);

enrrutador.get('/paciente/busqueda/:query', c2Paciente.GETbusqueda);

enrrutador.get('/datos', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'datosPaciente.html'));
});

enrrutador.get('/paciente/registro', (req, res) => {
    res.sendfile(path.join(__dirname, '../public', 'html', 'registroNuevPacient.html'));
});

enrrutador.post('/paciente/registrar', c2Paciente.POSTcargar);

enrrutador.get('/paciente/:id', c2Paciente.GETpaciente);

enrrutador.put('/paciente/:id', c2Paciente.PUTmodificar);

enrrutador.delete('/paciente/:id', c2Paciente.DELETEdatospaciente);

enrrutador.get('/consulta', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'tablaConsulta.html'));
});

enrrutador.post('/paciente/consulta', c2Paciente.POSTconsulta);

enrrutador.get('/historial', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'historial.html'));
});

enrrutador.get('/paciente/historico/:id', c2Paciente.GEThistorial);

enrrutador.put('/paciente/estado/:id', c2Paciente.PUTestado);

enrrutador.get('/pacientes/:estado', c2Paciente.GETporEstado);

enrrutador.get('/anotacion', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'anotacionExtra.html'));
});

enrrutador.get('/anotaciones/paciente', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'archivoAnotacion.html'));
});

enrrutador.post('/anotacion', c2Paciente.POSTanotacion);

enrrutador.get('/consulta/anotaciones/:id', c2Paciente.GETanotaciones);


//Manejo de usuarios
enrrutador.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html', 'register.html'));
});

enrrutador.post('/registro', c1Usuario.POSTregistro);

//enrrutador.get('/login', c1Usuario)
enrrutador.post('/login', c1Usuario.POSTlogin);


module.exports = enrrutador;//Eexporto el enrutador para que lo maneje el servidor