import {callRouter, goTo, updateNav} from './js/helpers/managmentFunctions.js';

// history, router and click events
window.addEventListener('popstate', callRouter);

document.addEventListener('DOMContentLoaded', () => {
  
  document.body.addEventListener('click', (e) => {    

    if(e.target.matches('[data-link]')){

      e.preventDefault();
      
      document.body.removeAttribute('is-visitor');      
      document.body.removeAttribute('user-profile-id-visit');      
  
      goTo(e.target.href);
      updateNav();
     
    } else if(e.target.matches('[data-in-channel-link')){

      return;

    }

  });
  
  updateNav();
  callRouter();



})