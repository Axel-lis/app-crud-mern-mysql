import express from "express";
import db from "./database/db.js";//importamos la conexion...
import tareasRoutes from './routes/routes.js'; //importamos el enrutador
import cors from "cors"; //CORS

import bodyParser from "body-parser"; //para traer data del frontend
import cookieParser from "cookie-parser"; //para parsear las cookies 
import session from "express-session"; //sesiones y mantenerlas
const app = express()

app.use(express.json())
//configuramos la conexion de front/back
app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true, // importante para que la cookie este activada
      allowedHeaders: ["Content-Type", "Authorization"]
    })
  );
  


app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true})); // importantisimo

  
//middleware de sesión debe ejecutarse antes de que las rutas sean alcanzadas
// lo que permite que req.session esté disponible en tus rutas y evita el error.
app.use(session({
    key: "userId", //nombre de la cookie
    secret: "contraseñasegura2",
    resave: true,
    saveUninitialized: false,
    cookie: {
        expires: 12 * 60 * 60 * 1000, //12hs 
    },
}));

//rutas
app.use('/tareas', tareasRoutes); 

try{
    await db.authenticate()
    console.log('Conexion exitosa a Base de Datos.')
}catch(error){
    console.log(`Error de conexion a Base de Datos:${error}`)
}

app.listen(8000, ()=>{
    console.log('Servidor corriendo en el puerto 8000...')
})
