document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    var usuario = document.getElementById('usuario').value;
    var password = document.getElementById('password').value;
    var loginError = document.getElementById('loginError');

    // Lógica para validar los datos
    // Utilizamos el FETCH para hacer la peticion al back de NodeJS con la ruta definida
    fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Pasamos en el cuerpo de la peticion los datos a verificar
            body: JSON.stringify({ username: usuario, password: password }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            // Una vez que el backend nos da una respuesta verificamos que dicha respuesta sea correcta
            if (data.message === "Credenciales validas") {
                // Redirigimos al usuario a la página principal
                window.location.href = "/Inicio";
            } else {
                loginError.textContent = 'Usuario o contraseña incorrecta.';
            }
        })
        .catch(error => console.error('Error: ', error));
});

// Ventana emergente para la recuperación de contraseña
var popup = document.getElementById("passwordPopup");
var btn = document.getElementById("forgot-password");
var span = document.getElementById("closePopup");

// Mostrar el popup al hacer clic en "¿Olvidaste tu contraseña?"
btn.onclick = function() {
    popup.style.display = "block";
}

// Cerrar el popup al hacer clic en la "x"
span.onclick = function() {
    popup.style.display = "none";
}

// Cerrar el popup si se hace clic fuera de la ventana emergente
window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = "none";
    }
}

// Enviar la recuperación de contraseña al hacer clic en "Buscar"
document.getElementById("recoverPasswordBtn").addEventListener("click", function() {
    var email = document.getElementById("email").value;

    // Lógica para enviar el correo de recuperación de contraseña
    fetch('http://localhost:3000/auth/recover', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Correo de recuperación enviado") {
            alert('Correo de recuperación enviado. Por favor revisa tu bandeja de entrada.');
            popup.style.display = "none";
        } else {
            alert('No se pudo enviar el correo de recuperación. Por favor intenta nuevamente.');
        }
    })
    .catch(error => console.error('Error: ', error));
});