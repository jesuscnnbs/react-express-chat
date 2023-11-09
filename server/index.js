import express from "express";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import http from 'http';
import cors from 'cors';

import { PORT } from './config.js'

const app = express(); // Inicio servidor express
const server = http.createServer(app); // Importo servidor http ya que express no es compatible con socket
const io = new SocketServer(server); // La clase SocketServer acepta un servidor http como parametro 

app.use(cors())
app.use(morgan("dev"));

app.listen(PORT);

console.log("Server started on port:", PORT);
