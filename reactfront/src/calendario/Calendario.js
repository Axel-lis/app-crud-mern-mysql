import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import Swal from 'sweetalert2';
import CustomNavbar from '../navbar/Navbar.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const URI = 'http://localhost:8000/tareas/calendar';

const Calendario = (props) => {
  const navigate = useNavigate();
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    obtenerEventos();
  }, []);

  const obtenerEventos = async () => {
    try {
      const response = await axios.get(URI);
      setEventos(asignarColores(response.data));
    } catch (error) {
      if (error.response.status === 401) {
        // El usuario no está autenticado
        navigate('/login');
      };
      console.log(error); // Agrega este log para mostrar cualquier error en la consola
    }
  };

  const asignarColores = (eventos) => {
    const colores = ['#E15554', '#7768AE', '#473BF0', '#8F2D56', '#285238', '#685634', '#D84727', '#376996']; // Arreglo de colores disponibles
    return eventos.map((evento, index) => ({
      ...evento,
      backgroundColor: colores[index % colores.length], // Asignar un color diferente a cada evento
    }));
  };

  // Al hacer clic sobre un evento
  const handleEventClick = (arg) => {
    const eventoSeleccionado = arg.event;
    const descripcion = eventoSeleccionado.extendedProps.description;
    Swal.fire({ icon: 'info', text: descripcion });
  };

// Generar PDF y descargar
const generatePDF = () => {
  const calendarContainer = document.querySelector('.calendar-container');

  html2canvas(calendarContainer)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        unit: 'px', // Establece la unidad de medida en píxeles
        format: 'letter', // Establece el formato del PDF
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('calendario.pdf');
    })
    .catch((error) => {
      console.error('Error al capturar la imagen:', error);
    });
};


  return (
    <>
      <CustomNavbar username={props.username}  />  
      <div style={{ width: '100vw', height: '120vh' }} className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          height="100%"
          eventClick={handleEventClick} // Manejador de eventos al hacer clic en un evento
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev next today',
            center: 'title',
            right: 'customButton',
          }}
          weekends={true}
          locale="es"
          nowIndicator={true}
          events={eventos}
          customButtons={{
            customButton: {
              text: 'Descargar PDF',
              click: generatePDF,
              buttonIcons: 'fa-thin fa-print color-white',
            },
          }}         
        />
      </div>
    </>
  );
};

export default Calendario;
