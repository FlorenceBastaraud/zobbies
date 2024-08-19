import {goTo, updateNav} from './managmentFunctions.js';
import { getServerUrl} from './functions.js';
const serverUrl = getServerUrl();

export async function handleRegister(formData, event){

  const userRegisterData = {
    method: 'POST',
    'credentials': 'include',
    body: JSON.stringify(formData)
  };


  try {

    const response = await fetch(`${serverUrl}/auth/register`, userRegisterData);
    const data = await response.json();

    if(data.message == 'This user already exists'){

      document.getElementById('error-register').innerText = 'Sorry, this email address is already taken.';

    } else {

      event.target.reset();

      document.querySelector('.enter-space__register--title').innerText = "You're signed up!";
      document.querySelector('.enter-space__register--description').innerText = "You can now log in to discover our Zobbies channels. You've been sent a mail to confirm your e-mail address.";
      document.getElementById('registerForm').innerHTML = "";
      window.scrollTo({ top: 0, behavior: 'smooth' })

    }

    

  } catch(err){

    return err;

  }

}


export async function handleLogin(formData, event){
  
  const userLoginData = {
    method: 'POST',
    'credentials': 'include',
    body: JSON.stringify(formData)
  };


  try {

    const response = await fetch(`${serverUrl}/auth/login`, userLoginData);
    const data = await response.json();

    if(data.message == 'This user does not exist'){

      document.getElementById('error-login').innerText = 'Sorry, this account doesn\'t exist. Make sure your username is correct.';

    } else if(data.message == 'This password is incorrect'){

      document.getElementById('error-login').innerText = 'Sorry, your password is incorrect.';

    } else {

      event.target.reset();
      goTo('/channels');
      updateNav();

    }

    

  } catch(err){

    return err;

  }

}


export async function handleForgotPassword(formData, event){

  const userForgotData = {
    method: 'POST',
    'credentials': 'include',
    body: JSON.stringify(formData)
  };


  try {

    const response = await fetch(`${serverUrl}/auth/forgot-password`, userForgotData);
    const data = await response.json();

    if(data.message == 'This email address is not associated with any account'){

      document.getElementById('error-forgot-password').innerText = 'Sorry, this email address in not linked to any account. Make sure your email address is correct.';

    } else {

      event.target.reset();

      document.querySelector('.forgot-password__title').innerText = "One more step to go!";
      document.querySelector('.forgot-password__description').innerText = "Please check your inbox. You've been sent an email with a reset link to update your password.";
      document.getElementById('ForgotPasswordForm').innerHTML = "";

    }

    

  } catch(err){

    return err;

  }

}


export async function handleResetPassword(formData, event){

  const userResetData = {
    method: 'POST',
    'credentials': 'include',
    body: JSON.stringify(formData)
  };

  const token = location.hash.replace('#', '');

  try {

    const response = await fetch(`${serverUrl}/auth/reset-password/${token}`, userResetData);
    const data = await response.json();

    if(!data.status){

      document.getElementById('error-reset-password').innerText = 'Sorry, there seem to be an error in the reset process. Try again later.';

    } else {

      event.target.reset();

      document.querySelector('.reset-password__title').innerText = "Your password has been reset!";
      document.querySelector('.reset-password__description').innerHTML = `<span>You can now <a href="/enter-space">log in</a> into your account, using your username (<strong><em>${data.user.username}</em></strong>), your new password.</span>`;
      document.getElementById('ResetPasswordForm').innerHTML = "";
      window.scrollTo({ top: 0, behavior: 'smooth' })

    }

    

  } catch(err){

    return err;

  }

}


export async function checkUserConnexionStatus(){

  const connectData = {
    method: 'GET',
    'credentials': 'include'
  };

  const response = await fetch(`${serverUrl}/auth/connected`, connectData);
  const data = await response.json();
  return data.status;
  
}


export async function getUserInfos(){

  const profileData = {
    method: 'GET',
    'credentials': 'include'
  };

  const response = await fetch(`${serverUrl}/auth/user`, profileData);
  const data = await response.json();

  if(data.status){
   return data.user; 
  }

}


export async function handleUpdateUserInfos(formData, event){

  const userInfosData = {
    method: 'POST',
    'credentials': 'include',
    body: formData
  };


  try {

    const response = await fetch(`${serverUrl}/auth/update-user`, userInfosData);
    const data = await response.json();

    if(!data.status){

      document.getElementById('error-edit-profile').innerText = 'Sorry, error updating your informations';

    } else {

      event.target.reset();
      window.scrollTo({ top: 0, behavior: 'smooth' })

      document.querySelector('.edit-profile__title').innerText = "Profile updated!";
      document.getElementById('edit-profile-form').innerHTML = "";

      setTimeout(() => {
        goTo('/profile');
      }, 3000);


    }

    

  } catch(err){

    return err;

  }

}


