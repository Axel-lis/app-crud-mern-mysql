import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogoutUser = () => {
  const navigate = useNavigate();
  const URI = 'http://localhost:8000/tareas/logout';
  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post(URI);
        navigate('/login'); // Redirigir a la página de inicio de sesión después de cerrar sesión
      } catch (error) {
        console.log(`Error al cerrar sesión: ${error}`);
      }
    };

    logout();
  }, [navigate]);

  return null; // No necesitas renderizar nada en este componente
};

export default LogoutUser;
