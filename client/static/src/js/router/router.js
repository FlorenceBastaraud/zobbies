import LandingPageView from '../views/LandingPageView.js';
import EnterSpaceView from '../views/EnterSpaceView.js';
import ChannelsView from '../views/ChannelsView.js';
import ForgotPasswordView from '../views/ForgotPasswordView.js';
import ResetPasswordView from '../views/ResetPasswordView.js';

export default class Router  {

  constructor(){
    this.routes = [
      {path: '/', view: LandingPageView},
      {path: '/enter-space', view: EnterSpaceView},
      {path: '/channels', view: ChannelsView},
      {path: '/forgot-password', view: ForgotPasswordView},
      {path: '/reset-password', view: ResetPasswordView}
    ];

    this.routesMatches = this.routes.map(route => {

      return {
        route: route,
        isCurrent: location.pathname === route.path
      }
    })

    
    this.match = this.routesMatches.find(routesMatch => routesMatch.isCurrent) || {
      route: this.routes[0],
      isCurrent: true
    }
    
  }

}
