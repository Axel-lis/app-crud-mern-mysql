import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import CompShowTareas from './tarea/ShowTareas';
import CompCreateTarea from './tarea/CreateTarea';
import CompEditTarea from './tarea/EditTarea';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Calendario from './calendario/Calendario.js';
import Register from './autenticacion/Register.js';
import Login from './autenticacion/Login.js';
import LogoutUser from './autenticacion/Logout.js'; // Cambio de nombre del import

function App() {
  axios.defaults.withCredentials = true; // Necesario
  const [nombreDeUsuario, setNombreDeUsuario] = useState('');
  useEffect(() => {
    // Obtener el nombre del usuario almacenado en localStorage
    const nombreDeUsuarioAlmacenado = localStorage.getItem('nombreDeUsuario');

    // Si hay un nombre de usuario almacenado en localStorage, actualizar el estado con este valor
    if (nombreDeUsuarioAlmacenado) {
      setNombreDeUsuario(nombreDeUsuarioAlmacenado);
    }
  }, []);

  const handleSetNombreDeUsuario = (nombre) => {
    // Actualizar el estado con el nombre del usuario
    setNombreDeUsuario(nombre);

    // Almacenar el nombre del usuario en localStorage
    localStorage.setItem('nombreDeUsuario', nombre);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CompShowTareas username={nombreDeUsuario} />} />
          <Route path="/create" element={<CompCreateTarea username={nombreDeUsuario} />} />
          <Route path="/edit/:id" element={<CompEditTarea username={nombreDeUsuario} />} />
          <Route path="/calendar" element={<Calendario username={nombreDeUsuario} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setNombreDeUsuario={handleSetNombreDeUsuario} />} />
          <Route path="/logout" element={<LogoutUser />} /> {/* Utilizar el componente LogoutUser */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;