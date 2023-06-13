import express from "express";
import db from "./database/db.js";
import tareasRoutes from './routes/routes.js';
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import SequelizeStore from 'connect-session-sequelize';

const app = express();

app.use(express.json());

app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
  
  app.options("*", cors({ preflightContinue: true }));


app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

const SequelizeSessionStore = SequelizeStore(session.Store);

const sessionStore = new SequelizeSessionStore({
  db: db,
});

app.use(session({
  key: "userId",
  secret: "contraseñasegura2",
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 12 * 60 * 60 * 1000,
  },
}));

sessionStore.sync();

app.use('/tareas', tareasRoutes);

try{
  await db.authenticate();
  console.log('Conexion exitosa a Base de Datos.');
}catch(error){
  console.log(`Error de conexion a Base de Datos:${error}`);
}

app.listen(8000, ()=>{
  console.log('Servidor corriendo en el puerto 8000...');
});
