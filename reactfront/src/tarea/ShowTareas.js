import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import moment from 'moment';
const URI = 'http://localhost:8000/tareas/';

const CompShowTareas = () => {
  const [tareas, setTarea] = useState([]);
  const [orderBy, setOrderBy] = useState('asc'); // Estado para almacenar el tipo de ordenación (ascendente o descendente)

  useEffect(() => {
    getTareas();
  }, []);

  const getTareas = async () => {
    const res = await axios.get(URI);
    setTarea(res.data);
  };

  const deleteTarea = async (id) => {
    await axios.delete(`${URI}${id}`);
    Swal.fire({icon:"error", title:"Tarea eliminada"})
    getTareas();
  };

  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  const handleSort = () => {
    // Cambiar el tipo de ordenación
    const newOrderBy = orderBy === 'asc' ? 'desc' : 'asc';
    setOrderBy(newOrderBy);

    // Ordenar las tareas según el tipo de ordenación
    const sortedTareas = [...tareas].sort((a, b) => {
      const dateA = moment(a.dateinicio, "YYYY/MM/DD");
      const dateB = moment(b.dateinicio, "YYYY/MM/DD");

      if (newOrderBy === 'asc') {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    setTarea(sortedTareas);
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <Link to="/create" className='btn btn-success mt-2 mb-2'><i class="fa-solid fa-plus"></i></Link>
          <button onClick={handleSort} className='btn btn-secondary mt-2 mb-2'>
            Ordenar por fecha {orderBy === 'asc' ? 'ascendente' : 'descendente  '}
          </button>
       
          <table className='table'>
            <thead className='table-primary'>
              <tr>
                <th>titulo</th>
                <th>descripcion</th>
                <th>fecha inicio</th>
                <th>fecha fin</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tareas.map((tarea) => (
                <tr key={tarea.id}>
                  <td>{tarea.title}</td>
                  <td>{tarea.description}</td>
                  <td>{formatDate(tarea.dateinicio)}</td>
                  <td>{formatDate(tarea.datefin)}</td>
                  <td>
                    <Link to={`/edit/${tarea.id}`} className='btn btn-info'>
                      <i class="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <button onClick={() => deleteTarea(tarea.id)} className='btn btn-danger'>
                      <i class="fa-sharp fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompShowTareas;
