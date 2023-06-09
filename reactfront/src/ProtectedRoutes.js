import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ element: Element }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    try {
      const response = await axios.get('http://localhost:8000/tareas/login', {
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (response.data.loggedIn) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return loggedIn ? <Element /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
