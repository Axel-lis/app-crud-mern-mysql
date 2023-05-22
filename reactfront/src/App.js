import React from 'react';
import logo from './logo.svg';
import './App.css';
import CompShowTareas from './tarea/ShowTareas';
import CompCreateTarea from './tarea/CreateTarea';
import CompEditTarea from './tarea/EditTarea';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <BrowserRouter>
      <Routes>
          <Route path='/' element={ <CompShowTareas /> } />
          <Route path='/create' element={ <CompCreateTarea /> } />
          <Route path='/edit/:id' element={ <CompEditTarea /> } />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
