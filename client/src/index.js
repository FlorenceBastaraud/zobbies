import {callRouter, goTo, updateNav} from './js/helpers/managmentFunctions.js';

// history, router and click events
window.addEventListener('popstate', callRouter);

document.addEventListener('DOMContentLoaded', () => {
  
  document.body.addEventListener('click', (e) => {    

    if(e.target.matches('[data-link]')){

      e.preventDefault();
      
      const userProfileId = e.target.getAttribute('data-user-profile-id');

      if(userProfileId){
        document.body.setAttribute('is-visitor', true);      
        document.body.setAttribute('user-profile-id-visit', userProfileId);      
      } else {
        document.body.removeAttribute('is-visitor');      
        document.body.removeAttribute('user-profile-id-visit');      
      }
      
      goTo(e.target.href);
      updateNav();
     
    }
  });
  
  updateNav();
  callRouter();



})