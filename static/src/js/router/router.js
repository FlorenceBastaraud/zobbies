import LandingPageView from '../views/LandingPageView.js';
import EnterSpaceView from '../views/EnterSpaceView.js';


export default class Router  {

  constructor(){
    this.routes = [
      {path: '/', view: LandingPageView},
      {path: '/enter-space', view: EnterSpaceView}
    ];

    this.potentialMatches = this.routes.map(route => {
      return {
        route: route,
        isCurrent: location.pathname === route.path
      }
    })

    this.match = this.potentialMatches.find(potentialMatch => potentialMatch.isCurrent) || {
      route: routes[0],
      isCurrent: true
    }
    
  }

}
