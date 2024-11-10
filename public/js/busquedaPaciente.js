// Función para abrir el modal de bloqueo
function openLockModal(id, estado) {
  
    document.getElementById("btn-eliminar").style.display = "block";
  
    if (estado === 1) {
       document.getElementById("btn-deshabilitar").style.display = "block";
       document.getElementById("btn-habilitar").style.display = "none";
    } else if (estado === 0) {
       document.getElementById("btn-deshabilitar").style.display = "none";
       document.getElementById("btn-habilitar").style.display = "block";
    }
  
    localStorage.setItem('modPacienteID', id);
    document.getElementById("blockModal").style.display = "block";
  }
  // Función para mostrar el modal de bloqueo
  function showBlockModal() {
    document.getElementById('blockModal').style.display = 'block';
  }
  
  // Función para cerrar el modal de bloqueo
  function closeBlockModal() {
    localStorage.removeItem('modPacienteID');
    document.getElementById('blockModal').style.display = 'none';
  }
  
  function showDeleteModal() {
    document.getElementById('blockModal').style.display = 'none';
    document.getElementById("deleteConfirmationModal").style.display = "block";
  }

  function eliminarPaciente() {
    // document.getElementById('blockModal').style.display = 'none';
    // document.getElementById('deleteModal').style.display = 'block';
    // setTimeout(closeDeleteModal, 2000); // Cerrar el modal después de 2 segundos
  
    // if (confirm('Esta seguro que desea eliminar el paciente?')) {
      const id = localStorage.getItem('modPacienteID');
  
      fetch(`http://localhost:3000/paciente/${id}`, {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Paciente eliminado') {
          document.getElementById('deleteConfirmationModal').style.display = 'none';
          document.getElementById("deleteModal").style.display = "block";
          setTimeout(function() {
            closeDeleteModal();
          }, 3000);
        } else {
          alert(data.message);
        }
      })
      .catch(error => console.error('Error al elimnar el paciente:', error));
    
      localStorage.removeItem('modPacienteID');
      setTimeout(function() {
          window.location.reload();
      }, 3000);
    // }
  }
  
  // Función para cerrar el modal de eliminación
  function closeDeleteModal() {
    document.getElementById('deleteModal').style.display = 'none';
  }
  
  function habilitarPaciente() {
    const id = localStorage.getItem('modPacienteID');
  
      fetch(`http://localhost:3000/paciente/estado/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ estado: 'habilitado' })
      })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Estado actualizado') {
          alert('Paciente habilitado');
        } else {
          alert(data.message);
        }
      })
      .catch(error => console.error('Error al actualizar los datos:', error));
  
    closeBlockModal();
    
    setTimeout(function() {
      window.location.reload();
    }, 3000);
  }
  
  // Función para deshabilitar paciente (se puede ajustar según necesidad)
  function deshabilitarPaciente() {
    const id = localStorage.getItem('modPacienteID');
  
      fetch(`http://localhost:3000/paciente/estado/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ estado: 'deshabilitado' })
      })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Estado actualizado') {
          alert('Paciente deshabilitado');
        } else {
          alert(data.message);
        }
      })
      .catch(error => console.error('Error al actualizar los datos:', error));
  
    closeBlockModal();
  
    setTimeout(function() {
      window.location.reload();
    }, 3000);
  }
  // Función para cerrar la confirmación de eliminación
  function closeDeleteConfirmation() {
    document.getElementById("deleteConfirmationModal").style.display = "none";
  }
   // Eventos para cerrar los modales cuando se hace clic en la cruz
  document.getElementById('closeBlockModal').addEventListener('click', closeBlockModal);
  // document.getElementById('closeDeleteModal').addEventListener('click', closeDeleteModal);

  document.getElementById('showHabilitados').addEventListener('click', mostrarPacientesPorEstado);
  document.getElementById('showDeshabilitados').addEventListener('click', mostrarPacientesPorEstado);
  document.getElementById('showTodos').addEventListener('click', mostrarPacientesPorEstado);
  // Se ejecuta el script cuando se carga la pagina
  document.addEventListener('DOMContentLoaded', function() {
    loadTableInformation(); // Llamamos a la funcion para cargar la informacion

    // Agregamos un event listener para reconocer cuando se ingrese algo en el campo de busqueda
    document.getElementById('search-input').addEventListener('input', function() {
      const query = this.value.trim(); // Obtenemos lo ingresado en el campo de busqueda
      if (query) { // Verificamos si la busqueda contiene algo
        searchPatients(query); // Si contiene algo, mandamos ese dato a buscar con la funcion
      } else {
        loadTableInformation(); // Si no contiene nada, volvemos a cargar la informacion
      }
    });
  });
  function sortTable(order) {
    const tbody = document.getElementById('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
  
    rows.sort((a, b) => {
      const nameA = a.cells[0].innerText.toUpperCase();
      const nameB = b.cells[0].innerText.toUpperCase();
  
      if (order === 'asc') {
        return nameA < nameB ? -1 : (nameA > nameB ? 1 : 0);
      } else {
        return nameA > nameB ? -1 : (nameA < nameB ? 1 : 0);
      }
    });
  
    rows.forEach(row => tbody.appendChild(row)); // Reagrega las filas ordenadas
  }
  
  // funcion para cargar la informacion de los pacientes
  function loadTableInformation() {
    // Utilizamos el FETCH con la ruta definida para obtener los datos de los pacientes
    fetch('http://localhost:3000/paciente/listado')
    .then(response => response.json())
    .then(data => {
      if (data.message === '+') { // Verificamos que nos devolvio la informacion
        const pacientes = data.pacientes;
        const tbody = document.getElementById('tbody'); // Obtenemos el cuerpo de la tabla
        tbody.innerHTML = ''; // Limpiamos el contenido de la tabla

        // Recorremos todos los pacientes obtenidos de la base de datos
        pacientes.forEach(paciente => {
          let imagen = '';
          let estadoID = -1;
          if (paciente.estado === 'habilitado') {
              imagen = '../img/btn_habilitado.png';
              estadoID = 1;
          } else {
              imagen = '../img/btn_deshabilitado.png';
              estadoID = 0;
          }
          // Creamos una fila nueva
          const row = document.createElement('tr');
          // Cargamos la fila con la infromacion del paciente
          row.innerHTML = `
          <td>${paciente.nombre} ${paciente.apellido}</td>
          <td>${paciente.dni}</td>
          <td class="action-buttons">
            <button type="button" class="btn-blue" onclick="redirectToConsulta(${paciente.id}, '/consulta')">Consulta</button>
            <button type="button" class="btn-green" onclick="redirectToPage(${paciente.id}, '/historial')">Historial</button>
            <button type="button" class="btn-yellow" onclick="openModal(${paciente.id})">Modificar</button>
            <button type="button" class="btn-purple" onclick="redirectToDatosPaciente(${paciente.id}, '/datos')">Datos</button>
           <button type="button" class="btn-pink" onclick="redirectToAnotaciones(${paciente.id}, '/anotacion')">Anotación</button>
            <img src="${imagen}" alt="Icono de Bloqueo" style="width: 20px; height: 20px; cursor: pointer; margin-top:8px;" onclick="openLockModal(${paciente.id}, ${estadoID})">
          </td>
          `;
          tbody.appendChild(row); // Agregamos la fila con los datos cargados a la tabla
        });
      }
    })
  }
  function redirectToAnotaciones(id, page) {
    localStorage.setItem('patient', id);
    window.location.href = page; // Redirige a la página de anotaciones
  }
  
  // Funcion para buscar pacientes
  function searchPatients(query) {
    // Utilizamos el FETCH para hacer la peticion al back con la busqueda deseada utilizando la ruta definida
    fetch(`http://localhost:3000/paciente/busqueda/${query}`)
    .then(response => response.json())
    .then(data => {
      // Verificamos que nos devuelva los datos buscados
      if (data.message === 'Datos obtenidos') {
        renderTable(data.data); // Mandamos los datos obtenidos para que se muestren en la tabla
      }
    })
    .catch(error => console.error('Error al buscar pacientes: ', error));
  }

  // Funcion para mostrar la informacion obtenida
  function renderTable(pacientes) {
    const tbody = document.getElementById('tbody'); // Obtenemos el cuerpo de la tabla
    tbody.innerHTML = ''; // Limpiamos el contenido de la tabla

    // Recorremos los pacientes obtenidos de la busqueda
    pacientes.forEach(paciente => {
      let imagen = '';
      let estadoID = -1;
      if (paciente.estado === 'habilitado') {
        imagen = '../img/btn_habilitado.png';
        estadoID = 1;
      } else {
        imagen = '../img/btn_deshabilitado.png';
        estadoID = 0;
      }
      const row = document.createElement('tr'); // Creamos una fila nueva
      // Cargamos la fila con la informacion del paciente
      row.innerHTML = `
        <td>${paciente.nombre} ${paciente.apellido}</td>
        <td>${paciente.dni}</td>
        <td class="action-buttons">
          <button type="button" class="btn-blue" onclick="redirectToConsulta(${paciente.id}, '/consulta')">Consulta</button>
          <button type="button" class="btn-green" onclick="redirectToPage(${paciente.id}, '/historial')">Historial</button>
          <button type="button" class="btn-yellow" onclick="openModal(${paciente.id})">Modificar</button>
          <button type="button" class="btn-purple" onclick="redirectToDatosPaciente(${paciente.id}, '/datos')">Datos</button>
         <button type="button" class="btn-pink" onclick="redirectToAnotaciones(${paciente.id}, '/anotacion')">Anotación</button>
          <img src="${imagen}" alt="Icono de Bloqueo" style="width: 20px; height: 20px; cursor: pointer; margin-top:8px;" onclick="openLockModal(${paciente.id}, ${estadoID})">
        </td>
      `;
      tbody.appendChild(row); // Agregamos la fila cargada a la tabla
    });
  }

  function mostrarPacientesPorEstado(event){
    event.preventDefault();

    let estado = '';
    const buttonClicked = event.target.getAttribute('id'); 
    // Verificamos que elemento fue clickeado
    if (buttonClicked === 'showHabilitados') {
        estado = 'habilitado';
    } else if (buttonClicked === 'showDeshabilitados') {
      estado = 'deshabilitado';
    } else if (buttonClicked === 'showTodos') {
      estado = 'todo';
    }

    if (estado !== 'todo') {
      fetch(`http://localhost:3000/pacientes/${estado}`)
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Informacion obtenida') {
          renderTable(data.pacientes);
        }
      })
      .catch(error => console.error('Error al buscar pacientes: ', error));
    } else {
      fetch('http://localhost:3000/paciente/listado')
      .then(response => response.json())
      .then(data => {
        if (data.message === '+') {
          renderTable(data.pacientes);
        }
      })
      .catch(error => console.error('Error al buscar pacientes: ', error));
    }
  }

  // Funcion para abrir el modal de edicion de datos
  function openModal(id) {
    // Utilizamos el FETCH para hacer la peticion con la ruta definida y el id del paciente a modificar
    fetch(`http://localhost:3000/paciente/${id}`)
    .then(response => response.json())
    .then(data => {
      // Verificamos la devolucion de la informacion del paciente
      if (data.message === 'Informacion obtenida') {
        let paciente = data.data[0];
        // Cargamos la informacion obtenida en los campos del formulario
        document.getElementById('title-modify').innerText = `Modificar datos personales de ${paciente.nombre} ${paciente.apellido} - DNI: ${paciente.dni}`;
        document.getElementById('telefono').value = paciente.telefono;
        document.getElementById('correo').value = paciente.correo_electronico;
        document.getElementById('direccion').value = paciente.direccion;
        localStorage.setItem('patientID', paciente.id); // Obtenemos el id del paciente guardado en localStorage
      }
    })
    .catch(error => console.error('Error al cargar los datos del paciente: ' + error));

    document.getElementById("myModal").style.display = "block";
  }

  function closeModal() {
    document.getElementById("myModal").style.display = "none";
    document.getElementById("successMessage").style.display = "none";
    localStorage.removeItem('patientID'); // Eliminamos el id guardado en localStorage
  }

  // Función para guardar los datos del formulario de edicion
  function guardarDatos() {
    // Obtenemos los datos ingresados en el formulario
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correo').value;
    const direccion = document.getElementById('direccion').value;
    const id = localStorage.getItem('patientID'); // Obtenemos el id guardado en localStorage

    if (!telefono || !correo || !direccion) {
      alert("Rellene todos los campos para continuar.");
      return;
    }

    // Utilizamos el FETCH con la ruta definida para hacer la peticion
    fetch(`http://localhost:3000/paciente/${id}`, {
      method: 'PUT', // Usamos el metodo PUT para modificar los datos
      headers: {
        'Content-Type': 'application/json'
      },
      // Cargamos los datos ingresados en el cuerpo de la peticion
      body: JSON.stringify({ telefono: telefono, correo: correo, direccion: direccion })
    })
    .then(response => response.json())
    .then(data => {
      // Verificamos el correcto envio de los datos
      if (data.message === 'Datos actualizados') {
        document.getElementById("successMessage").style.display = "block";
        // Creamos una funcion de tiempo para retrasar el cierre del modal
        setTimeout(function() {
          document.getElementById("successMessage").style.display = "none";
          closeModal();
        }, 3000); // Ocultamos mensaje después de 3 segundos
      } else {
        alert(data.message);
      }
    })
    .catch(error => console.error('Error al actualizar los datos:', error));
  }

  // Función para redirigir a otra página
  function redirectToPage(id, page) {
    localStorage.setItem('patientID', id); // Guardamos el id del paciente en localStorage
    window.location.href = page; // Redirigimos a la pagina recibida por parametro
  }

  // Función para redirigir a la página de consultas
  function redirectToConsulta(id, page) {
    localStorage.setItem('patientID', id); // Guardamos el id del paciente en localStorage
    window.location.href = page; // Redirigimos a la pagina especificada (en este caso a Consultas)
  }

  // Función para redirigir a la página de datos del paciente
  function redirectToDatosPaciente(id, page) {
    localStorage.setItem('patientID', id); // Guardamos el id del paciente en localStorage
    window.location.href = page; // Redirigimos a la página de Datos Paciente
  }


// Función para mostrar los datos personales de un paciente
function showPatientDetails(id) {
  if (!id) {
    console.error('No se encontró el ID del paciente en localStorage.');
    alert('No se encontró el ID del paciente. Por favor, inténtelo de nuevo.');
    return;
  }

  // Usamos FETCH para hacer la petición con la ruta definida
  fetch(`http://localhost:3000/patient/details/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      // Verificamos si se obtuvieron los datos
      if (data.message === 'Datos obtenidos') {
        const patientDetails = data.data;

        // Asignamos los datos obtenidos a los elementos correspondientes
        document.getElementById('nombre').textContent = patientDetails.nombre;
        document.getElementById('apellido').textContent = patientDetails.apellido;
        document.getElementById('dni').textContent = patientDetails.dni;
        document.getElementById('id').textContent = patientDetails.id;
        document.getElementById('genero').textContent = patientDetails.genero;
        document.getElementById('obra-social').textContent = patientDetails.obra_social;
        document.getElementById('telefono').textContent = patientDetails.telefono;
        document.getElementById('correo').textContent = patientDetails.correo_electronico;
        document.getElementById('fecha-nacimiento').textContent = patientDetails.fecha_nacimiento;
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