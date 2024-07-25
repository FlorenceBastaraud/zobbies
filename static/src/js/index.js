import {callRouter, goTo, updateNav} from './helpers/managmentFunctions.js';



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