import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
      super();
      this.setVisitProfileDetails();
    }

    async setVisitProfileDetails(){

      const title = document.body.getAttribute('is-visitor') ? `Zobbies - this user profile` : 'Zobbies - profile';
      this.setWindowDetails(title, 'profile');

    }

    getUserIdProfileVisit(){
      return document.body.getAttribute('user-profile-id-visit');
    }


    async getHtml() {
        return `
            <div class="profile wrapper">


              <div class="profile__main">

                <div class="profile__main--sidebar">

                  <div class="profile-picture">
                    <img src="" alt="Profile picture" id="profile-view-user-picture">
                  </div>

                  <div class="user-infos">
                    <h4 class="user-infos__username"></h4>
                    <h4 class="user-infos__display-name"></h4>
                    <h4 class="user-infos__bio"></h4>
                    <h4 class="user-infos__gender"></h4>
                  </div>

                  <div class="platform">
                    <a href="/edit-profile" title="Edit profile" data-link class="platform__edit-profile">Edit profile</a>
                    <a href="/settings" title="Settings" data-link class="platform__settings">Settings</a>
                    <a href="/" class="platform__logout" data-link id="logout">
                      <i class="fa-solid fa-right-from-bracket"></i>
                    </a>
                  </div>
                
                </div>
                <div class="profile__main--flux">


                  <div class="flux-item">

                  </div>

                </div>
            
              </div>
              
            </div>
        `;
    }
}