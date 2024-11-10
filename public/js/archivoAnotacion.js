// Ejecutamos el script cuando se cargue la página
document.addEventListener('DOMContentLoaded', function() {
    const id = localStorage.getItem('patient'); // Obtenemos el id guardado en localStorage
    console.log('SCRIPT LOAD ID: ' + id);

    fetch(`http://localhost:3000/paciente/${id}`)
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Informacion obtenida') {
            paciente = data.data[0];
            // document.getElementById('title-anotation').innerText = `Anotaciones Extras de ${paciente.nombre} ${paciente.apellido} - DNI: ${paciente.dni}`;
            // document.getElementById('patient').value = paciente.id + ' - ' + paciente.apellido + ' ' + paciente.nombre;
        }
    })
    .catch(error => console.error('Error al buscar pacientes: ', error));

    showAnotacionesPatient(id); // Llamamos a la función para mostrar las anotaciones
  });

  // Función para mostrar las anotaciones de un paciente
  function showAnotacionesPatient(id) {
    console.log('FUNCION ID: ' + id);
    // Usamos FETCH para hacer la petición con la ruta definida
    fetch(`http://localhost:3000/consulta/anotaciones/${id}`)
      .then(response => response.json())
      .then(data => {
        // Verificamos si se obtuvieron los datos
        if (data.message === 'Anotaciones obtenidas') {
          const anotaciones = data.anotaciones;
          const container = document.getElementById('anotacionesContainer'); // Obtenemos el contenedor
          anotacionesContainer.innerHTML = ''; // Limpiamos el contenido del contenedor

          // Verificamos si se obtuvieron datos
          if (anotaciones.length > 0) {
            // Recorremos los datos obtenidos
            anotaciones.forEach(anotacion => {
              const item = document.createElement('div'); // Creamos un elemento de tipo DIV
              // Asignamos un conjunto de clases ya establecidas al DIV creado
              item.classList.add('border', 'rounded-lg', 'p-4', 'md:p-6', 'bg-muted', 'anotacion-item');
              
              // Formatear la fecha para mostrar solo la parte de la fecha sin la hora
              const fecha = new Date(anotacion.fecha);
              // const fechaFormateada = fecha.toISOString().split('T')[0];
              const fechaFormateada = formatearFecha(fecha);

              // Cargamos el DIV con los datos de la anotación
              item.innerHTML = `
                <div class="flex items-center justify-between mb-4">
                  <h2 class="text-lg font-semibold">${fechaFormateada}</h2>
                </div>
                <div>
                  <p>${anotacion.anotacion}</p>
                </div>
              `;
              anotacionesContainer.appendChild(item); // Agregamos el DIV al contenedor
            });
          } else {
            // En caso de que no haya anotaciones
            const item = document.createElement('div'); // Creamos el elemento DIV
            item.classList.add('border', 'rounded-lg', 'p-4', 'md:p-6', 'bg-muted', 'anotacion-item'); // Asignamos las clases
            // Cargamos al DIV un mensaje por defecto
            item.innerHTML = `
              <div class="flex items-center justify-center">
                <h2 class="text-lg font-semibold">¡Aun no hay anotaciones!</h2>
              </div>
            `;
            anotacionesContainer.appendChild(item); // Agregamos el DIV al contenedor
          }
        }
      });
  }

  // Agregamos un event listener para saber cuándo se hace click en el botón de cierre de las anotaciones
  document.getElementById('closeButton').addEventListener('click', (event) => {
    event.preventDefault(); // Evitamos la acción por defecto
    localStorage.removeItem('patient'); // Eliminamos el id del paciente del localStorage
    window.location.href = '/paciente/lista'; // Redirigimos a la página de búsqueda
  });


function formatearFecha(fecha) {
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const fechaObj = new Date(fecha);

  const dia = fechaObj.getDate();
  const mes = meses[fechaObj.getMonth()];
  const anio = fechaObj.getFullYear();

  return `${dia} de ${mes} del ${anio}`;
}

