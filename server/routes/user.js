import express from 'express';
import bcrypt from 'bcrypt';
import {User} from '../models/User.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

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


router.post('/login', async (req, res) => {
  const {username, password} = req.body;

  const user = await User.findOne({username});

  if(!user){
    return res.json({message: 'This user does not exist'});
  }

  const passwordMatched = await bcrypt.compare(password, user.password);

  if(!passwordMatched){
    return res.json({message: 'This password is incorrect'});
  }


  const token = jwt.sign(
    {username: user.username},
    process.env.JWTSECRETKEY,
    {expiresIn: 2 * 60 * 60 * 1000}
  );

  res.cookie('token', token, {httpOnly: true, maxAge: 2 * 60 * 60 * 1000})

  return res.json({message: 'Login was successful.'});


});


router.post('/forgot-password', async (req, res) => {
  const {email} = req.body;

  try {

    const user = await User.findOne({email});
    
    if(!user){

      return res.json({message: 'This email address is not associated with any account'});

    } else {

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'florence.bastaraud.dw@gmail.com',
          pass: process.env.GOOGLEMAILERPASSWORD
        }
      });

      const token = jwt.sign({id: user._id}, process.env.JWTSECRETKEY, {expiresIn: 60000});

      const mailOptions = {
        from: 'florence.bastaraud.dw@gmail.com',
        to: email,
        subject: 'Zobbies: reset your password',
        html: `
        
          Hi ${user.firstname},<br><br>
          We received a request for a password reset on your <strong><em><a href="http://localhost:3000/" target="_blank">Zobbies</a></em></strong> account.<br><br>
          If you never made this request, simply disregard this email.<br><br>
          You can reset your password by clicking on the following link <a href="http://localhost:3000/reset-password#${token}" target="_blank">here</a>.<br><br>
          This link will expire in 10 minutes. After that, you'll need to submit a new request in order to reset your password.<br><br>
          Thanks,<br>
          <strong><em>Zobbies</em></strong>


        
        `
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          return res.json({message: "Error the email with reset link"});
        } else {
          console.log(info.response);
          return res.json({message: "Email sent successfully"});
        }
      });


    }

  } catch(err){
    console.log(err);
    return err;

  }


});


router.post('/reset-password/:token', async (req, res) => {

  const {token} = req.params;
  const {password} = req.body;

  try {

    const tokenDecoded = jwt.verify(token, process.env.JWTSECRETKEY);
    const userId = tokenDecoded.id;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(
      {_id: userId},
      {password: hashedPassword}
    );

    return res.json({status: true, message: 'Password reset successfully', user: { username: user.username }})

  } catch(err){

    return res.json({status: false, message: 'Error reseting the password'})
    
  }


});

export {router as UserRouter}