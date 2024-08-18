import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {

      super();
      this.setWindowDetails('Zobbies - Reset password', 'reset-password');

    }

    async getHtml() {
        return `
            
          <div class="reset-password wrapper">
        
            <h1 class="reset-password__title">Reset your password</h1>
            <p class="reset-password__description">Please update your password in the form below</p>
            
            <form class="reset-password__form" id="ResetPasswordForm">
                
              <fieldset>

                <label for="new-password">New Password</label>
                <input id="new-password" type="password" name="new-password" value="" placeholder="New password" autocomplete>

                <label for="confirm-new-password">Confirm new password</label>
                <input id="confirm-new-password" type="password" name="confirm-new-password" value="" placeholder="Confirm new password" autocomplete>

              </fieldset>


              <input type="submit" name="reset-password" value="Reset my password" class="primary-cta submit submit-reset-password">

              <span class="error-message" id="error-reset-password"></span>

            </form>



            </div>

        
        `;
    }
}