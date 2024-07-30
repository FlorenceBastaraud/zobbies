import Router from "../router/router.js";
import Nav from "../components/nav.js";

import LandingPageView from '../views/LandingPageView.js';
import EnterSpaceView from '../views/EnterSpaceView.js';
import ChannelsView from '../views/ChannelsView.js';
import ForgotPasswordView from '../views/ForgotPasswordView.js';
import ResetPasswordView from '../views/ResetPasswordView.js';
import ProfileView from '../views/ProfileView.js';

import { checkUserConnexionStatus } from "./apiCallsFunctions.js";



export async function callRouter(){

  await checkUserConnexionStatus().then((checkStatus) => {

    let routes = [];

    if(checkStatus){

      routes = [
        {path: '/', view: LandingPageView},
        {path: '/channels', view: ChannelsView},
        {path: '/forgot-password', view: ForgotPasswordView},
        {path: '/reset-password', view: ResetPasswordView},
        {path: '/profile', view: ProfileView}
      ];

      if(location.pathname == '/' || location.pathname == '/enter-space' || location.pathname == '/forgot-password' || location.pathname == '/reset=password'){
        history.pushState(null, null, '/channels');
        updateNav();
      }
    
    } else {
  
      routes = [
        {path: '/', view: LandingPageView},
        {path: '/enter-space', view: EnterSpaceView},
        {path: '/forgot-password', view: ForgotPasswordView},
        {path: '/reset-password', view: ResetPasswordView},
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