import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { UserRouter } from './routes/user.js';

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
  origin: ['http://localhost:3000'],
  credentials: true
}));
app.use('/auth', UserRouter);

app.listen(PORT, () => {
  console.log("Servir running on " + PORT + "...");
});