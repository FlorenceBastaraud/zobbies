import express from 'express';
import {Channel} from '../models/Channel.js';
import {User} from '../models/User.js';
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
        chat: [],
        descriptop: ''
      });

      await newChannel.save();
      res.json({status: true, message: 'Channel added successfully'});


    } catch(err){

      res.json({status: false, message: 'error adding the channel'});

    }
    

  } else {

    res.json({status: false, message: 'Empty field(s)'});

  }

});


router.get('/channels', async (req, res) => {

  try {

    const channels = await Channel.find({});

    return res.json({status: true, message: 'Channels sent succesfully', channels})

  } catch(err){

    return res.json({status: false, message: 'Channels not found'})
    
  }


});


router.get('/channel/:name', async (req, res) => {

  const {name} = req.params;
  
  try {

    const channel = await Channel.findOne({name});
    
    return res.json({status: true, message: 'Channels sent succesfully', channel})

  } catch(err){

    return res.json({status: false, message: 'Channel not found'})
    
  }


});



router.post('/channel-interactions', async (req, res) => {

  const {channel, action, updateChatData} = req.body;
  const token = await req.cookies?.token;
  const tokenDecoded = jwt.verify(token, process.env.JWTSECRETKEY);
  const username = tokenDecoded.username;
  

  if(action == 'join'){

    try {
  
      const user = await User.findOneAndUpdate(
        {username},
        {$addToSet: {channels: channel}},
        {new: true}
      );
  
      
      const currChannel = await Channel.findOneAndUpdate(
        {name: channel},
        {$addToSet: {members: user._id}},
        {new: true}
      );
      
    
      res.json({status: true, user, currChannel});
  
    } catch (err){
      res.json({status: false, message: err});
    }

  } else if(action == 'leave') {

    try {
      
      const user = await User.findOneAndUpdate(
        {username},
        {$pull: {channels: channel}},
        {new: true}
      );
  
      
      const currChannel = await Channel.findOneAndUpdate(
        {name: channel},
        {$pull: {members: user._id}},
        {new: true}
      );
      
        
      res.json({status: true, user, currChannel});
  
    } catch (err){
      res.json({status: false, message: err});
    }

  } else if(action == 'update-chat'){


    const {newThread, date, incomingMessage, time} = updateChatData;
    let user;
    let userId;
    
    try {
      user = await User.findOne({username});
      userId = user._id
      
    } catch(err){
      return err
    }
    
    try {
      
      if(newThread){
        
        new Promise(async (resolve, reject) => {
                    
          const dateThread = await Channel.findOne({"chat.date": date});
          
          if(!dateThread){                
            
            let newdateinthread = await Channel.findOneAndUpdate(
              {name: channel},
              {$addToSet: {chat: {
                date,
                messages: []
              }}},
              {new: true}
            );
            
            
          }
                    
          
          resolve();
          
        }).then(async () => {               
          
          let channelChatUpdated = await Channel.findOneAndUpdate(
            {name: channel},
            {
              $addToSet: {
                "chat.$[element].messages": {
                  userId,
                  message: incomingMessage,
                  date,
                  time
                },
              },
            },
            {
              arrayFilters: [
                { "element.date": date},
              ],
            },
            {new: true}
          )

          if(channelChatUpdated){
            res.json({status: true, message: 'message added', user});
          } else {
            res.json({status: false, message: 'message not added'});
          }
          
        })
        
        
      } else {

        let channelChatUpdated = await Channel.findOneAndUpdate(
          {name: channel},
          {
            $addToSet: {
              "chat.$[element].messages": {
                userId,
                message: incomingMessage,
                date,
                time
              },
            },
          },
          {
            arrayFilters: [
              { "element.date": date},
            ],
          },
          {new: true}
        )
       
        if(channelChatUpdated){
          res.json({status: true, message: 'message added', user});
        } else {
          res.json({status: false, message: 'message not added'});
        }


      }      
      
  
    } catch (err){
      res.json({status: false, message: err});
    }


  } else if(action == 'socket'){
    
    try {
      
      const user = await User.findOneAndUpdate(
        {username},
        {socketId: updateChatData},
        {new: true}
      );
        
      res.json({status: true, user});
  
    } catch (err){
      res.json({status: false, message: err});
    }

  } else {
    res.json({status: false, message: 'action missing'});
  }
  

});


export {router as ChannelRouter}  