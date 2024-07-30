export default class Router  {

  constructor(routes){
    this.routes = routes;

    this.routesMatches = this?.routes.map(route => {

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
