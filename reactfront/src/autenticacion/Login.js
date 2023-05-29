import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

const URI = 'http://localhost:8000/tareas/login';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitLogin = async (e) => {
    e.preventDefault();

    try {
      // Realizar la solicitud de inicio de sesión
      const response = await axios.post(URI, {
        mail: email,
        contraseña: password
      }, {
        headers: {
            'Content-type': 'application/json'
        } 
      });

      // Verificar si el inicio de sesión fue exitoso
      if (response.status === 200) {
        // Acción a realizar cuando el inicio de sesión es exitoso
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: '¡Bienvenido de nuevo!'
        }).then(() => {
           navigate('/');
          });
      } else {
        // Acción a realizar cuando el inicio de sesión falla
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Usuario o contraseña incorrectos'
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al iniciar sesión'
      });
    }
  };

  return (
    <div className="container-fluid body">
      <div className="row vh-100">
        <div className="col-lg-6 text-black p-5">
          <h1 className="mb-4 text-white">Iniciar sesión</h1>
        </div>
        <div className="col-lg-6">
          <div className="card mt-5">
            <div className="card-body">
              <form onSubmit={submitLogin}>
                <h2 className="card-title mb-4">Iniciar sesión</h2>
                <div className="mb-3">
                  <label htmlFor="loginEmail" className="form-label">Email</label>
                  <input type="email" className="form-control" id="loginEmail" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="loginPassword" className="form-label">Contraseña</label>
                  <input type="password" className="form-control" id="loginPassword" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Iniciar sesión</button>
              </form>
              <hr className="my-4" />
              <h5 className="card-title mb-4">
                ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
              </h5>
              <h5>Olvidé mi contraseña</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
