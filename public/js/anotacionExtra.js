document.addEventListener('DOMContentLoaded', () => {
    var idPatient = localStorage.getItem('patient');
    const listPacientes = document.getElementById('list-pacientes');
    const patientInput = document.getElementById('patient');

    document.getElementById('patient').addEventListener('input', function() {
        const query = this.value.trim();
        if (query) {
            searchPatients(query);
        } else {
            listPacientes.style.display = 'none';
        }
    });

    if (idPatient) {
        patientInput.disabled = true;
        obtenerInfoPaciente(idPatient);
    } else {
        patientInput.style.display = 'block';
        patientInput.disabled = false;
    }
});

function searchPatients(query) {
    fetch(`http://localhost:3000/paciente/busqueda/${query}`)
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Datos obtenidos') {
        renderList(data.data);
      }
    })
    .catch(error => console.error('Error al buscar pacientes: ', error));
  }

  function renderList(pacientes) {
    const listPacientes = document.getElementById('list-pacientes');

    listPacientes.innerHTML = '';

    pacientes.forEach(paciente => {
      const item = document.createElement('li');
      item.innerHTML = `${paciente.id}- ${paciente.apellido} ${paciente.nombre}`;
      item.addEventListener('click', function() {
        document.getElementById('patient').value = paciente.id + ' - ' + paciente.apellido + ' ' + paciente.nombre;
        listPacientes.style.display = 'none';
        localStorage.setItem('patient', paciente.id)
      });
      listPacientes.appendChild(item);
    });
    listPacientes.style.display = 'block';
  }

function obtenerInfoPaciente(id) {
    let paciente;

    fetch(`http://localhost:3000/paciente/${id}`)
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Informacion obtenida') {
            paciente = data.data[0];
            document.getElementById('patient').value = paciente.id + ' - ' + paciente.apellido + ' ' + paciente.nombre;
        }
    })
    .catch(error => console.error('Error al buscar pacientes: ', error));
}

function guardarContinuar() {
    var fecha = document.getElementById('fecha').value;
    var anotaciones = document.getElementById('anotaciones').value;
    var idPatient = localStorage.getItem('patient');

    if (!fecha || !anotaciones) {
        alert("Rellene todos los campos para continuar.");
        return;
    }

    fetch('http://localhost:3000/anotacion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            { idPatient: idPatient, anotacion: anotaciones, fecha: fecha }
        ),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Anotacion guardada") {
            document.getElementById('guardarContinuarModal').style.display = 'block';
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error: ', error));
}

function guardarSalir() {
    var fecha = document.getElementById('fecha').value;
    var anotaciones = document.getElementById('anotaciones').value;
    var idPatient = localStorage.getItem('patient');

    if (!fecha || !anotaciones) {
        alert("Rellene todos los campos para continuar.");
        return;
    }

    // Utilizamos el FETCH para hacer la peticion al back con la ruta definida
    fetch('http://localhost:3000/anotacion', {
        method: 'POST', // Usamos el metodo POST para enviar los datos
        headers: {
            'Content-Type': 'application/json'
        },
        // Cargamos los datos en el cuerpo de la peticion
        body: JSON.stringify(
            { idPatient: idPatient, anotacion: anotaciones, fecha: fecha }
        ),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Anotacion guardada") {
            document.getElementById('guardarSalirModal').style.display = 'block';
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error: ', error));
}

function cerrarModal(modalId) {
    document.getElementById(modalId).style.display = 'none';

    if (modalId === 'guardarSalirModal') {
        salir();
    } else if (modalId === 'guardarContinuarModal') {
        window.location.reload();
    }
}

function continuar() {
    cerrarModal('guardarContinuarModal');
    // Aquí puedes agregar código para continuar con la página actual o realizar otras acciones
}

function salir() {
    localStorage.removeItem('patient');
    window.location.href = "/paciente/lista"; // Cambia la URL por la dirección a la que quieres redirigir
}

function redirigir() {
    window.location.href = "/anotaciones/paciente"; // Cambia esta URL por la dirección a la que quieres redirigir desde el botón "Archivo"
}

// Cerrar el modal si se hace clic fuera del contenido del modal
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}