export async function handleSettings(formData, event){

  const userSettingsData = {
    method: 'POST',
    'credentials': 'include',
    body: JSON.stringify(formData)
  };


  try {

    const response = await fetch(`${serverUrl}/auth/settings`, userSettingsData);
    const data = await response.json();

    if(!data.status && data.spec == 'Email already taken'){

      document.getElementById('error-settings').innerText = 'Sorry, this email address is already taken.';

    } else if(!data.status && data.spec == 'Username already taken'){

      document.getElementById('error-settings').innerText = 'Sorry, this username is already taken.';

    } else {

      event.target.reset();

      document.querySelector('.settings__title').innerText = "Informations saved!";
      document.getElementById('settings-form').innerHTML = "";
      window.scrollTo({ top: 0, behavior: 'smooth' })

      setTimeout(() => {
        goTo('/profile');
      }, 2000);

    }

    

  } catch(err){

    return err;

  }

}


export async function getAdminAccess(){

  const addChannelData = {
    method: 'GET',
    'credentials': 'include'
  };

  const response = await fetch(`${serverUrl}/auth/add-channel`, addChannelData);
  const data = await response.json();  

  return data.status; 

}

export async function handleAddChannel(formData, event){

  const addChannelData = {
    method: 'POST',
    'credentials': 'include',
    body: JSON.stringify(formData)
  }


  try {

    const response = await fetch(`${serverUrl}/auth/add-channel`, addChannelData);
    const data = await response.json();

    if(!data.status){

      if(data.message == 'error adding the channel'){

        document.getElementById('error-add-channel').innerText = 'Error adding the channel. Please try again later.';

      } else if(data.message == 'Channel already exists') {

        document.getElementById('error-add-channel').innerText = "Sorry, this channel already exists.";

      } else {

        document.getElementById('error-add-channel').innerText = 'Make sure no field is empty';

      }

    } else {

      event.target.reset();

      document.querySelector('.add-channel__title').innerText = "Channel Added!";
      document.getElementById('addChannelForm').innerHTML = "";
      window.scrollTo({ top: 0, behavior: 'smooth' })

      setTimeout(() => {
        goTo('/channels');
      }, 1000);

    }

    

  } catch(err){

    return err;

  }



}

export async function userChannelInteractions(channel, action, updateChatData = null){

  
  try {
    
    const fetchData = {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({channel, action, updateChatData})
    }
    
  
    const response = await fetch(`${serverUrl}/auth/channel-interactions`, fetchData)
    const data = await response.json();
    
    if(data.status){
      return data;
    }
    
  } catch (err){    

    return err;

  }


}

export async function getChannels(){

  const channelsData = {
    method: 'GET',
    'credentials': 'include'
  };

  const response = await fetch(`${serverUrl}/auth/channels`, channelsData);
  const data = await response.json();

  if(data.status){
   return data.channels; 
  }

}



export async function getChannel(){

  const userChannelData = {
    method: 'GET',
    'credentials': 'include'
  };

  const name = location.hash.replace('#', '');

  try {

    const response = await fetch(`${serverUrl}/auth/channel/${name}`, userChannelData);
    const data = await response.json();

    if(data.status){
      return data.channel; 
     }

  } catch(err){

    return err;

  }

}



export async function getUserById(id){

  const userData = {
    method: 'GET',
    'credentials': 'include'
  };

  const response = await fetch(`${serverUrl}/auth/user/${id}`, userData);
  const data = await response.json();  

  if(data.status){
   return data.user; 
  }

}


export async function getUsers(){

  const usersData = {
    method: 'GET',
    'credentials': 'include'
  };

  const response = await fetch(`${serverUrl}/auth/users`, usersData);
  const data = await response.json();  

  if(data.status){
   return data.users; 
  }

}


export async function getUserBySocketId(socketId){

  const userData = {
    method: 'GET',
    'credentials': 'include'
  };

  const response = await fetch(`${serverUrl}/auth/current-user/${socketId}`, userData);
  const data = await response.json();  

  if(data.status){
   return data.user; 
  }

}


export async function getMessagesByUser(userId){

  const userData = {
    method: 'GET',
    'credentials': 'include'
  };

  const response = await fetch(`${serverUrl}/auth/all-messages/`, userData);
  const data = await response.json();  

  if(data.status){

    const channels = data.channels;

    const userMessages = [];

    channels.map(channel => {
      if(channel.members.length > 0){      
        if(channel.members.includes(userId)){
          if(channel.chat.length > 0){
            channel.chat.map(chat => {
              chat.messages.filter(message => {
                if(message.userId === userId){
                  userMessages.push({channel: {name: channel.name, displayName: channel.displayName}, message});
                }
              })         
            })
          }
        }
      }
    })

    
   return userMessages; 

  }

}