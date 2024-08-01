import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
      super();
      this.setWindowDetails('Zobbies - profile', 'profile');
    }


    async getHtml() {
        return `
            <div class="profile wrapper">


              <div class="profile__main">

                <div class="profile__main--sidebar">

                  <div class="profile-picture">
                    <img src="./src/images/default/profile-picture-default.jpg" alt="Profile picture">
                  </div>

                  <div class="user-infos">
                    <h4 class="user-infos__username">Username</h4>
                    <h4 class="user-infos__lastname">Lastname</h4>
                    <h4 class="user-infos__firstname">Firstname</h4>
                    <h4 class="user-infos__gender">woman</h4>
                  </div>

                  <div class="platform">
                    <a href="/" title="Edit profile" data-link class="platform__edit-profile">Edit profile</a>
                    <a href="/" title="Settings" class="platform__settings">Settings</a>
                    <a href="/" class="platform__logout" id="logout">
                      <i class="fa-solid fa-right-from-bracket"></i>
                    </a>
                  </div>
                
                </div>
                <div class="profile__main--flux">


                  <div class="flux-item">

                    <div class="flux-item__box">
                      <a class="flux-item__box--link" href="/" title="Hiking" data-link>
                        <span class="label">Hiking</span>
                        <p class="message">On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire...</p>
                      </a>
                    </div>

                    <div class="flux-item__box">
                      <a class="flux-item__box--link" href="/" title="Reading" data-link>
                        <span class="label">Reading</span>
                        <p class="message">On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire...</p>
                      </a>
                    </div>

                    <div class="flux-item__box">
                      <a class="flux-item__box--link" href="/" title="Surfing" data-link>
                        <span class="label">Surfing</span>
                        <p class="message">On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire...</p>
                      </a>
                    </div>

                    <div class="flux-item__box">
                      <a class="flux-item__box--link" href="/" title="Clubbing" data-link>
                        <span class="label">Clubbing</span>
                        <p class="message">On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire...</p>
                      </a>
                    </div>

                    <div class="flux-item__box">
                      <a class="flux-item__box--link" href="/" title="Hiking" data-link>
                        <span class="label">Hiking</span>
                        <p class="message">On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire...</p>
                      </a>
                    </div>
                    

                  </div>

                </div>
            
              </div>
              
            </div>
        `;
    }
}