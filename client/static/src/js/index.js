import {callRouter, goTo, updateNav} from './helpers/managmentFunctions.js';
import {handleRegister} from './helpers/apiCallsFunctions.js';


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



window.document.addEventListener('DOMContentLoaded', function(){

  document.getElementById('registerForm').addEventListener('submit', function(e){

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