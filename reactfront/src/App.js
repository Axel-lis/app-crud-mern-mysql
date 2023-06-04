import React from 'react';
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
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CompShowTareas />} />
          <Route path="/create" element={<CompCreateTarea />} />
          <Route path="/edit/:id" element={<CompEditTarea />} />
          <Route path="/calendar" element={<Calendario />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<LogoutUser />} /> {/* Utilizar el componente LogoutUser */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
