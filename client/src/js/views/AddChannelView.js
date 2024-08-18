import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {

      super();
      this.setWindowDetails('Zobbies - add channel', 'add-channel');

    }

    async getHtml() {
        return `
            
          <div class="add-channel wrapper">
        
            <h2 class="add-channel__title">Add channel</h2>
            
            <form class="add-channel__form" id="addChannelForm">
                
              <fieldset>

                <label for="channel-name">Channel name</label>
                <input id="channel-name" type="text" name="channel-name" value="" placeholder="Channel name">
      
                <label for="display-channel-name">Display channel name</label>
                <input id="display-channel-name" type="text" name="display-channel-name" value="" placeholder="Display Channel name">

                <label for="channel-description">Channel Description</label>
                <input id="channel-description" type="text" name="channel-description" value="" placeholder="Channel Description">

              </fieldset>

              <input type="submit" name="add-channel" value="Add channel" class="primary-cta submit submit-add-channel">

              <span class="error-message" id="error-add-channel"></span>

            </form>



          </div>

        `;
    }
}