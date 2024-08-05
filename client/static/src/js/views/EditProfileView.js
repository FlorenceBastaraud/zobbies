import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
      super();
      this.setWindowDetails('Zobbies - edit profile', 'edit-profile');
    }


    async getHtml() {
        return `
            <div class="edit-profile wrapper">

              <h1 class="edit-profile__title">Edit my profile</h1>

              <form class="edit-profile__form" id="edit-profile-form" method="post" enctype="multipart/form-data">

                <fieldset class="edit-profile__form--field profile-picture">

                  <div class="profile-picture__image">
                    <img src="" alt="Profile picture" id="edit-profile-view-user-picture">
                  </div>
 
                  <label for="profile-picture" class="profile-picture__label">Update profile picture</label>

                  <input id="profile-picture" type="file" accept="image/jpeg image/jpg image/png" name="user_picture" class="profile-picture__input">

                </fieldset>

                <fieldset class="edit-profile__form--field">

                  <label for="profile-display-name">Display name</label>
                  <input id="profile-display-name" type="text" name="profile-display-name" value="" placeholder="Display Name">

                </fieldset>

                <fieldset class="edit-profile__form--field">

                  <label for="profile-bio">Bio</label>
                  <textarea id="profile-bio" name="profile-bio" rows="4" cols"5" placeholder="Bio"></textarea>
                  

                </fieldset>

                <input class="edit-profile__form--save primary-cta save" type="submit" name="save" value="Save">

                <button class="edit-profile__form--cancel">Cancel</button>
                
                <span class="edit-profile__form--error-message error-message" id="error-edit-profile"></span>
              
  
              </form>
              
            </div>
        `;
    }
}