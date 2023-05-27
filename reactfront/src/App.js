import React from 'react';
import './App.css';
import CompShowTareas from './tarea/ShowTareas';
import CompCreateTarea from './tarea/CreateTarea';
import CompEditTarea from './tarea/EditTarea';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CustomNavbar from './navbar/Navbar.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Calendario from './calendario/Calendario';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <header>
       <CustomNavbar /> 
      </header>
      <Routes>
          <Route path='/' element={ <CompShowTareas /> } />
          <Route path='/create' element={ <CompCreateTarea /> } />
          <Route path='/edit/:id' element={ <CompEditTarea /> } />
          <Route path='/calendar' element={ <Calendario /> } />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
