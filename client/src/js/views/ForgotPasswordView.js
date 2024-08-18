import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {

      super();
      this.setWindowDetails('Zobbies - Forgot password', 'forgot-password');

    }

    async getHtml() {
        return `
            
          <div class="forgot-password wrapper">
        
            <h1 class="forgot-password__title">Forgot password</h1>
            <p class="forgot-password__description">Enter the email address associated with your <strong><em>Zobbies</em></strong> account.</p>
            
            <form class="forgot-password__form" id="ForgotPasswordForm">
                
              <fieldset>

                <label for="forgot-password-email">Email</label>
                <input id="forgot-password-email" type="text" name="email" value="" placeholder="Email">

              </fieldset>


              <input type="submit" name="Submit" value="Submit" class="primary-cta submit submit-forgot-password">

              <span class="error-message" id="error-forgot-password"></span>

            </form>



            </div>

        
        `;
    }
}