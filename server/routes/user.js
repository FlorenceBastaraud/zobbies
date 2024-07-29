import express from 'express';
import bcrypt from 'bcrypt';
import {User} from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const {
    lastname,
    firstname,
    dateOfBirth,
    gender,
    country,
    email,
    username,
    password
  } = req.body;

  const user = await User.findOne({email});


  if(user){
    return res.json({message: 'This user already exists'});
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    lastname,
    firstname,
    dateOfBirth,
    gender,
    country,
    email,
    username,
    password: hashedPassword,
    isVerified: false
  });

  await newUser.save();
  return res.json({message: 'Registration was successful.'});

})

export {router as UserRouter}