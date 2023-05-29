import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './register.css';
import { Link } from 'react-router-dom';

const URI = 'http://localhost:8000/tareas/register';

const Register = () => {
  // Hooks
  const [nombre, setNombre] = useState('');
  const [mail, setMail] = useState('');
  const [contraseña, setContraseña] = useState('');

  // Procedimiento guardar registro usuario
  const registrar = async (e) => {
    e.preventDefault();

    // Verificar condiciones de contraseña
    if (contraseña.length < 8 || contraseña.length > 20) {
      Swal.fire({
        icon: 'error',
        title: 'Contraseña inválida',
        text: 'La contraseña debe tener entre 8 y 20 caracteres',
      });
      return;
    }

    // Verificar condiciones de nombre
    if (nombre.length < 5) {
      Swal.fire({
        icon: 'error',
        title: 'Nombre inválido',
        text: 'El nombre debe tener al menos 5 caracteres',
      });
      return;
    }

    // Verificar formato de correo electrónico
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(mail)) {
      Swal.fire({
        icon: 'error',
        title: 'Email inválido',
        text: 'Ingrese un correo electrónico válido',
      });
      return;
    }

    // Verificar si el correo electrónico ya está en uso
    try {
      const existeEmail = await axios.get(URI + `?email=${mail}`);
      if (existeEmail.data) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El correo electrónico ya está en uso',
        });
        return;
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al verificar el correo electrónico',
      });
      return;
    }

    // Registrar el usuario si el correo electrónico no está en uso
    try {
      await axios.post(
        URI,
        { nombre, mail, contraseña },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      Swal.fire({
        icon: 'success',
        title: 'Bienvenido a bordo!',
        text: 'Ahora inicia sesión para comenzar a usar la aplicación',
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al registrar el usuario, ya que el mail se encuentra en uso..',
      });
    }
  };

  return (
    <div className="container-fluid body">
      <div className="row vh-100">
        <div className="col-lg-6 text-black p-5">
          <h1 className="mb-4 text-white">Bienvenido</h1>
        </div>
        <div className="col-lg-6">
          <div className="card mt-5">
            <div className="card-body">
              <form onSubmit={registrar}>
                <h2 className="card-title mb-4">Crea tu cuenta de usuario</h2>
                <div className="mb-3">
                  <label htmlFor="registerName" className="form-label">Nombre</label>
                  <input type="text" className="form-control" id="registerName" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="registerEmail" className="form-label">Email</label>
                  <input type="email" className="form-control" id="registerEmail" value={mail} onChange={(e) => setMail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="registerPassword" className="form-label">Contraseña</label>
                  <input type="password" className="form-control" id="registerPassword" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Registrarse</button>
                <h5 className="mb-4">
                  ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link>
                </h5>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
