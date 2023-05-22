import express from "express";
import cors from "cors";
//importamos la conexion...
import db from "./database/db.js";
//importamos el enrutador
import tareasRoutes from './routes/routes.js';

const app = express()


app.use(cors())
app.use(express.json())
app.use('/tareas', tareasRoutes)

try{
    await db.authenticate()
    console.log('Conexion exitosa a Base de Datos.')
}catch(error){
    console.log(`Error de conexion a Base de Datos:${error}`)
}

/*
app.get('/', (req, res) =>{
    res.send('Hola Mundo!')
})
*/
app.listen(8000, ()=>{
    console.log('Servidor corriendo en el puerto 8000...')
})