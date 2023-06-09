import models from '../models/UsuarioModel.js';
const Usuario = models.UsuarioModel;
const TareaModel = models.TareaModel;
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const registerUser = async (req, res) => {
  try {
    // Extraer los datos del cuerpo de la solicitud
    const { nombre, mail, contraseña } = req.body;

    // Generar el hash de la contraseña utilizando bcrypt
    bcrypt.hash(contraseña, saltRounds, async (err, hash) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ mensaje: 'Error en el servidor' });
      }

      try {
        // Verificar si el usuario ya existe en la base de datos
        const usuarioExistente = await Usuario.findOne({ where: { email: mail } });
        if (usuarioExistente) {
          return res.status(400).json({ mensaje: 'El usuario ya existe' });
        }

        // Crear un nuevo usuario en la base de datos
        const nuevoUsuario = await Usuario.create({ name: nombre, email: mail, password: hash });

        // Enviar una respuesta con el usuario registrado
        res.status(201).json(nuevoUsuario);
      } catch (error) {
        console.log(`Error en el registro de usuario: ${error}`);
        res.status(500).json({ mensaje: 'Error en el servidor' });
      }
    });
  } catch (error) {
    console.log(`Error en el registro de usuario: ${error}`);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};
export const loginUser = async (req, res) => {
  try {
    // Extraer los datos del cuerpo de la solicitud
    const { mail, contraseña } = req.body;

    // Verificar si el usuario existe en la base de datos
    const usuario = await Usuario.findOne({ where: { email: mail } });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Verificar si la contraseña es correcta
    const contraseñaCorrecta = await bcrypt.compare(contraseña, usuario.password);

    if (contraseñaCorrecta) {
      // Contraseña correcta
      req.session.userId = usuario.id;

      res.cookie('userId', usuario.id, { httpOnly: true }); //asegura que "userId" se establezca en el navegador del cliente
      
      // Obtener los valores individuales del objeto usuario
      const { id, name, email } = usuario.get();
  
      // Enviar una respuesta con la propiedad loggedIn y el usuario
      res.status(200).json({ loggedIn: true, user: { id, name, email } });
    } else {
      // Contraseña incorrecta
      res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }
  } catch (error) {
    console.log(`Error en el inicio de sesión: ${error}`);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// Código para manejar la solicitud GET a /login
export const getUserLogin = async (req, res) => {
  try {
    if (req.session.userId) {
      // El usuario está logueado
      // Obtener el usuario de la base de datos utilizando el ID almacenado en la sesión
      const usuario = await Usuario.findByPk(req.session.userId);
      console.log(usuario)
      // Enviar una respuesta con la propiedad loggedIn y el usuario
      res.status(200).json({ loggedIn: true, user: usuario });
    } else {
      // El usuario no está logueado
      res.status(401).json({ loggedIn: false });
    }
  } catch (error) {
    console.log(`Error al verificar el inicio de sesión: ${error}`);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};


export const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(`Error al cerrar sesión: ${err}`);
      res.status(500).json({ mensaje: 'Error en el servidor' });
    } else {
      // Eliminar la cookie del cliente
      res.clearCookie('userId');
      res.status(200).json({ mensaje: 'Sesión cerrada correctamente' });
    }
  });
};

