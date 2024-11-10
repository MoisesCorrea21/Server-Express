//Iportaciones
//Importo y arranco express
const express = require('express'); 
const app = express();

const dotenv = require('dotenv');

//Sesiones de usuairo
const session = require('express-session');
const passport = require('./configuraciones/passport.js');
// const passport = require('passport');
const Elocal = require('passport-local').Strategy;
const flash = require('express-flash');

const morgan = require('morgan');

const bodyParser = require('body-parser');
const path = require('path');

dotenv.config();

app.use(session({
    secret: 'ITSE-3312', // clave secreta única
    resave: false, // No guarda la sesión si no hay cambios
    saveUninitialized: false // No guarda sesiones no inicializadas
}));

app.use(flash());

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());


app.use(require('./rutas/rutas_index.js'));

app.listen(3000, '0.0.0.0', (req, res)=>{
    console.log("El server escucha en el puerto 3000.");
});//escuchgo en el puerto 3000


