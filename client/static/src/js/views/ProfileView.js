import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
      super();
      this.setWindowDetails('Zobbies - profile', 'profile');
    }


    async getHtml() {
        return `
            <div class="profile wrapper">


              <h1 class="profile__title">Profile page</h1>

              <a class="profile__cta primary-cta" id="logout">
                <i class="fa-solid fa-right-from-bracket"></i>
              </a>
              

            </div>
        `;
    }
}