import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
      super();
      this.setWindowDetails('Zobbies - Welcome', '');
    }


    async getHtml() {
        return `
            <div class="landing-page wrapper">

              <div class="landing-page__content">

                <h1 class="landing-page__content--title">Meet like minded people</h1>
                <h2 class="landing-page__content--subtitle">and make genuine connections</h2>
                <h3 class="landing-page__content--label">Freely</h3>
                <p class="landing-page__content--description">A place to escape et rejoice. Somewhere to discuss about all the things you're passionate about with people who feel and like the same things you do. A dream, right?</p>
                <a class="landing-page__content--cta primary-cta" href="enter-space" data-link=>Enter now</a>
        

              </div>

              <div class="landing-page__blobs blobs">
                <div class="landing-page__blobs--item blob background-1 ptl">
                  <span data-blob="gaming">gaming</span>
                </div>
                <div class="landing-page__blobs--item blob background-2 pt">
                  <span data-blob="traveling">traveling</span>
                </div>
                <div class="landing-page__blobs--item blob background-3 ptr">
                  <span data-blob="dancing">dancing</span>
                </div>
                <div class="landing-page__blobs--item blob background-1 pr">
                  <span data-blob="hiking">hiking</span>
                </div>
                <div class="landing-page__blobs--item blob background-2 pbr">
                  <span data-blob="clubbing">clubbing</span>
                </div>
                <div class="landing-page__blobs--item blob background-3 pbl">
                  <span data-blob="reading">reading</span>
                </div>
              </div>

            </div>
        `;
    }
}