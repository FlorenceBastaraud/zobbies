import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {

      super();
      this.setWindowDetails('Zobbies - Enter the world now', 'enter-space');
      this.countriesListHtml = "";
      this.getCountryList();

    }

    async getCountryList(){

      const response = await fetch('https://restcountries.com/v2/all');
      const data = await response.json();
      const countryList = data.map(country => country.name);
      const countriesInOrder = countryList.sort((a, b) => a.localeCompare(b));
      countriesInOrder.map(country => {
        this.countriesListHtml += `<option value="${country}">${country}</option>`;
      });

      document.getElementById('country').innerHTML = this.countriesListHtml;

    }

    async getHtml() {
        return `
            
          <div class="enter-space wrapper">
        
            <div class="enter-space__login" id="login-bloc">
              <h2 class="enter-space__login--title">Login</h2>
              <p class="enter-space__login--description">Enter your login informations to access the Space.</p>
              
              <form class="enter-space__login--form" id="LoginForm">
                  
                <fieldset>

                  <label for="username">Username</label>
                  <input id="username" type="text" name="username" value="" placeholder="Username">
        
                  <label for="password">Password</label>
                  <input id="password" type="password" name="password" value="" placeholder="Password" autocomplete>

                </fieldset>


                <a href="/forgot-password" id="forgot-password">Forgot password?</a>

                <input type="submit" name="login" value="Login" class="primary-cta submit submit-login">

                <span class="error-message" id="error-login"></span>

              </form>


              <p class="enter-space__login--toggle toggle-form display-none" data-toggle="login">No account yet? <span data-toggle="login">Register now</span></p>


            </div>

            <div class="enter-space__register" id="register-bloc">

              <h2 class="enter-space__register--title">Register</h2>

              <p class="enter-space__register--description">Register to start your <strong><em>Zoobies</em></strong> journey and gain access to our channels.</p>

              <form class="enter-space__register--form" id="registerForm">

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
        
                  <label for="register-username">Username</label>
                  <input id="register-username" type="text" name="register-username" value="" placeholder="Username">

        
                  <label for="register-password">Password</label>
                  <input id="register-password" type="password" name="register-password" value="" placeholder="Password" autocomplete>

                  <label for="register-password-confirmation">Password confirmation</label>
                  <input id="register-password-confirmation" type="password" name="register-password-confirmation" value="" placeholder="Password confirmation" autocomplete>

                </fieldset>


                <p class="legal">By registering, you agree to the <a href="/" target="_blank">terms of use</a>, and <a href="/" target="_blank">the privacy policy</a> as well as the <a href="/" target="_blank">use of cookies</a>.</p>

                <input type="submit" name="register" value="Register" class="primary-cta submit submit-register">

                <span class="error-message" id="error-register"></span>

              </form>

              <p class="enter-space__register--toggle toggle-form display-none" data-toggle="register">Already have an account? <span data-toggle="register">Log in here</span></p>


            </div>

          </div>

        `;
    }
}