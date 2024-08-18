import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
      super();
      this.setWindowDetails('Zobbies - settings', 'settings');
      this.getCountryList();
    }


    async getHtml() {
        return `
            <div class="settings wrapper">

              <h1 class="settings__title">Settings</h1>

              <form class="settings__form" id="settings-form">

                <fieldset>

                  <legend>Identity</legend>

                  <label for="lastname">Name</label>
                  <input id="lastname" type="text" name="lastname" value="" placeholder="lastname">

                  <label for="firstname">Firstname</label>
                  <input id="firstname" type="text" name="firstname" value="" placeholder="Firstname">

                </fieldset>


                <fieldset>

                  <legend>What's your birthday?</legend>

                  <label for="dateofbirth">Date of birth</label>
                  <input id="dateofbirth" type="date" name="dateofbirth" min="1924-01-01" max="2024-07-25" />

                </fieldset>

                
                <fieldset class="gender">

                  <legend>Gender</legend>

                  
                  <label for="man"><input id="man" type="radio" name="gender" value="man">Man</label>
                  
                  <label for="woman"><input id="woman" type="radio" name="gender" value="woman">Woman</label>

                  
                  <label for="nonbinary"><input id="nonbinary" type="radio" name="gender" value="nonbinary">Nonbinary</label>

                </fieldset>

                <fieldset>

                  <legend>Where do you live?</legend>

                  <label for="country">Country</label>
                  <select id="country" name="country">
                  </select>
                  
                </fieldset>

                <fieldset>

                  <legend>Idendification</legend>

                  <label for="email">Email</label>
                  <input id="email" type="text" name="email" value="" placeholder="Email">
        
                  <label for="settings-username">Username</label>
                  <input id="settings-username" type="text" name="settings-username" value="" placeholder="Username">

                  <label for="settings-password" id="settings-password-label"><span id="settings-password-label-value">Password</span> <button id="trigger-update-password-bloc">Update password</button></label>
                  <input id="settings-password" type="password" name="settings-password" value="" placeholder="**********" readonly>
        
                  <label for="settings-new-password" class="password-update">New password</label>
                  <input id="settings-new-password" type="password" name="settings-new-password" value="" placeholder="" autocomplete class="password-update">

                  <label for="settings-new-password-confirmation" class="password-update">New password confirmation</label>
                  <input id="settings-new-password-confirmation" type="password" name="settings-new-password-confirmation" value="" placeholder="" autocomplete class="password-update">

                </fieldset>

                <input type="submit" name="save" value="Save" class="primary-cta submit submit-settings">

                <span class="error-message" id="error-settings"></span>

              </form>
              
            </div>
        `;
    }
}