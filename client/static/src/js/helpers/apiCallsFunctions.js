import {goTo, updateNav} from './managmentFunctions.js';


export async function handleRegister(formData, event){

  const userRegisterData = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  };


  try {

    const response = await fetch("http://localhost:5000/auth/register", userRegisterData);
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
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  };


  try {

    const response = await fetch("http://localhost:5000/auth/login", userLoginData);
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
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  };


  try {

    const response = await fetch("http://localhost:5000/auth/forgot-password", userForgotData);
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
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  };

  const token = location.hash.replace('#', '');

  try {

    const response = await fetch(`http://localhost:5000/auth/reset-password/${token}`, userResetData);
    const data = await response.json();

    if(!data.status){

      document.getElementById('error-reset-password').innerText = 'Sorry, there seem to be an error in the reset process. Try again later.';

    } else {

      event.target.reset();

      document.querySelector('.reset-password__title').innerText = "Your password has been reset!";
      document.querySelector('.reset-password__description').innerHTML = `<span>You can now <a href="/enter-space">log in</a> into your account, using your username (<em>${data.user.username}</em>), your new password.</span>`;
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
    'credentials': 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  const response = await fetch('http://localhost:5000/auth/connected', connectData);
  const data = await response.json();
  return data.status;
  
}


export async function getUserInfos(){

  const profileData = {
    method: 'GET',
    'credentials': 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  };

  const response = await fetch('http://localhost:5000/auth/user', profileData);
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

    const response = await fetch("http://localhost:5000/auth/update-user", userInfosData);
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
