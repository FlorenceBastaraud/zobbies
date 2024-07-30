import Router from "../router/router.js";
import Nav from "../components/nav.js";

export async function callRouter(){

  const router = new Router();
  const view = await new router.match.route.view();
  const zobbies = document.querySelector("#app");
  const viewHtml = await view.getHtml();
    
  zobbies.innerHTML = viewHtml;
  
}


export function goTo(url){
  history.pushState(null, null, url);
  callRouter();
}


export function updateNav(){
  
  const navLinksList = document.querySelector("#navlinks");
  navLinksList.innerHTML = new Nav().renderLinks();

}