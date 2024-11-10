let selectedOption = '';
let apellidoNombre = '';

    // Hacemos que se ejecute el script cuando se cargue el archivo
    document.addEventListener('DOMContentLoaded', () => {
      var idP = localStorage.getItem('patientID'); // Obtenemos el id guardado en localStorage
      document.getElementById('idPatient').value = idP; // Cargamos los datos en el campo correspondiente del formulario

      fetch(`http://localhost:3000/paciente/${idP}`)
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Informacion obtenida') {
            paciente = data.data[0];
            document.getElementById('title-consult').innerText = `Nueva consulta de ${paciente.nombre} ${paciente.apellido} - DNI: ${paciente.dni}`;
            // document.getElementById('patient').value = paciente.id + ' - ' + paciente.apellido + ' ' + paciente.nombre;
            apellidoNombre = paciente.apellido + ' ' + paciente.nombre;
        }
    })
    .catch(error => console.error('Error al buscar pacientes: ', error));
    });

    // Agregamos event listeners para el formulario y los botones de guardado
    document.getElementById('consultaForm').addEventListener('submit', handleFormSubmit);
    document.getElementById('saveAndContinue').addEventListener('click', handleFormSubmit);
    document.getElementById('saveAndExit').addEventListener('click', handleFormSubmit);

    // Funcion para manejar los datos ingresados en el formulario
    function handleFormSubmit(event) {
      event.preventDefault();

      // Obtenemos los datos ingresados en el formulario
      var fecha = document.getElementById('date').value;
      var peso = document.getElementById('weight').value;
      var altura = document.getElementById('height').value;
      var presionArterial = document.getElementById('presion').value;
      var motivoVisita = document.getElementById('motivo').value;
      var diagnostico = document.getElementById('diagnosis').value;
      var tratamiento = document.getElementById('treatment').value;
      var estudios = document.getElementById('studies').value;
      var idPatient = localStorage.getItem('patientID'); // Obtenemos el id del paciente guardado en localStorage

      if (!fecha || !diagnostico || !tratamiento) {
        alert("Rellene los datos obligatorios.");
        return;
      }

      // Utilizamos el FETCH para hacer la peticion al back con la ruta definida
      fetch('http://localhost:3000/paciente/consulta', {
        method: 'POST', // Usamos el metodo POST para enviar los datos
        headers: {
          'Content-Type': 'application/json'
        },
        // Cargamos los datos en el cuerpo de la peticion
        body: JSON.stringify(
          { idPatient: idPatient, fecha: fecha, peso: peso, altura: altura, presion: presionArterial, motivo: motivoVisita, diagnostico: diagnostico, tratamiento: tratamiento, estudios: estudios }
        ),
      })
      .then(response => response.json())
      .then(data => {
        if (data.message === "Registro exitoso") {
          const buttonClicked = event.target.getAttribute('id');
          if (buttonClicked === 'saveAndContinue') {
            showModal('consulta', '/consulta'); // Mostrar ventana emergente y configurar redirección
          } else if (buttonClicked === 'saveAndExit') {
            showModal('consulta', '/Inicio'); // Mostrar ventana emergente y configurar redirección
          }
        } else {
          alert(data.message);
        }
      })
      .catch(error => console.error('Error: ', error));
    }

    function toggleDropdown(id) {
      document.getElementById(id).classList.toggle("show");
    }

    function showModal(type, redirectUrl) {
      const message = type === 'consulta' ? 'Se guardó exitosamente!' : 'Se envió correctamente!';
      document.getElementById('modalMessage').innerText = message;
      document.getElementById('modal').style.display = 'block';
      document.getElementById('modal').redirectUrl = redirectUrl;

      // Obtenemos el boton de cierre del modal
      const btnClose = document.getElementById('btnClose');
      btnClose.disabled = true; // Desactivamos la funcionalidad del boton de manera temporal
      btnClose.style.backgroundColor = '#8a8f8b'; // Cambiamos el color por defecto
      // Creamos una funcion de tiempo para retrasar la activacion del boton
      setTimeout(() => {
        btnClose.disabled = false; // Activamos nuevamente el boton
        btnClose.style.backgroundColor = '#4CAF50'; // Colocamos el color por defecto
      }, 2000);  // 2 segundos de espera
    }

    function closeModal() {
      document.getElementById('modal').style.display = 'none';
      var redirectUrl = document.getElementById('modal').redirectUrl;
      if (redirectUrl !== '/consulta') {
        window.location.href = document.getElementById('modal').redirectUrl;
      }
    }

    function handleSendOption(option) {
      selectedOption = option;
      generateAndShowPDF();
    }

    async function generateAndShowPDF() {
      const { jsPDF } = window.jspdf;

      const date = document.getElementById('date').value;
      const weight = document.getElementById('weight').value;
      const height = document.getElementById('height').value;
      const presionArterial = document.getElementById('presion').value;
      const motivoVisita = document.getElementById('motivo').value;
      const diagnosis = document.getElementById('diagnosis').value;
      const treatment = document.getElementById('treatment').value;
      const studies = document.getElementById('studies').value;

      const fecha = new Date(date);
      const fechaFormateada = formatearFecha(fecha);

      const doc = new jsPDF();
      doc.text(`CMU DOCTORA URIARTES`, 10, 10, { fontWeight: 'bold', fontSize: 16 });
      doc.text(`Fecha: ${fechaFormateada}`, 10, 20);
      doc.text(`Paciente: ${apellidoNombre}`, 10, 30);
      doc.text(`Tratamiento: ${treatment}`, 10, 40);

      const fileName = `consulta_${date}.pdf`;
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
      } else if (selectedOption === 'correo') {
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