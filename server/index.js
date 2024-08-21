import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { UserRouter } from './routes/user.js';
import { ChannelRouter } from './routes/channel.js';
import { Server } from 'socket.io';

dotenv.config();
const PORT = process.env.PORT || 5000;
const connectionString = process.env.MONGODBCONNECTIONSTRING;
const cookieSecret = process.env.COOKIE_SECRET || 'zoobies-cookies-secret';

mongoose.connect(connectionString);

const app = express();

if(process.env.NODE_ENV === 'production'){
  
  app.use(cookieParser(cookieSecret, {
    secure: true,
  }));

} else {

  app.use(cookieParser());

}


app.use(cors({
  origin: process.env.CLIENTURL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Accept'],
  credentials: true
}));


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



const socketsOptions = {
  cors: {
    origin: process.env.CLIENTURL,
    methods: ['GET', 'POST'],
    credentials: true
  }
};

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