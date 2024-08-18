import AbstractView from "./AbstractView.js";
import { getServerUrl } from "../helpers/functions.js";
const serverUrl = getServerUrl();

export default class extends AbstractView {
    constructor() {

      super();
      this.setWindowDetails('Zobbies - Account verified', 'verify-account');

    }


    async verifyAccount(){

      const verifyData = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      };
    
      const token = location.hash.replace('#', '');
    
      try {
    
        await fetch(`${serverUrl}/auth/verify-account/${token}`, verifyData);
        
    
      } catch(err){
    
        return err;
    
      }

    }




    async getHtml() {
      this.verifyAccount();
        return `
            
          <div class="verify-account wrapper">
        
            <h1 class="verify-account__title">Hooray!</h1>
            <h1 class="verify-account__description">Your <strong><em>Zobbies</em></strong> account has been verified!</h1>
            <a class="verify-account__cta primary-cta" href="channels">Browse channels</a>

          </div>

        
        `;
    }
}