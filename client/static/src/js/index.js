import {callRouter, goTo, updateNav} from './helpers/managmentFunctions.js';
import {handleRegister, handleLogin, handleForgotPassword, handleResetPassword} from './helpers/apiCallsFunctions.js';



// history, router and click events
window.addEventListener('popstate', callRouter);

document.addEventListener('DOMContentLoaded', () => {

  
  document.body.addEventListener('click', (e) => {
    if(e.target.matches('[data-link]')){

      e.preventDefault();
      goTo(e.target.href);
      updateNav();
      
    }
  });
  
  updateNav();
  callRouter();



})


// enter space view specificities
window.document.addEventListener('DOMContentLoaded', () => {

  const registerBloc = document.getElementById('register-bloc');
  const loginBloc = document.getElementById('login-bloc');
  const toggleFormBtns = document.querySelectorAll('.toggle-form');

  toggleFormBtns.forEach(toggleFormBtn => {
    toggleFormBtn.addEventListener('click', function(e){

      let currentForm = e.target.getAttribute('data-toggle');

      if(currentForm == 'register'){
        registerBloc?.classList.add('display-none');
        loginBloc?.classList.remove('display-none');
      } else {
        registerBloc?.classList.remove('display-none');
        loginBloc?.classList.add('display-none');
      }
  
    }, true)
  });


  function responsiveView(){
    const windowWidth = window.innerWidth;
    const widthBreakpoint = 1350;

    if(windowWidth < widthBreakpoint){
      registerBloc?.classList.add('display-none');
      toggleFormBtns?.forEach(toggleFormBtn => toggleFormBtn.classList.remove('display-none'));
    } else {
      registerBloc?.classList.remove('display-none');
      toggleFormBtns?.forEach(toggleFormBtn => toggleFormBtn.classList.add('display-none'));
    }

  }

  responsiveView();

  if(document.body.getAttribute('view') === "enter-space"){
    window.addEventListener('resize', responsiveView);
  }


});


// handle register form submit event
window.document.addEventListener('DOMContentLoaded', function(){

  document.getElementById('registerForm')?.addEventListener('submit', function(e){

    e.preventDefault();

    const lastname = document.getElementById("lastname").value;
    const firstname = document.getElementById("firstname").value;
    const dateOfBirth = document.getElementById("dateofbirth").value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const country = document.getElementById('country').value;
    const email = document.getElementById('email').value;
    const registerUsername = document.getElementById('register-username').value;
    const registerPassword = document.getElementById('register-password').value;
    const registerPasswordConfirmation = document.getElementById('register-password-confirmation').value;
    

    const errorMessageSpan = document.getElementById('error-register');
    let errorMessage = '';


    if(
        lastname == "" ||
        firstname == "" ||
        dateOfBirth == "" ||
        gender == "" ||
        country == "" ||
        email == "" ||
        registerUsername == "" ||
        registerPassword == "" ||
        registerPasswordConfirmation == ""
      ) {

        errorMessage = "Please make sure no field is empty";
        errorMessageSpan.innerText = errorMessage;

      } else if(registerPassword !== registerPasswordConfirmation){

        errorMessage = "Your confirmation password must be the same as your password.";
        errorMessageSpan.innerText = errorMessage;

      } else {

        const registerValues = {
          lastname,
          firstname,
          dateOfBirth,
          gender,
          country,
          email,
          username: registerUsername,
          password: registerPassword,
        }

        handleRegister(registerValues, e);
        errorMessageSpan.innerText = '';
        

    }

    
  })

});


// handle login form submit event
window.document.addEventListener('DOMContentLoaded', function(){

  document.getElementById('LoginForm')?.addEventListener('submit', function(e){

    e.preventDefault();

    const loginUsername = document.getElementById('username').value;
    const loginPassword = document.getElementById('password').value;
    
    const errorMessageSpan = document.getElementById('error-login');
    let errorMessage = '';


    if(loginUsername == "" || loginPassword == "") {

        errorMessage = "Please make sure no field is empty";
        errorMessageSpan.innerText = errorMessage;

      } else {

        const loginValues = {
          username: loginUsername,
          password: loginPassword,
        }

        handleLogin(loginValues, e);
        errorMessageSpan.innerText = '';
        

    }

    
  })

});


// handle forgot password form submit event
window.document.addEventListener('DOMContentLoaded', function(){

  document.getElementById('ForgotPasswordForm')?.addEventListener('submit', function(e){

    e.preventDefault();

    const userEmail = document.getElementById('forgot-password-email').value;
    
    const errorMessageSpan = document.getElementById('error-forgot-password');
    let errorMessage = '';


    if(userEmail == "") {

        errorMessage = "Please enter your email address.";
        errorMessageSpan.innerText = errorMessage;

      } else {

  
        handleForgotPassword({ email: userEmail}, e);
        errorMessageSpan.innerText = '';
        

    }

    
  })

});


// handle reset password form submit event
window.document.addEventListener('DOMContentLoaded', function(){

  document.getElementById('ResetPasswordForm')?.addEventListener('submit', function(e){

    e.preventDefault();

    const userNewPassword = document.getElementById('new-password').value;
    const userNewPasswordConfirm = document.getElementById('confirm-new-password').value;

    const errorMessageSpan = document.getElementById('error-reset-password');
    let errorMessage = '';


    if(userNewPassword == "" || userNewPasswordConfirm == "") {

        errorMessage = "Please make sure no field is empty.";
        errorMessageSpan.innerText = errorMessage;

      } else if(userNewPassword !== userNewPasswordConfirm) {

        errorMessage = "Your confirm password should be identical to your new password";
        errorMessageSpan.innerText = errorMessage;

      } else {

  
        handleResetPassword({ password: userNewPassword}, e);
        errorMessageSpan.innerText = '';
        

    }

    
  })

});