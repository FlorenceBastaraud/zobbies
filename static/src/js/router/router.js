import LandingPageView from '../views/LandingPageView.js';

export default class Router {

  constructor(path){
    this.routes = [{
      path: '/', view: new LandingPageView(),
    }];
    this.currentPath = path;
    this.viewSet = ``;
    this.getView();
  }

  getView(){
     this.routes.find(route => {
      if(route.path == this.currentPath){
        this.viewSet = route.view.getHtml();
      }
    })
  }


}