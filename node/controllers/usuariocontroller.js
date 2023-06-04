import express from "express";
import cors from "cors";
//importamos la conexion...
import db from "./database/db.js";

const app = express()

app.use(cors())
app.use(express.json())