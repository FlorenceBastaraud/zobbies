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

app.use(cookieParser());
app.use('/server/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3050"],
  credentials: true
}));
app.use('/auth', UserRouter);
app.use('/auth', ChannelRouter);

const server = app.listen(PORT, () => {
  console.log("Servir running on " + PORT + "...");
});

const socketsOptions = {cors: true, origin: ["http://localhost:5000"], credentials: true};
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