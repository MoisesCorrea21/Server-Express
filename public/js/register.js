document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío por defecto del formulario

    // Validaciones de los datos
    // Obtenemos los datos ingresados en el formulario
    var usuario = document.getElementById('usuario').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var cpassword = document.getElementById('cpassword').value;
    var usuarioError = document.getElementById('usuarioError');
    var passwordError = document.getElementById('passwordError');
    var cpasswordError = document.getElementById('cpasswordError');

    usuarioError.textContent = '';
    passwordError.textContent = '';
    cpasswordError.textContent = '';

    // Validamos que el usuario no contenga números
    if (/\d/.test(usuario)) {
        usuarioError.textContent = 'El nombre de usuario no debe contener números.';
        return;
    }

    // Validamos que la contraseña sea segura
    var passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{6,}$/;
    if (!passwordRegex.test(password)) {
        passwordError.textContent = 'La contraseña debe contener al menos un número, una letra en mayúscula y un símbolo.';
        return;
    }

    // Validamos que la contraseña y la contraseña de confirmación sean iguales
    if (password !== cpassword) {
        cpasswordError.textContent = 'Las contraseñas no coinciden.';
        return;
    }

    // Lógica para guardar los datos
    // Utilizamos el FETCH para hacer la peticion al back con la ruta especificada
    fetch('http://localhost:3000/registro', {
        method: 'POST', // Utilizamos el metodo POST para enviar los datos y cargarlos
        headers: {
            'Content-Type': 'application/json',
        },
        // Cargamos en el cuerpo de la peticion los datos a guardar en la base de datos
        body: JSON.stringify({ usuario: usuario, email: email, password: password, cpassword: cpassword }),
    })
    .then(response => response.json())
    .then(data => {
        // Verificamos que la respuesta del back sea correcta
        if (data.message === "Registro exitoso") {
            // Mostramos la ventana emergente
            document.getElementById('successModal').style.display = 'block';
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error: ', error));
});

function closeModal() {
    document.getElementById('successModal').style.display = 'none';
    // window.location.reload(); // Recargamos la página actual
    window.location.href = "/login";
}