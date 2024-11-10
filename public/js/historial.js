let selectedOption = '';
let apellidoNombre = '';

// Ejecutamos el script cuando se cargue la página
document.addEventListener('DOMContentLoaded', function() {
    const id = localStorage.getItem('patientID'); // Obtenemos el id guardado en localStorage

    fetch(`http://localhost:3000/paciente/${id}`)
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Informacion obtenida') {
            paciente = data.data[0];
            document.getElementById('title-history').innerText = `Historial Médico de ${paciente.nombre} ${paciente.apellido} - DNI: ${paciente.dni}`;
            // document.getElementById('patient').value = paciente.id + ' - ' + paciente.apellido + ' ' + paciente.nombre;
            apellidoNombre = paciente.apellido + ' ' + paciente.nombre;
        }
    })
    .catch(error => console.error('Error al buscar pacientes: ', error));

    showHistorialPatient(id); // Llamamos a la función para mostrar el historial
  });

  // Función para mostrar el historial de un paciente
  function showHistorialPatient(id) {
    // Usamos FETCH para hacer la petición con la ruta definida
    fetch(`http://localhost:3000/paciente/historico/${id}`)
      .then(response => response.json())
      .then(data => {
        // Verificamos si se obtuvieron los datos
        if (data.message === 'Historial obtenido') {
          const historial = data.data;
          const container = document.getElementById('historialContainer'); // Obtenemos el contenedor
          container.innerHTML = ''; // Limpiamos el contenido del contenedor

          // Verificamos si se obtuvieron datos
          if (historial.length > 0) {
            // Recorremos los datos obtenidos
            historial.forEach(historia => {
              let historyString = JSON.stringify(historia);
              const encodedHistoryString = encodeURIComponent(historyString);

              const item = document.createElement('div'); // Creamos un elemento de tipo DIV
              // Asignamos un conjunto de clases ya establecidas al DIV creado
              item.classList.add('border', 'rounded-lg', 'p-4', 'md:p-6', 'bg-muted', 'historial-item');
              
              // Formatear la fecha para mostrar solo la parte de la fecha sin la hora
              const fecha = new Date(historia.fecha);
              // const fechaFormateada = fecha.toISOString().split('T')[0];
              const fechaFormateada = formatearFecha(fecha);

              // Cargamos el DIV con los datos del paciente
              item.innerHTML = `
                <div class="flex items-center justify-between mb-4">
                  <h2 class="text-lg font-semibold">${fechaFormateada}</h2>
                  <div class="send-buttons">
                    
                    <button class="btn-email sendPDFButton" data-option="email" data-history="${encodedHistoryString}">
                      <img src="../img/apple.png" alt="email.icon" width="30">
                    </button>
                  </div>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <div class="text-muted-foreground text-sm mb-1">Peso</div>
                    <div class="bold-format">${historia.peso} kg</div>
                  </div>
                  <div>
                    <div class="text-muted-foreground text-sm mb-1">Altura</div>
                    <div class="bold-format">${historia.altura} cm</div>
                  </div>
                  <div>
                    <div class="text-muted-foreground text-sm mb-1">P.A (Presión Arterial)</div>
                    <div class="bold-format">${historia.presion_arterial}°C</div>
                  </div>
                  <div>
                    <div class="text-muted-foreground text-sm mb-1">Motivo de la Visita</div>
                    <div class="bold-format">${historia.motivo_visita ? historia.motivo_visita : '--'}</div>
                  </div>
                  <div>
                    <div class="text-muted-foreground text-sm mb-1">Diagnóstico</div>
                    <div class="bold-format">${historia.diagnostico}</div>
                  </div>
                  <div>
                    <div class="text-muted-foreground text-sm mb-1">Tratamiento</div>
                    <div class="bold-format">${historia.tratamiento}</div>
                  </div>
                  <div>
                    <div class="text-muted-foreground text-sm mb-1">Estudios</div>
                    <div class="bold-format">${historia.estudios_a_realizar}</div>
                  </div>
                </div>
              `;
              container.appendChild(item); // Agregamos el DIV al contenedor
            });

            document.querySelectorAll('.sendPDFButton').forEach(button => {
              button.addEventListener('click', (event) => {
                const option = event.currentTarget.getAttribute('data-option');
                const history = event.currentTarget.getAttribute('data-history');
                const decodedHistory = decodeURIComponent(history); // Decodifica el JSON
                const historyObject = JSON.parse(decodedHistory);

                handleSendOption(option, historyObject);
              });
            });
          } else {
            // En caso de que no tenga historial
            const item = document.createElement('div'); // Creamos el elemento DIV
            item.classList.add('border', 'rounded-lg', 'p-4', 'md:p-6', 'bg-muted', 'historial-item'); // Asignamos las clases
            // Cargamos al DIV un mensaje por defecto
            item.innerHTML = `
              <div class="flex items-center justify-center">
                <h2 class="text-lg font-semibold">Aun no tiene un historial!</h2>
              </div>
            `;
            container.appendChild(item); // Agregamos el DIV al contenedor
          }
        }
      });
  }

  // Agregamos un event listener para saber cuándo se hace click en el botón de cierre del historial
  document.getElementById('closeButton').addEventListener('click', (event) => {
    event.preventDefault(); // Evitamos la acción por defecto
    localStorage.removeItem('patientID'); // Eliminamos el id del paciente del localStorage
    window.location.href = '/paciente/lista'; // Redirigimos a la página de búsqueda
  });


  function handleSendOption(option, historia) {
    selectedOption = option;

    generateAndShowPDF(historia);
  }

  async function generateAndShowPDF(historiaSended) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text(`CMU DOCTORA URIARTES`, 10, 10, { fontWeight: 'bold', fontSize: 18 });
    let y = 20;

    const fecha = new Date(historiaSended.fecha);
    // const fechaFormateada = fecha.toISOString().split('T')[0];
    const fechaFormateada = formatearFecha(fecha);
    doc.text(`Visita del ${fechaFormateada}`, 10, y);
    y += 10;
    doc.text(`Paciente: ${apellidoNombre}`, 10, y);
    y += 10;
    doc.text(`Tratamiento: ${historiaSended.tratamiento}`, 10, y);
    y += 20;

    const fechaActual = new Date();
    const fileName = `consulta_${fechaActual}.pdf`;
    const pdfDataUri = doc.output('datauristring');
    const pdfFrame = document.getElementById('pdfFrame');
    pdfFrame.src = pdfDataUri;

    document.getElementById('pdfModal').style.display = 'block';
  }

  function sendPDF() {
    const pdfFrame = document.getElementById('pdfFrame');
    const pdfDataUri = pdfFrame.src;

    if (selectedOption === 'whatsapp') {
      const whatsappUrl = 'https://api.whatsapp.com/send?phone=NRO_DE_TELEFONO&text=Adjunto%20consulta%20PDF';
      window.open(whatsappUrl, '_blank');
    } else if (selectedOption === 'email') {
      const email = 'correo_electronico@gmail.com';
      const subject = 'Consulta PDF';
      const body = 'Adjunto consulta en formato PDF';
      window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    }

    closePdfModal();
  }

  function closePdfModal() {
    document.getElementById('pdfModal').style.display = 'none';
  }


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