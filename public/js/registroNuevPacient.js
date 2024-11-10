// Agregamos event listener para el formulario y los botones de guardado
document.getElementById('patientForm').addEventListener('submit', handleFormSubmit);
document.getElementById('saveAndConsult').addEventListener('click', handleFormSubmit);
document.getElementById('saveAndExit').addEventListener('click', handleFormSubmit);


// Funcion para manejar los datos ingresados en el formulario
function handleFormSubmit(event) {
  event.preventDefault();

  // Obtenemos los datos ingresados
  var nombre = document.getElementById('name').value;
  var apellido = document.getElementById('lastName').value;
  var dni = document.getElementById('dni').value;
  var genero = document.getElementById('gender').value;
  var obraSocial = document.getElementById('healthPlan').value;
  var telefono = document.getElementById('phone').value;
  var correo = document.getElementById('email').value;
  var fechaNacimiento = document.getElementById('birthdate').value;
  var direccion = document.getElementById('address').value;

  if (!nombre || !apellido || !dni || !genero || !obraSocial || !telefono || !correo || !fechaNacimiento || !direccion) {
    alert("Rellene todos los campos para continuar.");
    return;
  }

  // Lógica para guardar los datos
  // Utilizamos el FETCH con la ruta definida para hacer la peticion
  fetch('http://localhost:3000/paciente/registrar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // Cargamos todos los datos en el cuerpo de la peticion
    body: JSON.stringify(
      { nombre: nombre, apellido: apellido, dni: dni, genero: genero, obraSocial: obraSocial, telefono: telefono, correo: correo, fechaNacimiento: fechaNacimiento, direccion: direccion}),
  })
  .then(response => response.json())
  .then(data => {
      if (data.message === "Registro exitoso") {
        // Obtenemos el id del elemento clickeado
        const buttonClicked = event.target.getAttribute('id'); 
        // Verificamos que elemento fue clickeado
        if (buttonClicked === 'saveAndConsult') {
          localStorage.setItem('patientID', data.id); // Guardamos el ID del paciente en localStorage (guardado temporal)
          showModal('/consulta'); // Mostramos la ventana emergente y configuramos la redirección
        } else if (buttonClicked === 'saveAndExit') {
          showModal('/Inicio'); // Mostramos la ventana emergente y configuramos la redirección
        }
      } else {
          alert(data.message);
      }
  })
  .catch(error => console.error('Error: ', error));
}

function showModal(redirectUrl) {
  document.getElementById('successModal').style.display = 'block';
  document.getElementById('successModal').redirectUrl = redirectUrl;

  const btnClose = document.getElementById('btnClose'); // Obtenemos el boton de cierre de la ventana emergente
  btnClose.disabled = true; // Desactivamos su funcionalidad para que no se pueda clickear
  btnClose.style.backgroundColor = '#8a8f8b'; // Cambiamos el color por defecto
  // Creamos una funcion de tiempo para retrasar la activacion del boton
  setTimeout(() => {
    btnClose.disabled = false; // Activamos nuevamente el boton
    btnClose.style.backgroundColor = '#4CAF50'; // Le ponemos el color por defecto
  }, 2000);  // 2 segundos de espera para la activacion
}

function closeModal() {
  document.getElementById('successModal').style.display = 'none';
  window.location.href = document.getElementById('successModal').redirectUrl;
}