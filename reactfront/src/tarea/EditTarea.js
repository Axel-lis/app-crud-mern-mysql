import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from 'sweetalert2';

const URI = 'http://localhost:8000/tareas/'

const CompEditTarea = () =>{
 //hooks
 const [title, setTitle] = useState('');
 const [description, setDescription] = useState('');
 const [dateinicio, setDateinicio] = useState('');
 const [datefin, setDatefin] = useState('');

 const navigate = useNavigate()
 const {id} = useParams()
 //procedimiento para guardar
 const update = async (e) =>{
    e.preventDefault()
    await axios.put(URI+id, {
        title:title,
        description:description,
        dateinicio:dateinicio,
        datefin:datefin
    })
    Swal.fire({icon:"success",title:'Tarea actualizada con éxito!'})
    navigate('/')
 }
 useEffect(()=>{
    getTareaById()
 },[])
 const getTareaById = async () =>{
    const res = await axios.get(URI+id)
    setTitle(res.data.title)
    setDescription(res.data.description)
    setDateinicio(res.data.dateinicio)
    setDatefin(res.data.datefin)
 }
 return(
    <div>
     <h3>Editar Tarea</h3>
        <form onSubmit={update}>
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
</form>

</div>
 )
}

export default CompEditTarea;