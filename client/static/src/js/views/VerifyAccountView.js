import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {

      super();
      this.setWindowDetails('Zobbies - Account verified', 'verify-account');
      this.verifyAccount();
      this.userFirstname = '';

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
    
        const response = await fetch(`http://localhost:5000/auth/verify-account/${token}`, verifyData);
        const data = await response.json();
    
        if(!data.status){
    
          this.userFirstname = data.user.userFirstname;

        }
        
    
      } catch(err){
    
        return err;
    
      }

    }




    async getHtml() {
        return `
            
          <div class="verify-account wrapper">
        
            <h1 class="verify-account__title">Hooray</h1>
            <h1 class="verify-account__description">Your <strong><em>Zobbies</em></strong> account has been verified!</h1>
            <a class="verify-account__cta primary-cta" href="channels">Browse channels</a>

          </div>

        
        `;
    }
}