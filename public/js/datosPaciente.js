// Ejecutamos el script cuando se cargue la página nueva busqueda paciente.
document.addEventListener('DOMContentLoaded', () => {
    const id = localStorage.getItem('patientID'); // Obtenemos el id guardado en localStorage
    console.log("LSID: " + id);
    showPatientDetails(id); // Llamamos a la función para mostrar los datos personales del paciente
    openModal();
  });

  // Función para mostrar los datos personales de un paciente
  function showPatientDetails(id) {
    console.log("FUNCID: " + id);
    if (!id) {
      console.error('No se encontró el ID del paciente en localStorage.');
      alert('No se encontró el ID del paciente. Por favor, inténtelo de nuevo.');
      return;
    }

    // Usamos FETCH para hacer la petición con la ruta definida
    fetch(`http://localhost:3000/paciente/${id}`) // Hacemos la petición al backend
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // Convertimos la respuesta a JSON
      })
      .then(data => {
        // Verificamos si se obtuvieron los datos
        if (data.message === 'Informacion obtenida') {
          let patientDetails = data.data[0];

          // Asignamos los datos obtenidos a los elementos correspondientes
          document.getElementById('nombre').textContent = patientDetails.nombre;
          document.getElementById('apellido').textContent = patientDetails.apellido;
          document.getElementById('dni').textContent = patientDetails.dni;
          document.getElementById('genero').textContent = patientDetails.genero;
          document.getElementById('obra-social').textContent = patientDetails.obra_social;
          document.getElementById('telefono').textContent = patientDetails.telefono;
          document.getElementById('correo').textContent = patientDetails.correo_electronico;

          // Convertir la fecha de nacimiento a solo fecha (YYYY-MM-DD)
          let fechaNacimiento = new Date(patientDetails.fecha_nacimiento);
          let fechaFormateada = fechaNacimiento.toISOString().split('T')[0];
          document.getElementById('fecha-nacimiento').textContent = fechaFormateada;

          let edad = calcularEdad(patientDetails.fecha_nacimiento);
          document.getElementById('edad').textContent = edad;

          document.getElementById('direccion').textContent = patientDetails.direccion;
        } else {
          alert('No se encontraron datos del paciente.');
        }
      })
      .catch(error => {
        console.error('Error al obtener los datos del paciente:', error);
        alert('Hubo un error al obtener los datos del paciente: ' + error.message);
      });
  }

  // Función para redirigir a la página de búsqueda de pacientes
  function redirectToBusqueda() {
    localStorage.removeItem('patientID');
    window.location.href = '/paciente/lista';
  }

  // Función para abrir el modal
  function openModal() {
    document.getElementById('modalContainer').style.display = 'flex';
  }

  function calcularEdad(fechaNacimiento) {
    let hoy = new Date();
    let fechaNac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    let mes = hoy.getMonth() - fechaNac.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--; 
    }
    return edad;
  }