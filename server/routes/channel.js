import express from 'express';
import {Channel} from '../models/Channel.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/add-channel', async (req, res) => {

    try {

      const token = await req.cookies?.token;      
  
      const tokenDecoded = jwt.verify(token, process.env.JWTSECRETKEY);
  
      const username = tokenDecoded.username;      
      
      if(username === 'flothecardinal'){
        
        return res.json({status: true, message: 'Access authorized'})
        
      } else {

        return res.json({status: false, message: 'Access denied'})

      }
  
    } catch(err){      
  
      return res.json({status: false, message: 'issue with the authorization process'})
      
    }
  



});


router.post('/add-channel', async (req, res) => {

  const {name, displayName} = req.body;

  if(name.length > 0 && displayName.length > 0){

    const channel = await Channel.findOne({name});    

    if(channel){
      return res.json({status: false, message: 'Channel already exists'});
    }

    try {

      const newChannel = new Channel({
        name,
        displayName,
        members: [],
        chat: []
      });

      await newChannel.save();
      res.json({status: true, message: 'Channel added successfully'});


    } catch(err){

      res.json({status: false, message: 'error adding the channel'});

    }
    

  } else {

    console.log('Empty field(s)');
    res.json({status: false, message: 'Empty field(s)'});

  }

});


// router.get('/channels', async (req, res) => {

//   try {

//     const token = await req.cookies?.token;

//     const tokenDecoded = jwt.verify(token, process.env.JWTSECRETKEY);

//     const username = tokenDecoded.username;

//     const user = await Channel.findOne({username: username});

//     return res.json({status: true, message: 'User found succesfully', user: user})

//   } catch(err){

//     return res.json({status: false, message: 'User not found'})
    
//   }


// });

export {router as ChannelRouter}  