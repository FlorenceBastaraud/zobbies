import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { UserRouter } from './routes/user.js';
import { ChannelRouter } from './routes/channel.js';
import { Server } from 'socket.io';

dotenv.config();
const PORT = process.env.PORT;
const connectionString = process.env.MONGODBCONNECTIONSTRING;

mongoose.connect(connectionString);

const app = express();

app.use(cors({
  origin: [
    process.env.CLIENTURL,
    'https://florence-b.com/zobbies/',
    'https://florence-b.com/',
    'http://florence-b.com/',
    'http://florence-b.com/zobbies',
    'http://florence-b.com',
    'https://florence-b.com/zobbies/*'],
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}));
app.use(cookieParser());
app.use('/server/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/auth', UserRouter);
app.use('/auth', ChannelRouter);

const server = app.listen(PORT, () => {
  console.log(`Servir running on ${PORT} ... click to access: ${process.env.SERVERURL}`);
});

app.get("/", (req, res) => {
  res.status(200).send("Zobbies server running...");
});

const socketsOptions = {cors: true, origin: [`${process.env.SERVERURL}`], credentials: true};
const io = new Server(server, socketsOptions);

io.on("connection", socket => {
  
  socket.join('room');
  socket.on('message', (message) => {       
    io.to('room').emit('newMessage', {
      messageSocketId: message.messageSocketId,
      incomingMessage: message.message
    });
  });
  
});