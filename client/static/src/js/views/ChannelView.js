import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {

      super();
      this.setWindowDetails('Zobbies - channel', 'channel');

    }

    async getHtml() {
        return `
            
          <div class="channel wrapper" data-channel="">

            <div class="channel__top-ctas display-none">
              <a href="/channels" data-link class="channel__top-ctas--back">
              <i class="fa-solid fa-arrow-left-long"></i> <span>Channels</span>
              </a>
              <button class="channel__top-ctas--leave" id="leave-channel">Leave the channel</button>
            </div>

            <div class="channel__join">
              <h2 class="channel__join--title"></h2>
              <h4 class="channel__join--description">Hey, you're new here! Do you want to join the channel?</h4>
              <div class="channel__join--buttons">
              <button class="join channel-join primary-cta">Join</button>
              <a href="/channels" data-link class="cancel cancel-join">Not yet</a>
              </div>
            </div>

            <div class="channel__infos display-none">
              <h1 class="channel__infos--title"></h1>
              <h4 class="channel__infos--description"></h4>
              <div class="channel__infos--members">
                <i class="fa-regular fa-user"></i>
                <span class="amount"></span>
              </div>
            </div>

            <div class="channel__chat display-none">
            </div>

            <div class="channel__input display-none">
              <form class="channel__input--form">
                <label for="text-message"></label>
                <textarea id="text-message" name="text-message"></textarea>
                <input type="submit" value="↑"></input
              </form>
            </div>

          </div>

        `;
    }
}