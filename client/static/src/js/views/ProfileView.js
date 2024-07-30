import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
      super();
      this.setWindowDetails('Zobbies - profile', 'profile');
    }


    async getHtml() {
        return `
            <div class="profile wrapper">

              <div class="profile__content">

                <h1 class="profile__content--title">Profile page</h1>

                <a class="profile__content--cta primary-cta">
                  <i class="fa-solid fa-right-from-bracket"></i>
                </a>
                
              </div>

            </div>
        `;
    }
}