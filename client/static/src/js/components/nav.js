export default class Nav {

  constructor(){

    this.linksItems = []; 
    this.detailsLinks = [];
    this.generatedetailsLinks();
    this.checkUserLoggedIn();

  }


  async checkUserLoggedIn(){

    const connectData = {
      method: 'GET',
      'credentials': 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    };

    
    const response = await fetch('http://localhost:5000/auth/connected', connectData);
    const data = await response.json();

    return data.status;

  }
  

  generatedetailsLinks(){
    switch(location.pathname){
      case '/':
      case '/enter-space':
      case '/forgot-password':
      case '/reset-password':
      case '/verify-account':
        this.detailsLinks = [
          {path: 'the-concept', title: 'The Concept', name: 'The Concept'},
          {path: 'top-channels', title: 'Top Channels', name: 'Top Channels'},
          {path: 'genesis', title: 'Genesis', name: 'Genesis'}
        ]; 
        break;
      case '/channels':
      case '/profile':
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


  generateConnectedElements(){
    this.linksItems +=  `

      <a class="profile" href="/profile">
        <i class="fa-solid fa-user"></i>
      </a>
      <a class="profile" href="/logout">
        <i class="fa-solid fa-right-from-bracket"></i>
      </a>

    `;
  }


  async renderLinks(){

    this.generateLinkElements();

    const loggedin = await this.checkUserLoggedIn();

    if(loggedin){
      this.generateConnectedElements();
    }

    return this.linksItems;

  }


  
}