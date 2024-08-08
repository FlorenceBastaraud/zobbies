import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
      super();
      this.setWindowDetails('Zobbies - Channels', 'channels');
    }


    async getHtml() {
        return `
            <div class="channels wrapper">

              <div class="channels__blobs blobs">

                <div class="channels__blobs--item blob">
                  <a href="/channel" data-link data-blob="gaming">gaming</a>
                </div>

                <div class="channels__blobs--item blob">
                  <a href="/reading" data-link data-blob="gaming">reading</a>
                </div>

                <div class="channels__blobs--item blob">
                  <a href="/clubbing" data-link data-blob="gaming">clubbing</a>
                </div>

                <div class="channels__blobs--item blob">
                  <a href="/channel" data-link data-blob="gaming">gaming</a>
                </div>
                
                <div class="channels__blobs--item blob">
                  <a href="/reading" data-link data-blob="gaming">reading</a>
                </div>

                <div class="channels__blobs--item blob">
                  <a href="/clubbing" data-link data-blob="gaming">clubbing</a>
                </div>

                <div class="channels__blobs--item blob">
                  <a href="/channel" data-link data-blob="gaming">gaming</a>
                </div>
                
                <div class="channels__blobs--item blob">
                  <a href="/reading" data-link data-blob="gaming">reading</a>
                </div>

                <div class="channels__blobs--item blob">
                  <a href="/clubbing" data-link data-blob="gaming">clubbing</a>
                </div>

              </div>

            </div>
        `;
    }
}