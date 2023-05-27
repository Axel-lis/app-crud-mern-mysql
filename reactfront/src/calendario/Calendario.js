import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import Swal from 'sweetalert2';

const URI = 'http://localhost:8000/tareas/calendar';

const Calendario = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    obtenerEventos();
  }, []);

  const obtenerEventos = async () => {
    try {
      const response = await axios.get(URI);
      setEventos(asignarColores(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  const asignarColores = (eventos) => {
    const colores = ['#F79256', '#5A7684', '#A882DD ', '#FF5964', '#2B3A67', '#EA2B1F', '#A7754D', '#5C8001','#A8577E']; // Arreglo de colores disponibles
    return eventos.map((evento, index) => ({
      ...evento,
      backgroundColor: colores[index % colores.length], // Asignar un color diferente a cada evento
    }));
  };
//al hacer click sobre evento
  const handleEventClick = (arg) => {
    const eventoSeleccionado = arg.event;
    const descripcion = eventoSeleccionado.extendedProps.description;
    Swal.fire({icon:'info', text: descripcion});
   
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }} className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        height="100%"
       eventClick ={handleEventClick} // Manejador de eventos al hacer clic en un evento
        initialView="dayGridMonth"
        headerToolbar={{
          left: '',
          center: 'title',
          right: 'today prev,next',
        }}
        weekends={true}
        locale="es"
        nowIndicator={true}
        events={eventos}
      />
    </div>
  );
};

export default Calendario;
