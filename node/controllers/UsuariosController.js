import Usuario from '../models/UsuarioModel.js';


export const registerUser = async (req, res) => {
  try {
    // Extraer los datos del cuerpo de la solicitud
    const { nombre, mail, contraseña } = req.body;

    // Verificar si el usuario ya existe en la base de datos
    const usuarioExistente = await Usuario.findOne({ where: { email: mail } });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }

    // Crear un nuevo usuario en la base de datos
    const nuevoUsuario = await Usuario.create({ name: nombre, email: mail, password: contraseña });

    // Enviar una respuesta con el usuario registrado
    res.status(201).json(nuevoUsuario);
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
    if (usuario.password !== contraseña) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    // Enviar una respuesta con el usuario autenticado
    res.status(200).json(usuario);
  } catch (error) {
    console.log(`Error en el inicio de sesión: ${error}`);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};
