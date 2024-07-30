import { goTo, updateNav } from "../helpers/managmentFunctions.js";

export default class {
  constructor(){
  }

  setWindowDetails(title, bodyViewAttribute){
    document.title = title;
    window.document.body.setAttribute('view', bodyViewAttribute);
  }

  
  async getHtml(){
   return ""; 
  }

}