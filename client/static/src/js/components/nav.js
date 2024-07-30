export default class Nav {

  constructor(){

    this.linksItems = []; 
    this.detailsLinks = [];
    this.generatedetailsLinks();

  }

  generatedetailsLinks(){
    switch(location.pathname){
      case '/':
      case '/enter-space':
      case '/forgot-password':
      case '/reset-password':
        this.detailsLinks = [
          {path: 'the-concept', title: 'The Concept', name: 'The Concept'},
          {path: 'top-channels', title: 'Top Channels', name: 'Top Channels'},
          {path: 'genesis', title: 'Genesis', name: 'Genesis'}
        ]; 
        break;
      case '/channels':
        this.detailsLinks = [
          {path: 'my-currents', title: 'My Currents', name: 'My Currents'},
          {path: 'stats', title: 'Stats', name: 'Stats'},
          {path: 'requests', title: 'Request', name: 'Requests'},
          {path: 'genesis', title: 'Genesis', name: 'Genesis'}
        ]; 
        break;
      default:
        this.detailsLinks = []; 
        break;

    }
  }


  generateLinkElements(){
    this.detailsLinks.map(detailsLink => {
      this.linksItems +=  `<a 
                href="/${detailsLink.path}"
                title="${detailsLink.title}"
                data-link
                class="nav-link">
                  ${detailsLink.name}
              </a>`;
    });
  }


  renderLinks(){
    this.generateLinkElements();
    return this.linksItems;
  }

}