import Router from './router/router.js';
import Nav from './components/nav.js';




window.addEventListener('DOMContentLoaded', () => {


  const goTo = url => {
    history.pushState(null, null, url);
  };


  document.addEventListener('click', (e) => {
    if(e.target.matches('[data-link]')){
      e.preventDefault();
      goTo(e.target.href);
    }
  });
  
  
});




const navLinksList = document.querySelector("#navlinks");
navLinksList.innerHTML = new Nav().renderLinks();


const zobbies = document.querySelector("#app");
const theView = new Router(location.pathname);
zobbies.innerHTML = theView.viewSet;
