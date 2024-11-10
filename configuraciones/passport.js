const passport = require('passport');
const Elocal = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../configuraciones/DB.js');
const { message } = require('statuses');

passport.use(new Elocal.Strategy(
    (username, password, done) => {
        console.log(username, password);
        // Aquí iría tu lógica para buscar el usuario en tu base de datos
        const dbBusqueda = db.query('SELECT * FROM register WHERE usuario = ?', [username], (err, resultados) => { //Discriminar nombre de usuario entre mayusculas y minusculas -- PENDIENTE

            if (err) {
                return done(err);
            }

            if (!resultados || resultados.length === 0) {
                return done(null, false, { message: 'Nombre de usuario no encontrado.' });
            }

            const usuario = resultados[0];
            console.log(usuario);
            
            bcrypt.compare(password, usuario.contraseña, (error, coinciden) => {
                if (error) {
                    return done(error);
                }
                if (coinciden) {
                    return done(null, usuario);
                }
                else {
                    return done(null, false, { message: 'contraseña incorrecta.' })
                }
            });

        });
    } // Implementa esta función
));

passport.serializeUser((user, done) => {
    done(null, user.usuario);
});

passport.deserializeUser((usuario, done) => {
    db.query('SELECT * FROM register WHERE usuario = ?', [usuario], (err, resultados) => {
        if (err) {
            return done(err);
        }
        if (!resultados || resultados.length === 0) {
            return done(null, false);
        }
        const usuario = resultados[0];
        return done(null, usuario); // Objeto completo del usuario recuperado
    });

});

module.exports = passport;