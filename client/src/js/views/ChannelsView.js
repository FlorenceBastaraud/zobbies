import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
      super();
      this.setWindowDetails('Zobbies - Channels', 'channels');
    }

    async getHtml() {      
        return `
            <div class="channels wrapper">

              <h1 class="channels__title">The Channels</h1>

              <div class="channels__blobs blobs">


              </div>

            </div>
        `;
    }
}