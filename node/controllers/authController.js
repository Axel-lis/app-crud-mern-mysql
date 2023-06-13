import models from '../models/UsuarioModel.js';
const Usuario = models.UsuarioModel;

export const checkLoggedIn = (req, res, next) => {
    if (req.session.userId) {
      // El usuario está logueado
      next();
    } else {
      // El usuario no está logueado
      res.status(401).json({ message: 'No estás autenticado' });
    }
  };

  
  
  
  