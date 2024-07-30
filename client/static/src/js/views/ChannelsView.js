import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
      super();
      this.setWindowDetails('Zobbies - Channels', 'channels');
    }


    async getHtml() {
        return `
            <div class="channels wrapper">

              <div class="channels__content">

                <h1 class="channels__content--title">All Channels</h1>
                <h2 class="channels__content--subtitle">here</h2>
                <h3 class="channels__content--label">Now</h3>
                <p class="channels__content--description">Browse through all the channels</p>
                <a class="channels__content--cta primary-cta">Browse</a>
        

              </div>

              <div class="channels__blobs blobs">
                <div class="channels__blobs--item blob background-1 ptl">
                  <span data-blob="gaming">gaming</span>
                </div>
                <div class="channels__blobs--item blob background-2 pt">
                  <span data-blob="traveling">traveling</span>
                </div>
                <div class="channels__blobs--item blob background-3 ptr">
                  <span data-blob="dancing">dancing</span>
                </div>
                <div class="channels__blobs--item blob background-1 pr">
                  <span data-blob="hiking">hiking</span>
                </div>
                <div class="channels__blobs--item blob background-2 pbr">
                  <span data-blob="clubbing">clubbing</span>
                </div>
                <div class="channels__blobs--item blob background-3 pbl">
                  <span data-blob="reading">reading</span>
                </div>
              </div>

            </div>
        `;
    }
}