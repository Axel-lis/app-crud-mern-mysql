import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import CustomNavbar from '../navbar/Navbar.js';
const URI = 'http://localhost:8000/tareas/'; 

const CompCreateTarea = (props) =>{
    //hooks
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateinicio, setDateinicio] = useState('');
  const [datefin, setDatefin] = useState('');

  const navigate = useNavigate();

  //procedimiento guardar
  const store = async (e) => {
     e.preventDefault();
     try {
       await axios.post(URI, { title: title, description: description, dateinicio: dateinicio, datefin: datefin });
       Swal.fire({ icon: "success", title: "Tarea guardada con éxito!" });
       navigate("/");
     } catch (error) {
       if (error.response.status === 401) {
         // El usuario no está autenticado
         navigate("/login");
       }
     }
   };
   
return(
<>    <CustomNavbar username={props.username} />  
    <div>
     <h3>Crear tarea</h3>
        <form onSubmit={store}>
        <div className='mb-3'>
        <label className='form-label'>Titulo</label>
        <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type='text'
        className='form-control'
        />
   </div>
   <div className='mb-3'>
        <label className='form-label'>Descripcion</label>
        <textarea
         value={description}
         onChange={(e) => setDescription(e.target.value)}
        type='text'
        className='form-control'
         />
    </div>
    <div className='mb-3'>
       <label className='form-label'>Fecha de Inicio</label>
       <input
        value={dateinicio}
        onChange={(e) => setDateinicio(e.target.value)}
        type='date'
        className='form-control'
         />
    </div>
    <div className='mb-3'>
       <label className='form-label'>Fecha de Finalizado</label>
       <input
       value={datefin}
       onChange={(e) => setDatefin(e.target.value)}
       type='date'
       className='form-control'
        />
     </div>
     <button type='submit' className='btn btn-primary mb-3'>Guardar</button>
     <button type='button' onClick={() =>navigate('/')} className='btn btn-danger mb-3'>Cancelar</button>
</form>

</div>
</>
    )
}
export default CompCreateTarea;