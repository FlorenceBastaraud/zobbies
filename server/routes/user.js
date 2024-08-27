import express from 'express';
import bcrypt from 'bcrypt';
import {User} from '../models/User.js';
import {Channel} from '../models/Channel.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import isUserConnected from '../helpers/middlewares/userConnected.js';
import upload from '../helpers/middlewares/upload.js';

const router = express.Router();

const cookieParams = {
  httpOnly: true,
  maxAge: 2 * 60 * 60 * 1000,
  path: '/',
  domain: process.env.WEBSITEDOMAIN
};

if(process.env.NODE_ENV === 'production'){
  cookieParams.sameSite = 'Lax';
  cookieParams.secure = true;
}

router.post('/register', async (req, res) => {
  try {

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
      return res.status(400).json({message: 'This user already exists'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const socketIdValuePlaceholder = new Date().toLocaleString().split('').join('a');

    const newUser = new User({
      lastname,
      firstname,
      dateOfBirth,
      gender,
      country,
      email,
      username,
      password: hashedPassword,
      pl: password.length,
      isVerified: false,
      displayName: `${lastname} ${firstname}`,
      bio: ' ',
      userPicture: ' ',
      channels: [],
      socketId: socketIdValuePlaceholder
    });

    await newUser.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'fbastaraud@yahoo.fr',
        pass: process.env.GOOGLEMAILERPASSWORD
      }
    });

    const token = jwt.sign({id: newUser._id}, process.env.JWTSECRETKEY, {expiresIn: '10m'});

    const mailOptions = {
      from: 'fbastaraud@yahoo.fr',
      to: email,
      subject: 'Zobbies: Verify Your Account',
      html: `
        Hi ${firstname},<br><br>
        Your <strong><em><a href="${process.env.CLIENTURL}" target="_blank">Zobbies</a></em></strong> account has been created.<br><br>
        Make sure to verify your account by clicking on the following link <a href="${process.env.CLIENTURL}/verify-account#${token}" target="_blank">here</a>.<br><br>
        Thanks,<br>
        <strong><em>Zobbies</em></strong>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({message: 'Registration was successful. Please check your email for verification.'});

  } catch(error){

    console.error('Registration error:', error);

    res.status(500).json({message: 'Server error during registration.'});

  }

});


router.post('/login', async (req, res) => {

  try {

    const {username, password} = req.body;

    const user = await User.findOne({username});

    if(!user){
      return res.status(400).json({message: 'This user does not exist'});
    }

    const passwordMatched = await bcrypt.compare(password, user.password);

    if(!passwordMatched){
      return res.status(400).json({message: 'This password is incorrect'});
    }

    const token = jwt.sign({username: user.username}, process.env.JWTSECRETKEY, {expiresIn: '2h'});

    res.cookie('token', token, cookieParams);

    res.status(200).json({message: 'Login was successful.'});

  } catch(error){
    
    console.error('Login error:', error);
    res.status(500).json({message: 'Server error during login.'});

  }

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
          user: 'fbastaraud@yahoo.fr',
          pass: process.env.GOOGLEMAILERPASSWORD
        }
      });

      const token = jwt.sign({id: user._id}, process.env.JWTSECRETKEY, {expiresIn: 60000});

      const mailOptions = {
        from: 'fbastaraud@yahoo.fr',
        to: email,
        subject: 'Zobbies: reset your password',
        html: `
        
          Hi ${user.firstname},<br><br>
          We received a request for a password reset on your <strong><em><a href="${process.env.CLIENTURL}/" target="_blank">Zobbies</a></em></strong> account.<br><br>
          If you never made this request, simply disregard this email.<br><br>
          You can reset your password by clicking on the following link <a href="${process.env.CLIENTURL}/reset-password#${token}" target="_blank">here</a>.<br><br>
          This link will expire in 10 minutes. After that, you'll need to submit a new request in order to reset your password.<br><br>
          Thanks,<br>
          <strong><em>Zobbies</em></strong>


        
        `
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          return res.json({message: "Error sending the email with reset link"});
        } else {
          return res.json({message: "Email sent successfully"});
        }
      });


    }

  } catch(err){

    return err;
  
  }


});


router.post('/reset-password/:token', async (req, res) => {

  const {token} = req.params;
  const {password} = req.body;

  const pl = password.length;

  try {

    const tokenDecoded = jwt.verify(token, process.env.JWTSECRETKEY);
    const userId = tokenDecoded.id;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(
      {_id: userId},
      {password: hashedPassword},
      {pl: pl}
    );

    return res.json({status: true, message: 'Password reset successfully', user: { username: user.username }})

  } catch(err){

    return res.json({status: false, message: 'Error reseting the password'})
    
  }


});


router.get('/connected', isUserConnected, async (req, res) => {

  return res.json({status: true, message: 'connected'})

});


router.post('/verify-account/:token', async (req, res) => {

  const {token} = req.params;

  try {

    const tokenDecoded = jwt.verify(token, process.env.JWTSECRETKEY);
    const userId = tokenDecoded.id;

    const user = await User.findByIdAndUpdate(
      {_id: userId},
      {isVerified: true}
    );

    return res.json({status: true, message: 'Account verified successfully', user: { userFirstname: user.firstname }})

  } catch(err){

    return res.json({status: false, message: 'Error verifying the account'})
    
  }


});


router.get('/logout', (req, res) => {

  const clearCookieParams = {
    httpOnly: true,
    maxAge: null
  };
  
  if (process.env.NODE_ENV === 'production') {
    clearCookieParams.sameSite = 'None';
    clearCookieParams.secure = true;
  }
  
  res.clearCookie('token', clearCookieParams);

  return res.json({status: true});
  
});


router.get('/user', async (req, res) => {

  try {

    const token = await req.cookies?.token;

    const tokenDecoded = jwt.verify(token, process.env.JWTSECRETKEY);

    const username = tokenDecoded.username;

    const user = await User.findOne({username: username});

    return res.json({status: true, message: 'User found succesfully', user: user})

  } catch(err){

    return res.json({status: false, message: 'User not found'})
    
  }


});


router.post('/update-user', upload.single('user_picture'), async (req, res) => {

  const {displayName, bio} = req.body;
  const userPicture = JSON.stringify(req.file) || '';

  try {

    const token = await req.cookies?.token;
    const tokenDecoded = jwt.verify(token, process.env.JWTSECRETKEY);
    const username = tokenDecoded.username;

    await User.findOneAndUpdate(
      {username},
      { "$set": { userPicture, displayName, bio}}
    );

    return res.json({status: true, message: 'User infos updated successfully'});

  } catch(err){

    return res.json({status: false, message: 'Error updating user infos'});
    
  }


});



router.post('/settings', async (req, res) => {
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

  
  const token = await req.cookies?.token;
  const tokenDecoded = jwt.verify(token, process.env.JWTSECRETKEY);
  const currentUserUsername = tokenDecoded.username;
  
  const currentUser = await User.findOne({username: currentUserUsername});
  const userFoundByEmail = await User.findOne({email});
  const userFoundByUsername = await User.findOne({username});
  

  if(userFoundByEmail && (userFoundByEmail.id !== currentUser.id)){
    
    return res.json({status: false, message: 'This user already exists', spec: 'Email already taken'});
    
  } else if(userFoundByUsername && (userFoundByUsername.id !== currentUser.id)){
    
    return res.json({status: false, message: 'This user already exists', spec: 'Username already taken'});

  }
  
  
  try {


    if(username !== currentUser.username){
      const token = jwt.sign(
        {username},
        process.env.JWTSECRETKEY,
        {expiresIn: 2 * 60 * 60 * 1000}
      );
    
      
      res.cookie('token', token, cookieParams);

    }

    if(password.length > 0){ 

      const hashedPassword = await bcrypt.hash(password, 10);
      
      const pl = password.length;
      
      await User.findOneAndUpdate(
        {username: currentUser.username},
        { "$set": { lastname, firstname, dateOfBirth, gender, country, email, username, password: hashedPassword, pl}}
      );
      

    } else {
      
      await User.findOneAndUpdate(
        {username: currentUser.username},
        { "$set": { lastname, firstname, dateOfBirth, gender, country, email, username}}
      );      

    }
    

  } catch(e){
    return res.json({status: false, message: 'Error updating the user informations.'});
  }


  return res.json({status: true, message: 'Update was successful.'});

})


router.get('/user/:id', async (req, res) => {

  const {id} = req.params;

  const user = await User.findById({_id: id});

  if(user){
    res.json({status: true, message: "User found", user});
  } else {
    res.json({status: false, message: 'User not found'});
  }
  

});


router.get('/users', async (req, res) => {

  const users = await User.find({});

  if(users){
    res.json({status: true, message: "Users list found", users});
  } else {
    res.json({status: false, message: 'Users not found'});
  }
  

});


router.get('/current-user/:socketId', async (req, res) => {

  const {socketId} = req.params;

  const user = await User.findOne({socketId});

  if(user){
    res.json({status: true, message: "User found", user});
  } else {
    res.json({status: false, message: 'User not found'});
  }
  

});


router.get('/all-messages/', async (req, res) => {

  const channels = await Channel.find({});

  if(channels){
    res.json({status: true, message: "User found", channels});
  } else {
    res.json({status: false, message: 'User not found'});
  }
  

});



export {router as UserRouter}