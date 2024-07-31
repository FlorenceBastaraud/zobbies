import Router from "../router/router.js";
import Nav from "../components/nav.js";

import LandingPageView from '../views/LandingPageView.js';
import EnterSpaceView from '../views/EnterSpaceView.js';
import ChannelsView from '../views/ChannelsView.js';
import ForgotPasswordView from '../views/ForgotPasswordView.js';
import ResetPasswordView from '../views/ResetPasswordView.js';
import ProfileView from '../views/ProfileView.js';
import VerifyAccountView from "../views/VerifyAccountView.js";

import {handleRegister, handleLogin, handleForgotPassword, handleResetPassword, checkUserConnexionStatus} from './apiCallsFunctions.js';



export async function callRouter(){

  await checkUserConnexionStatus().then((checkStatus) => {

    let routes = [];

    if(checkStatus){

      routes = [
        {path: '/', view: LandingPageView},
        {path: '/channels', view: ChannelsView},
        {path: '/forgot-password', view: ForgotPasswordView},
        {path: '/reset-password', view: ResetPasswordView},
        {path: '/profile', view: ProfileView},
        {path: '/verify-account', view: VerifyAccountView}
      ];

      if(location.pathname == '/' || location.pathname == '/enter-space' || location.pathname == '/forgot-password' || location.pathname == '/reset-password'){
        history.pushState(null, null, '/channels');
        updateNav();
      }
    
    } else {
  
      routes = [
        {path: '/', view: LandingPageView},
        {path: '/enter-space', view: EnterSpaceView},
        {path: '/forgot-password', view: ForgotPasswordView},
        {path: '/reset-password', view: ResetPasswordView},
        {path: '/verify-account', view: VerifyAccountView}
      ];

      if(location.pathname == '/channels' || location.pathname == '/forgot-password' || location.pathname == '/reset-password' || location.pathname == '/profile'){
        history.pushState(null, null, '/');
        updateNav();
      }
  
    }


    return routes;


  }).then(async (routes) => {


    const router = new Router(routes);
    const view = await new router.match.route.view();
    const zobbies = document.querySelector("#app");
    const viewHtml = await view.getHtml();

    zobbies.innerHTML = viewHtml;


  }).then(() => {


      // handle register form submit event
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

      // handle login form submit event
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

        
      });

      // handle forgot password form submit event
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

      // handle reset password form submit event
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


  
    
  
}


export function goTo(url){
  history.pushState(null, null, url);
  callRouter();
}


export async function updateNav(){
  
  const navLinksList = document.querySelector("#navlinks");
  navLinksList.innerHTML = await new Nav().renderLinks();

}