/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   callRouter: () => (/* binding */ callRouter),
/* harmony export */   goTo: () => (/* binding */ goTo),
/* harmony export */   updateNav: () => (/* binding */ updateNav)
/* harmony export */ });
/* harmony import */ var _router_router_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _components_nav_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _views_LandingPageView_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _views_EnterSpaceView_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _views_ChannelsView_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _views_ForgotPasswordView_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);
/* harmony import */ var _views_ResetPasswordView_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11);
/* harmony import */ var _views_VerifyAccountView_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(12);
/* harmony import */ var _views_ProfileView_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(13);
/* harmony import */ var _views_EditProfileView_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(14);
/* harmony import */ var _views_SettingsView_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(15);
/* harmony import */ var _views_AddChannelView_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(16);
/* harmony import */ var _views_ChannelView_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(17);
/* harmony import */ var _apiCallsFunctions_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(4);
/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(5);


















const serverUrl = (0,_functions_js__WEBPACK_IMPORTED_MODULE_14__.getServerUrl)();

const socket = io(serverUrl);

async function callRouter(){

  const isAdmin = await (0,_apiCallsFunctions_js__WEBPACK_IMPORTED_MODULE_13__.getAdminAccess)();

  await (0,_apiCallsFunctions_js__WEBPACK_IMPORTED_MODULE_13__.checkUserConnexionStatus)().then((checkStatus) => {

    let routes = [];

    if(checkStatus){

      routes = [
        {path: '/', view: _views_LandingPageView_js__WEBPACK_IMPORTED_MODULE_2__["default"]},
        {path: '/channels', view: _views_ChannelsView_js__WEBPACK_IMPORTED_MODULE_4__["default"]},
        {path: '/verify-account', view: _views_VerifyAccountView_js__WEBPACK_IMPORTED_MODULE_7__["default"]},
        {path: '/profile', view: _views_ProfileView_js__WEBPACK_IMPORTED_MODULE_8__["default"]},
        {path: '/edit-profile', view: _views_EditProfileView_js__WEBPACK_IMPORTED_MODULE_9__["default"]},
        {path: '/settings', view: _views_SettingsView_js__WEBPACK_IMPORTED_MODULE_10__["default"]},
        {path: '/add-channel', view: _views_AddChannelView_js__WEBPACK_IMPORTED_MODULE_11__["default"]},
        {path: '/channel', view: _views_ChannelView_js__WEBPACK_IMPORTED_MODULE_12__["default"]}
      ];

      const routesPaths = routes.map(route => route.path);
      
      if(!isAdmin && location.pathname == "/add-channel"){
        routes = routes.filter(route => route.path !== location.pathname);
        history.pushState(null, null, '/channels');
        updateNav(); 
      }      

      if(!routesPaths.includes(location.pathname)){
        history.pushState(null, null, '/channels');
        updateNav();
      }
    
    } else {
  
      routes = [
        {path: '/', view: _views_LandingPageView_js__WEBPACK_IMPORTED_MODULE_2__["default"]},
        {path: '/enter-space', view: _views_EnterSpaceView_js__WEBPACK_IMPORTED_MODULE_3__["default"]},
        {path: '/forgot-password', view: _views_ForgotPasswordView_js__WEBPACK_IMPORTED_MODULE_5__["default"]},
        {path: '/reset-password', view: _views_ResetPasswordView_js__WEBPACK_IMPORTED_MODULE_6__["default"]},
        {path: '/verify-account', view: _views_VerifyAccountView_js__WEBPACK_IMPORTED_MODULE_7__["default"]}
      ];

      const routesPaths = routes.map(route => route.path);

      if(!routesPaths.includes(location.pathname)){
        history.pushState(null, null, '/');
        updateNav();
      }
  
    }


    return routes;


  }).then(async (routes) => {


    const router = new _router_router_js__WEBPACK_IMPORTED_MODULE_0__["default"](routes);
    const view = await new router.match.route.view();
    const zobbies = document.querySelector("#app");
    const viewHtml = await view.getHtml();

    zobbies.innerHTML = viewHtml;


  }).then(() => {

      // enter space view specificities
      if(location.pathname == '/enter-space'){
        const registerBloc = document.getElementById('register-bloc');
        const loginBloc = document.getElementById('login-bloc');
        const toggleFormBtns = document.querySelectorAll('.toggle-form');

        toggleFormBtns.forEach(toggleFormBtn => {
          toggleFormBtn.addEventListener('click', function(e){

            let currentForm = e.target.getAttribute('data-toggle');

            if(currentForm == 'register'){
              registerBloc?.classList.add('display-none');
              loginBloc?.classList.remove('display-none');
            } else {
              registerBloc?.classList.remove('display-none');
              loginBloc?.classList.add('display-none');
            }
        
          }, true)
        });


        function responsiveView(){
          const windowWidth = window.innerWidth;
          const widthBreakpoint = 1350;

          if(windowWidth < widthBreakpoint){
            registerBloc?.classList.add('display-none');
            toggleFormBtns?.forEach(toggleFormBtn => toggleFormBtn.classList.remove('display-none'));
          } else {
            registerBloc?.classList.remove('display-none');
            toggleFormBtns?.forEach(toggleFormBtn => toggleFormBtn.classList.add('display-none'));
          }

        }

        responsiveView();

        if(document.body.getAttribute('view') === "enter-space"){
          window.addEventListener('resize', responsiveView);
        }
      }

      // handle register form submit event
      document.getElementById('registerForm')?.addEventListener('submit', function(e){

        e.preventDefault();

        const lastname = document.getElementById("lastname").value;
        const firstname = document.getElementById("firstname").value;
        const dateOfBirth = document.getElementById("dateofbirth").value;
        const gender = document.querySelector('input[name="gender"]:checked')?.value;
        const country = document.getElementById('country').value;
        const email = document.getElementById('email').value;
        const registerUsername = document.getElementById('register-username').value;
        const registerPassword = document.getElementById('register-password').value;
        const registerPasswordConfirmation = document.getElementById('register-password-confirmation').value;
        

        const errorMessageSpan = document.getElementById('error-register');
        let errorMessage = '';


        if(
            lastname == "" ||
            firstname == "" ||
            dateOfBirth == "" ||
            gender == "" ||
            country == "" ||
            email == "" ||
            registerUsername == "" ||
            registerPassword == "" ||
            registerPasswordConfirmation == ""
          ) {

            errorMessage = "Please make sure no field is empty";
            errorMessageSpan.innerText = errorMessage;

          } else if(registerPassword !== registerPasswordConfirmation){

            errorMessage = "Your confirmation password must be the same as your password.";
            errorMessageSpan.innerText = errorMessage;

          } else {

            const registerValues = {
              lastname,
              firstname,
              dateOfBirth,
              gender,
              country,
              email,
              username: registerUsername,
              password: registerPassword,
            }

            ;(0,_apiCallsFunctions_js__WEBPACK_IMPORTED_MODULE_13__.handleRegister)(registerValues, e);
            errorMessageSpan.innerText = '';
            

        }

        
      })

      // handle login form submit event
      document.getElementById('LoginForm')?.addEventListener('submit', function(e){

        e.preventDefault();

        const loginUsername = document.getElementById('username').value;
        const loginPassword = document.getElementById('password').value;
        
        const errorMessageSpan = document.getElementById('error-login');
        let errorMessage = '';


        if(loginUsername == "" || loginPassword == "") {

            errorMessage = "Please make sure no field is empty";
            errorMessageSpan.innerText = errorMessage;

          } else {

            const loginValues = {
              username: loginUsername,
              password: loginPassword
            }

            ;(0,_apiCallsFunctions_js__WEBPACK_IMPORTED_MODULE_13__.handleLogin)(loginValues, e);

            errorMessageSpan.innerText = '';

        }

        
      });

      // handle forgot password form submit event
      document.getElementById('ForgotPasswordForm')?.addEventListener('submit', function(e){

        e.preventDefault();

        const userEmail = document.getElementById('forgot-password-email').value;
        
        const errorMessageSpan = document.getElementById('error-forgot-password');
        let errorMessage = '';


        if(userEmail == "") {

            errorMessage = "Please enter your email address.";
            errorMessageSpan.innerText = errorMessage;

          } else {

      
            (0,_apiCallsFunctions_js__WEBPACK_IMPORTED_MODULE_13__.handleForgotPassword)({ email: userEmail}, e);
            errorMessageSpan.innerText = '';
            

        }

        
      })

      // handle reset password form submit event
      document.getElementById('ResetPasswordForm')?.addEventListener('submit', function(e){

        e.preventDefault();

        const userNewPassword = document.getElementById('new-password').value;
        const userNewPasswordConfirm = document.getElementById('confirm-new-password').value;

        const errorMessageSpan = document.getElementById('error-reset-password');
        let errorMessage = '';


        if(userNewPassword == "" || userNewPasswordConfirm == "") {

            errorMessage = "Please make sure no field is empty.";
            errorMessageSpan.innerText = errorMessage;

          } else if(userNewPassword !== userNewPasswordConfirm) {

            errorMessage = "Your confirm password should be identical to your new password";
            errorMessageSpan.innerText = errorMessage;

          } else {

      
            (0,_apiCallsFunctions_js__WEBPACK_IMPORTED_MODULE_13__.handleResetPassword)({ password: userNewPassword}, e);
            errorMessageSpan.innerText = '';
            

        }

        
      })

      // handle logout
      document.getElementById('logout')?.addEventListener('click', async function(e){
        e.preventDefault();
            
        try {

          const logoutData = {
            method: 'GET',
            'credentials': 'include',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }
          };
        
      
          const response = await fetch(`${serverUrl}/auth/logout/`, logoutData);
          const data = await response.json();

          if(data.status){
            goTo('enter-space');
            updateNav();
          }
          
      
        } catch(err){
      
          return err;
      
        }

      })

      // handle profile view
      if(location.pathname == '/profile'){

        
        const userInfos = async () => {
          const userDetails = await (0,_apiCallsFunctions_js__WEBPACK_IMPORTED_MODULE_13__.getUserInfos)();

          const userPictureName = userDetails.userPicture.length > 0 ? JSON.parse(userDetails.userPicture).filename : '';
          const profilePicture = userPictureName !== '' ? (0,_functions_js__WEBPACK_IMPORTED_MODULE_14__.getUploadImgFolder)() + userPictureName : (0,_functions_js__WEBPACK_IMPORTED_MODULE_14__.getStaticImgFolder)() + 'profile-picture-default.jpg';
          const username = '@' + userDetails.username || 0;
          const displayName = userDetails.displayName || userDetails.lastname + ' ' + userDetails.firstname;
          const bio = userDetails.bio || '';
          const gender = userDetails.gender ? (userDetails.gender == 'man') ? '♂' : (userDetails.gender == 'woman') ? '♀️' : '⚧' : 'Gender undefined';
          
          document.querySelector('#profile-view-user-picture').setAttribute('src', profilePicture);
          document.querySelector('.user-infos__username').innerText = username;
          document.querySelector('.user-infos__display-name').innerText = displayName;
          document.querySelector('.user-infos__bio').innerText = bio;
          document.querySelector('.user-infos__gender').innerText = gender;
          
          const profileChannelsFlux = document.querySelector('.profile__main--flux .flux-item');
          let channelsItems = ``;

          const userChannels = userDetails.channels;

          userChannels.map(userChannel => {

            const {name, displayName, description} = userChannel;
            const displayDescription = description.length > 170 ? description.slice(0, 170) + '...' : description.length < 2 ? "It's helpful to realize that this very body that we have, right here, with its aches and it pleasures, is exactly what we need to be fully human, fully awake, fully alive..." : description;       

          
            

            channelsItems += `
            
                    <div class="flux-item__box">
                      <a class="flux-item__box--link" href="/channel#${name}" title="${displayName}" data-link>
                        <span class="label">${displayName}</span>
                        <p class="message description">${displayDescription}</p>
                      </a>
                    </div>

            `;

          });

          profileChannelsFlux.innerHTML = channelsItems;


        }  

        userInfos();

      }

      // handle edit profile view
      if(location.pathname == '/edit-profile'){

        let newUserProfileFile;
        
        const userInfos = async () => {
          const user = await (0,_apiCallsFunctions_js__WEBPACK_IMPORTED_MODULE_13__.getUserInfos)();

          const userPictureName = user.userPicture.length > 0 ? JSON.parse(user.userPicture).filename : '';
          const profilePicture = userPictureName !== '' ? (0,_functions_js__WEBPACK_IMPORTED_MODULE_14__.getUploadImgFolder)() + userPictureName : (0,_functions_js__WEBPACK_IMPORTED_MODULE_14__.getStaticImgFolder)() + 'profile-picture-default.jpg';
          const displayName = user.displayName || user.lastname + ' ' + user.firstname;
          const bio = user.bio || `No bio yet`;
          
          document.querySelector('#edit-profile-view-user-picture').setAttribute('src', profilePicture);
          document.querySelector('#profile-display-name').setAttribute('value', displayName);
          document.querySelector('#profile-display-name').setAttribute('placeholder', displayName);
          document.querySelector('#profile-bio').setAttribute('value', bio);
          document.querySelector('#profile-bio').innerText = bio;

        }  

        userInfos();


        document.querySelector('.edit-profile__form--cancel').addEventListener('click', (e) => {
          
          e.preventDefault();
          document.getElementById('edit-profile-form').reset();
          goTo('/profile');


        });


        document.querySelector('#profile-picture').addEventListener('change', (e) => {

          newUserProfileFile = e.target.files[0];
          const imgUrl = e.target.files[0];
          const reader = new FileReader();
          reader.addEventListener('load', (e) => {
            document.querySelector('#edit-profile-view-user-picture').setAttribute('src', e.target.result);
            document.querySelector('#edit-profile-view-user-picture').setAttribute('data-img', imgUrl.name);
          });
          reader.readAsDataURL(imgUrl);

        });



        document.getElementById('edit-profile-form').addEventListener('submit', (e) => {

          e.preventDefault();

          const profilePicture = document.getElementById("edit-profile-view-user-picture").getAttribute('src') == "profile-picture-default.jpg" ? '' : document.getElementById("edit-profile-view-user-picture").getAttribute('data-img');
          const displayName = document.getElementById("profile-display-name").value;
          const bio = document.getElementById("profile-bio").value;
          

          const errorMessageSpan = document.getElementById('error-edit-profile');
          let errorMessage = '';


          if(profilePicture == "" || displayName == "" || bio == "") {

              errorMessage = "Please make sure no field is empty";
              errorMessageSpan.innerText = errorMessage;

            } else {


              const bodyFormData = new FormData();
              bodyFormData.append('user_picture', newUserProfileFile);
              bodyFormData.append('displayName', displayName);
              bodyFormData.append('bio', bio);

              (0,_apiCallsFunctions_js__WEBPACK_IMPORTED_MODULE_13__.handleUpdateUserInfos)(bodyFormData, e);
              errorMessageSpan.innerText = '';
              

          }

          
        });




      }

      // handle settings view
      if(location.pathname == '/settings'){


        const userInfos = async () => {

          const {lastname, firstname, dateOfBirth, gender, country, email, username, pl} = await (0,_apiCallsFunctions_js__WEBPACK_IMPORTED_MODULE_13__.getUserInfos)();
  
          document.querySelector('#lastname').setAttribute('value', lastname);
          document.querySelector('#firstname').setAttribute('value', firstname);          
          document.querySelector('#dateofbirth').setAttribute('value', dateOfBirth.split('T')[0]);
          document.querySelector(`#${gender}`).setAttribute('checked', true);

          setTimeout(() => {
            const countryOptions = document.getElementsByClassName('countryOptions');
                  
            for (let i = 0; i < countryOptions.length; i++) {
              if(countryOptions[i].value == country){
                countryOptions[i].setAttribute('selected', true);
              }
            }              
          }, 1000);

          document.querySelector('#email').setAttribute('value', email);
          document.querySelector('#settings-username').setAttribute('value', username);    
          document.querySelector('#settings-password').setAttribute('placeholder', (0,_functions_js__WEBPACK_IMPORTED_MODULE_14__.getStars)(pl));
        

        }  

        userInfos();


        document.getElementById('trigger-update-password-bloc').addEventListener('click', (e) => {
          e.preventDefault();
          e.target.innerText = e.target.innerText == 'Update password' ? 'Cancel' : 'Update password';

          e.target.classList.toggle('clicked');
          
          window.scrollTo({ top: window.scrollY + e.target.offsetHeight, behavior: 'smooth' })

          Array.from(document.getElementsByClassName('password-update')).forEach(el => el.classList.toggle('show'));

          document.getElementById('settings-password').classList.toggle('hide');

          const passwordLabel = document.getElementById('settings-password-label-value');
          passwordLabel.innerHTML = passwordLabel.innerHTML == 'Password' ? '<strong>Update your password</strong>' : 'Password';          

        })


        

        document.getElementById('settings-form')?.addEventListener('submit', function(e){

          e.preventDefault();
  
          const lastname = document.getElementById("lastname").value;
          const firstname = document.getElementById("firstname").value;
          const dateOfBirth = document.getElementById("dateofbirth").value;
          const gender = document.querySelector('input[name="gender"]:checked')?.value;
          const country = document.getElementById('country').value;
          const email = document.getElementById('email').value;
          const username = document.getElementById('settings-username').value;
          const newPassword = document.getElementById('settings-new-password').value;
          const newPasswordConfirmation = document.getElementById('settings-new-password-confirmation').value;

  
          const errorMessageSpan = document.getElementById('error-settings');
          let errorMessage = '';
  
  
          if(
              lastname == "" ||
              firstname == "" ||
              dateOfBirth == "" ||
              gender == "" ||
              country == "" ||
              email == ""
            ) {
  
              errorMessage = "Please make sure no field is empty";
              errorMessageSpan.innerText = errorMessage;
  
            } else if(newPassword !== newPasswordConfirmation){
  
              errorMessage = "Your confirmation password must be the same as your password.";
              errorMessageSpan.innerText = errorMessage;
  
            } else {
  
              const settingsValues = {
                lastname,
                firstname,
                dateOfBirth,
                gender,
                country,
                email,
                username,
                password: newPassword,
              }
  
              ;(0,_apiCallsFunctions_js__WEBPACK_IMPORTED_MODULE_13__.handleSettings)(settingsValues, e);
              errorMessageSpan.innerText = '';
              
  
          }
  
          
        })

      }

      // handle add channel form event
      if(location.pathname == '/add-channel'){

        document.getElementById('addChannelForm').addEventListener('submit', (e) => {
          e.preventDefault();
  
          const channelName = document.getElementById('channel-name').value;
          const displayChannelName = document.getElementById('display-channel-name').value;
          const channelDescription = document.getElementById('channel-description').value;
  
          const errorMessageSpan = document.getElementById('error-add-channel');
          let errorMessage = '';
  
  
          if(channelName == "" || displayChannelName == "" || channelDescription == "") {
  
              errorMessage = "Please make sure no field is empty";
              errorMessageSpan.innerText = errorMessage;
  
            } else {
  
              const addChannelData = {
                name: channelName,
                displayName: displayChannelName,
                description: channelDescription
              }
              
              ;(0,_apiCallsFunctions_js__WEBPACK_IMPORTED_MODULE_13__.handleAddChannel)(addChannelData, e);
      
          }
  
        });

      }
      
      // channels view
      if(location.pathname == '/channels'){

        let channelElements = ``;
        async function channelsItems(){

          const channels = await (0,_apiCallsFunctions_js__WEBPACK_IMPORTED_MODULE_13__.getChannels)();
          channels.map(channel => {
            const {name, displayName, members} = channel;
            
            channelElements += `
                    <div class="channels__blobs--item blob">
                      <a href="/channel#${name}" data-link data-blob="${name}">${displayName}</a>
                      <div class="members">
                        <i class="fa-solid fa-user"></i>
                        <span>${members.length}</span>
                      </div>
                    </div>`;
                    
          });  

          document.querySelector('.channels__blobs').innerHTML = channelElements;

          
        }

        channelsItems();



      }

      // channel view      
      if(location.pathname == '/channel'){

        let currUserSocketId;


        async function currentChannel(options = {}){
          
          let channel = await (0,_apiCallsFunctions_js__WEBPACK_IMPORTED_MODULE_13__.getChannel)();
          
          if(Object.keys(options).length > 0){

            if(options.action == 'firstLoaded'){
              
              const currUser = await (0,_apiCallsFunctions_js__WEBPACK_IMPORTED_MODULE_13__.getUserInfos)();
              
              if(channel?.members.find(member => member == currUser._id)){

                document.querySelector('.channel__join').classList.add('display-none');
                document.querySelector('.channel__top-ctas').classList.remove('display-none');
                document.querySelector('.channel__infos').classList.remove('display-none');
                document.querySelector('.channel__chat').classList.remove('display-none');
                document.querySelector('.channel__input').classList.remove('display-none');
                
              }
              
              

            } else {
              
              (0,_apiCallsFunctions_js__WEBPACK_IMPORTED_MODULE_13__.userChannelInteractions)(channel.name, options.action);
              channel = await (0,_apiCallsFunctions_js__WEBPACK_IMPORTED_MODULE_13__.getChannel)();

              if(options.action == 'redirect'){
                return goTo('/channels');
              }


              if(options.action == 'leave'){
                return await currentChannel({action: 'redirect'});
              }

              return await currentChannel();

            }

          }

          
          const {name, displayName, description, members, chat} = channel;
          
          
          // chat config
          const socket = io(serverUrl);
          socket.on("connect", () => {
            currUserSocketId = socket.id;
            (0,_apiCallsFunctions_js__WEBPACK_IMPORTED_MODULE_13__.userChannelInteractions)('', 'socket', currUserSocketId);
          });

          socket.on('newMessage', async newMessage => {

              const {messageSocketId, incomingMessage} = newMessage;
                            
              const isMyMessage = currUserSocketId == messageSocketId;
                                    
              if(newMessage !== ''){

                const dateISO = moment().toISOString(true).split('T');
                const date = dateISO[0];
                const time = dateISO[1].split(':', 2).join(':');

                const currentDateThread = chat.find(chatItem => chatItem.date === date);
                        
                
                
                if(isMyMessage){
                  
                  let dataToAdd = {newThread: false, date, incomingMessage, time};

                  if(!currentDateThread){

                    dataToAdd.newThread = true;
  
                  }

                  await (0,_apiCallsFunctions_js__WEBPACK_IMPORTED_MODULE_13__.userChannelInteractions)(channel.name, 'update-chat', dataToAdd);


                }

                let currentUser = await (0,_apiCallsFunctions_js__WEBPACK_IMPORTED_MODULE_13__.getUserBySocketId)(messageSocketId);  
                
                const currentUserPictureName = currentUser.userPicture?.length > 0 ? JSON.parse(currentUser.userPicture).filename : '';
                const currentUserPhoto = currentUserPictureName !== '' ? (0,_functions_js__WEBPACK_IMPORTED_MODULE_14__.getUploadImgFolder)() + currentUserPictureName : (0,_functions_js__WEBPACK_IMPORTED_MODULE_14__.getStaticImgFolder)() + 'profile-picture-default.jpg';
                const currentUserUsername = '@' + currentUser.username || 0;
                const mainChatWrapper = document.querySelector('.channel__chat');
                const chatElement = `
                        <div class="channel__chat--item">
          
                              <div class="user" data-user="${currentUser._id}">
                                <div class="user__image">
                                  <img class="user__image--item" src="${currentUserPhoto}" alt="${currentUser.displayName} profile picture">
                                </div>
                                <span class="user__username">${currentUserUsername}</span>
                              </div>
          
                              <p class="message">${incomingMessage}</p>
          
                              <span class="publish-time">${time}</span>
          
                          </div>`;
                  mainChatWrapper.innerHTML += chatElement;

                  document.querySelector('.channel__chat').scrollTop = 9999999;


              }
            
          });
        
          
          document.querySelector('.channel').setAttribute('data-channel', name);
          document.querySelector('.channel__infos--title').innerText = displayName;
          document.querySelector('.channel__join--title').innerText = displayName;
          document.querySelector('.channel__infos--members .amount').innerText = members?.length;
          document.querySelector('.channel__infos--description').innerText = description || '';
          const chatWrapper = document.querySelector('.channel__chat');
          let chatItems = ``;

          
          if(Object.keys(chat || {}).length < 1){
            
            chatItems += `<span class="channel__chat--empty">Chat's empty :( Would you change that? </span>`;

          } else {


            const users = await (0,_apiCallsFunctions_js__WEBPACK_IMPORTED_MODULE_13__.getUsers)();

            chat?.map(el => el.messages?.map(message => {
  
              users.map(user => {              
                if(user._id == message?.userId){
                  message.userId = user;
                }
              })
              
            }));
                      
            chat?.map(chatItem => {
  
              const date = chatItem.date?.replaceAll('-', '/');
  
              chatItems += `
                <div class="channel__chat--date">${date}</div>
              `;
              
              chatItem.messages?.map((message) => {              
  
                const {userId: user} = message;
  
                const userPictureName = user.userPicture.length > 0 ? JSON.parse(user.userPicture).filename : '';
                const userPhoto = userPictureName !== '' ? (0,_functions_js__WEBPACK_IMPORTED_MODULE_14__.getUploadImgFolder)() + userPictureName : (0,_functions_js__WEBPACK_IMPORTED_MODULE_14__.getStaticImgFolder)() + 'profile-picture-default.jpg';
                const username = '@' + user.username || 0;
  
                chatItems += `
                    <div class="channel__chat--item">
  
                      <div class="user" data-user="${user._id}">
                        <div class="user__image">
                          <img class="user__image--item" src="${userPhoto}" alt="${displayName} profile picture">
                        </div>
                        <span class="user__username">${username}</span>
                      </div>
  
                      <p class="message">${message.message}</p>
  
                      <span class="publish-time">${message.time}</span>
  
                  </div>
                `;
  
              });
              
            });
  


          }

          chatWrapper.innerHTML = chatItems;
  
          document.querySelector('.channel__chat').scrollTop = 9999999;

        }

        if(document.querySelector('.channel-join')){
          
          document.querySelector('.channel-join').addEventListener('click', (e) => {
            e.preventDefault();          
            document.querySelector('.channel__join').classList.add('display-none');
            document.querySelector('.channel__top-ctas').classList.remove('display-none');
            document.querySelector('.channel__infos').classList.remove('display-none');
            document.querySelector('.channel__chat').classList.remove('display-none');
            document.querySelector('.channel__input').classList.remove('display-none');
            currentChannel({isNewMember: true, action: 'join'});
  
          });


        }

        currentChannel({action: 'firstLoaded'});


        document.querySelector('#leave-channel').addEventListener('click', (e) => {
          e.preventDefault();            
          currentChannel({isNewMember: false, action: 'leave'});
        });

        
        document.querySelector('.channel__input--form').addEventListener('submit', (e) => {
          e.preventDefault();
          const message = document.getElementById('text-message').value;
          
          if(message === '') return
          
          socket.emit("message", {messageSocketId: currUserSocketId, message});
          e.target.reset();
          
        });

        document.querySelector('#text-message').addEventListener('keypress', (e) => {
          const message = document.getElementById('text-message').value;
          
          if(message === '') return

          if(e.key === 'Enter'){
            
            e.preventDefault();
            document.getElementById("submit-message").click();
          
          }
          
        });



      }



  });


  
    
  
}


function goTo(url){
  history.pushState(null, null, url);
  callRouter();
}


async function updateNav(){
  
  const navLinksList = document.querySelector("#navlinks");
  navLinksList.innerHTML = await new _components_nav_js__WEBPACK_IMPORTED_MODULE_1__["default"]().renderLinks();

}

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Router)
/* harmony export */ });
class Router  {

  constructor(routes){
    this.routes = routes;

    this.routesMatches = this?.routes.map(route => {
      return {
        route: route,
        isCurrent: location.pathname === route.path
      }
    })

    
    this.match = this.routesMatches.find(routesMatch => routesMatch.isCurrent) || {
      route: this.routes[0],
      isCurrent: true
    }
    
  }

}


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Nav)
/* harmony export */ });
/* harmony import */ var _helpers_apiCallsFunctions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _helpers_functions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);


const serverUrl = (0,_helpers_functions_js__WEBPACK_IMPORTED_MODULE_1__.getServerUrl)();

class Nav {

  constructor(){

    this.linksItems = []; 
    this.detailsLinks = [];
    this.generatedetailsLinks();
    this.checkUserLoggedIn();

  }


  async checkUserLoggedIn(){

    const connectData = {
      method: 'GET',
      'credentials': 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    };

    
    const response = await fetch(`${serverUrl}/auth/connected`, connectData);
    const data = await response.json();

    return data.status;

  }
  

  generatedetailsLinks(){
    switch(location.pathname){
      case '/':
      case '/enter-space':
      case '/forgot-password':
      case '/reset-password':
      case '/verify-account':
          this.detailsLinks = [
          // {path: 'the-concept', title: 'The Concept', name: 'The Concept'},
          // {path: 'top-channels', title: 'Top Channels', name: 'Top Channels'},
          {path: 'genesis', title: 'Genesis', name: 'Genesis'}
        ]; 
        break;
      case '/channels':
      case '/profile':
      case '/edit-profile':
      case '/settings':
      case '/add-channel':
      case '/channel':
        this.detailsLinks = [
          // {path: 'my-currents', title: 'My Currents', name: 'My Currents'},
          // {path: 'stats', title: 'Stats', name: 'Stats'},
          // {path: 'requests', title: 'Request', name: 'Requests'},
          {path: 'genesis', title: 'Genesis', name: 'Genesis'}
        ]; 
        break;
      default:
        this.detailsLinks = []; 
        break;

    }

  }


  generateLinkElements(){

    this.detailsLinks.map(detailsLink => {
      this.linksItems +=  `<a 
                href="/${detailsLink.path}"
                title="${detailsLink.title}"
                data-link
                class="nav-link">
                  ${detailsLink.name}
              </a>`;
    });

  }


  generateConnectedElements(isAdmin){

    if(location.pathname !== '/profile'){
      this.linksItems +=  `

      <a href="/profile" title="Profile" data-link class="nav-link">
        <i class="fa-solid fa-user"></i>
      </a>

    `;

      if(isAdmin){
        this.linksItems +=  `

          <a href="/add-channel" title="Add Channel" data-link class="nav-link">
            + channel
          </a>

    `;
      }

    }
    
  }


  async renderLinks(){

    this.generateLinkElements();

    const loggedin = await this.checkUserLoggedIn();
    const isAdmin = await (0,_helpers_apiCallsFunctions_js__WEBPACK_IMPORTED_MODULE_0__.getAdminAccess)();    

    if(loggedin){
      this.generateConnectedElements(isAdmin);
    }

    return this.linksItems;

  }


  
}

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkUserConnexionStatus: () => (/* binding */ checkUserConnexionStatus),
/* harmony export */   getAdminAccess: () => (/* binding */ getAdminAccess),
/* harmony export */   getChannel: () => (/* binding */ getChannel),
/* harmony export */   getChannels: () => (/* binding */ getChannels),
/* harmony export */   getMessagesByUser: () => (/* binding */ getMessagesByUser),
/* harmony export */   getUserById: () => (/* binding */ getUserById),
/* harmony export */   getUserBySocketId: () => (/* binding */ getUserBySocketId),
/* harmony export */   getUserInfos: () => (/* binding */ getUserInfos),
/* harmony export */   getUsers: () => (/* binding */ getUsers),
/* harmony export */   handleAddChannel: () => (/* binding */ handleAddChannel),
/* harmony export */   handleForgotPassword: () => (/* binding */ handleForgotPassword),
/* harmony export */   handleLogin: () => (/* binding */ handleLogin),
/* harmony export */   handleRegister: () => (/* binding */ handleRegister),
/* harmony export */   handleResetPassword: () => (/* binding */ handleResetPassword),
/* harmony export */   handleSettings: () => (/* binding */ handleSettings),
/* harmony export */   handleUpdateUserInfos: () => (/* binding */ handleUpdateUserInfos),
/* harmony export */   userChannelInteractions: () => (/* binding */ userChannelInteractions)
/* harmony export */ });
/* harmony import */ var _managmentFunctions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);


const serverUrl = (0,_functions_js__WEBPACK_IMPORTED_MODULE_1__.getServerUrl)();

async function handleRegister(formData, event){

  const userRegisterData = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  };


  try {

    const response = await fetch(`${serverUrl}/auth/register`, userRegisterData);
    const data = await response.json();

    if(data.message == 'This user already exists'){

      document.getElementById('error-register').innerText = 'Sorry, this email address is already taken.';

    } else {

      event.target.reset();

      document.querySelector('.enter-space__register--title').innerText = "You're signed up!";
      document.querySelector('.enter-space__register--description').innerText = "You can now log in to discover our Zobbies channels. You've been sent a mail to confirm your e-mail address.";
      document.getElementById('registerForm').innerHTML = "";
      window.scrollTo({ top: 0, behavior: 'smooth' })

    }

    

  } catch(err){

    return err;

  }

}


async function handleLogin(formData, event){
  
  const userLoginData = {
    method: 'POST',
    'credentials': 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  };


  try {

    const response = await fetch(`${serverUrl}/auth/login`, userLoginData);
    const data = await response.json();

    if(data.message == 'This user does not exist'){

      document.getElementById('error-login').innerText = 'Sorry, this account doesn\'t exist. Make sure your username is correct.';

    } else if(data.message == 'This password is incorrect'){

      document.getElementById('error-login').innerText = 'Sorry, your password is incorrect.';

    } else {

      event.target.reset();
      (0,_managmentFunctions_js__WEBPACK_IMPORTED_MODULE_0__.goTo)('/channels');
      (0,_managmentFunctions_js__WEBPACK_IMPORTED_MODULE_0__.updateNav)();

    }

    

  } catch(err){

    return err;

  }

}


async function handleForgotPassword(formData, event){

  const userForgotData = {
    method: 'POST',
    'credentials': 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  };


  try {

    const response = await fetch(`${serverUrl}/auth/forgot-password`, userForgotData);
    const data = await response.json();

    if(data.message == 'This email address is not associated with any account'){

      document.getElementById('error-forgot-password').innerText = 'Sorry, this email address in not linked to any account. Make sure your email address is correct.';

    } else {

      event.target.reset();

      document.querySelector('.forgot-password__title').innerText = "One more step to go!";
      document.querySelector('.forgot-password__description').innerText = "Please check your inbox. You've been sent an email with a reset link to update your password.";
      document.getElementById('ForgotPasswordForm').innerHTML = "";

    }

    

  } catch(err){

    return err;

  }

}


async function handleResetPassword(formData, event){

  const userResetData = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  };

  const token = location.hash.replace('#', '');

  try {

    const response = await fetch(`${serverUrl}/auth/reset-password/${token}`, userResetData);
    const data = await response.json();

    if(!data.status){

      document.getElementById('error-reset-password').innerText = 'Sorry, there seem to be an error in the reset process. Try again later.';

    } else {

      event.target.reset();

      document.querySelector('.reset-password__title').innerText = "Your password has been reset!";
      document.querySelector('.reset-password__description').innerHTML = `<span>You can now <a href="/enter-space">log in</a> into your account, using your username (<strong><em>${data.user.username}</em></strong>), your new password.</span>`;
      document.getElementById('ResetPasswordForm').innerHTML = "";
      window.scrollTo({ top: 0, behavior: 'smooth' })

    }

    

  } catch(err){

    return err;

  }

}


async function checkUserConnexionStatus(){

  const connectData = {
    method: 'GET',
    'credentials': 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  const response = await fetch(`${serverUrl}/auth/connected`, connectData);
  const data = await response.json();
  return data.status;
  
}


async function getUserInfos(){

  const profileData = {
    method: 'GET',
    'credentials': 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  };

  const response = await fetch(`${serverUrl}/auth/user`, profileData);
  const data = await response.json();

  if(data.status){
   return data.user; 
  }

}


async function handleUpdateUserInfos(formData, event){

  const userInfosData = {
    method: 'POST',
    'credentials': 'include',
    body: formData
  };


  try {

    const response = await fetch(`${serverUrl}/auth/update-user`, userInfosData);
    const data = await response.json();

    if(!data.status){

      document.getElementById('error-edit-profile').innerText = 'Sorry, error updating your informations';

    } else {

      event.target.reset();
      window.scrollTo({ top: 0, behavior: 'smooth' })

      document.querySelector('.edit-profile__title').innerText = "Profile updated!";
      document.getElementById('edit-profile-form').innerHTML = "";

      setTimeout(() => {
        (0,_managmentFunctions_js__WEBPACK_IMPORTED_MODULE_0__.goTo)('/profile');
      }, 3000);


    }

    

  } catch(err){

    return err;

  }

}


async function handleSettings(formData, event){

  const userSettingsData = {
    method: 'POST',
    'credentials': 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  };


  try {

    const response = await fetch(`${serverUrl}/auth/settings`, userSettingsData);
    const data = await response.json();

    if(!data.status && data.spec == 'Email already taken'){

      document.getElementById('error-settings').innerText = 'Sorry, this email address is already taken.';

    } else if(!data.status && data.spec == 'Username already taken'){

      document.getElementById('error-settings').innerText = 'Sorry, this username is already taken.';

    } else {

      event.target.reset();

      document.querySelector('.settings__title').innerText = "Informations saved!";
      document.getElementById('settings-form').innerHTML = "";
      window.scrollTo({ top: 0, behavior: 'smooth' })

      setTimeout(() => {
        ;(0,_managmentFunctions_js__WEBPACK_IMPORTED_MODULE_0__.goTo)('/profile');
      }, 2000);

    }

    

  } catch(err){

    return err;

  }

}


async function getAdminAccess(){

  const addChannelData = {
    method: 'GET',
    'credentials': 'include'
  };

  const response = await fetch(`${serverUrl}/auth/add-channel`, addChannelData);
  const data = await response.json();  

  return data.status; 

}

async function handleAddChannel(formData, event){

  const addChannelData = {
    method: 'POST',
    'credentials': 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  }


  try {

    const response = await fetch(`${serverUrl}/auth/add-channel`, addChannelData);
    const data = await response.json();

    if(!data.status){

      if(data.message == 'error adding the channel'){

        document.getElementById('error-add-channel').innerText = 'Error adding the channel. Please try again later.';

      } else if(data.message == 'Channel already exists') {

        document.getElementById('error-add-channel').innerText = "Sorry, this channel already exists.";

      } else {

        document.getElementById('error-add-channel').innerText = 'Make sure no field is empty';

      }

    } else {

      event.target.reset();

      document.querySelector('.add-channel__title').innerText = "Channel Added!";
      document.getElementById('addChannelForm').innerHTML = "";
      window.scrollTo({ top: 0, behavior: 'smooth' })

      setTimeout(() => {
        ;(0,_managmentFunctions_js__WEBPACK_IMPORTED_MODULE_0__.goTo)('/channels');
      }, 1000);

    }

    

  } catch(err){

    return err;

  }



}

async function userChannelInteractions(channel, action, updateChatData = null){

  
  try {
    
    const fetchData = {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'Application/json',
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({channel, action, updateChatData})
    }
    
  
    const response = await fetch(`${serverUrl}/auth/channel-interactions`, fetchData)
    const data = await response.json();
    
    if(data.status){
      return data;
    }
    
  } catch (err){    

    return err;

  }


}

async function getChannels(){

  const channelsData = {
    method: 'GET',
    'credentials': 'include'
  };

  const response = await fetch(`${serverUrl}/auth/channels`, channelsData);
  const data = await response.json();

  if(data.status){
   return data.channels; 
  }

}



async function getChannel(){

  const userChannelData = {
    method: 'GET',
    'credentials': 'include'
  };

  const name = location.hash.replace('#', '');

  try {

    const response = await fetch(`${serverUrl}/auth/channel/${name}`, userChannelData);
    const data = await response.json();

    if(data.status){
      return data.channel; 
     }

  } catch(err){

    return err;

  }

}



async function getUserById(id){

  const userData = {
    method: 'GET',
    'credentials': 'include'
  };

  const response = await fetch(`${serverUrl}/auth/user/${id}`, userData);
  const data = await response.json();  

  if(data.status){
   return data.user; 
  }

}


async function getUsers(){

  const usersData = {
    method: 'GET',
    'credentials': 'include'
  };

  const response = await fetch(`${serverUrl}/auth/users`, usersData);
  const data = await response.json();  

  if(data.status){
   return data.users; 
  }

}


async function getUserBySocketId(socketId){

  const userData = {
    method: 'GET',
    'credentials': 'include'
  };

  const response = await fetch(`${serverUrl}/auth/current-user/${socketId}`, userData);
  const data = await response.json();  

  if(data.status){
   return data.user; 
  }

}


async function getMessagesByUser(userId){

  const userData = {
    method: 'GET',
    'credentials': 'include'
  };

  const response = await fetch(`${serverUrl}/auth/all-messages/`, userData);
  const data = await response.json();  

  if(data.status){

    const channels = data.channels;

    const userMessages = [];

    channels.map(channel => {
      if(channel.members.length > 0){      
        if(channel.members.includes(userId)){
          if(channel.chat.length > 0){
            channel.chat.map(chat => {
              chat.messages.filter(message => {
                if(message.userId === userId){
                  userMessages.push({channel: {name: channel.name, displayName: channel.displayName}, message});
                }
              })         
            })
          }
        }
      }
    })

    
   return userMessages; 

  }

}

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getClientUrl: () => (/* binding */ getClientUrl),
/* harmony export */   getServerUrl: () => (/* binding */ getServerUrl),
/* harmony export */   getStars: () => (/* binding */ getStars),
/* harmony export */   getStaticImgFolder: () => (/* binding */ getStaticImgFolder),
/* harmony export */   getUploadImgFolder: () => (/* binding */ getUploadImgFolder)
/* harmony export */ });
function getStaticImgFolder(){
  return './src/images/default/';
}

function getUploadImgFolder(){
  return location.protocol + '//' + location.hostname + ':5000/server/uploads/';
}

function getStars(pl){
  let stars = '';
  for(let i = 0; i < pl; i++){
    stars += '*';
  }
  return stars;
}



function getClientUrl(){
  return location.origin;
}


function getServerUrl(){

  let url;

  switch(getClientUrl()){
    case 'http://localhost:3050':
      url = 'http://localhost:5000';
      break;
    default:
      url = 'https://zobbies.vercel.app'
      break;
  }

  return url;

}

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AbstractView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class extends _AbstractView_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
      super();
      this.setWindowDetails('Zobbies - Welcome', '');
    }


    async getHtml() {
        return `
            <div class="landing-page wrapper">

              <div class="landing-page__content">

                <h1 class="landing-page__content--title">Meet like minded people</h1>
                <h2 class="landing-page__content--subtitle">and make genuine connections</h2>
                <h3 class="landing-page__content--label">Freely</h3>
                <p class="landing-page__content--description">A place to escape et rejoice. Somewhere to discuss about all the things you're passionate about with people who feel and like the same things you do. A dream, right?</p>
                <a class="landing-page__content--cta primary-cta" href="enter-space" data-link>Enter now</a>
        

              </div>

              <div class="landing-page__blobs blobs">
                <div class="landing-page__blobs--item blob background-1 ptl">
                  <span data-blob="gaming">gaming</span>
                </div>
                <div class="landing-page__blobs--item blob background-2 pt">
                  <span data-blob="traveling">traveling</span>
                </div>
                <div class="landing-page__blobs--item blob background-3 ptr">
                  <span data-blob="dancing">dancing</span>
                </div>
                <div class="landing-page__blobs--item blob background-1 pr">
                  <span data-blob="hiking">hiking</span>
                </div>
                <div class="landing-page__blobs--item blob background-2 pbr">
                  <span data-blob="clubbing">clubbing</span>
                </div>
                <div class="landing-page__blobs--item blob background-3 pbl">
                  <span data-blob="reading">reading</span>
                </div>
              </div>

            </div>
        `;
    }
});

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class {
  constructor(){
    this.countriesListHtml = "";
  }

  setWindowDetails(title, bodyViewAttribute){
    document.title = title;
    window.document.body.setAttribute('view', bodyViewAttribute);
  }


  async getCountryList(){

    const response = await fetch('https://restcountries.com/v2/all');
    const data = await response.json();
    const countryList = data.map(country => country.name);
    const countriesInOrder = countryList.sort((a, b) => a.localeCompare(b));
    countriesInOrder.map(country => {
      this.countriesListHtml += `<option class="countryOptions" value="${country}">${country}</option>`;
    });

    document.getElementById('country').innerHTML = this.countriesListHtml;

  }


  async getHtml(){
   return ""; 
  }

});

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AbstractView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class extends _AbstractView_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {

      super();
      this.setWindowDetails('Zobbies - Enter the world now', 'enter-space');
      this.getCountryList();

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
});

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AbstractView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class extends _AbstractView_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
      super();
      this.setWindowDetails('Zobbies - Channels', 'channels');
    }

    async getHtml() {      
        return `
            <div class="channels wrapper">

              <h1 class="channels__title">The Channels</h1>

              <div class="channels__blobs blobs">


              </div>

            </div>
        `;
    }
});

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AbstractView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class extends _AbstractView_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
});

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AbstractView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class extends _AbstractView_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
});

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AbstractView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _src_js_helpers_functions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);


const serverUrl = (0,_src_js_helpers_functions_js__WEBPACK_IMPORTED_MODULE_1__.getServerUrl)();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class extends _AbstractView_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
});

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AbstractView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class extends _AbstractView_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
      super();
      this.setWindowDetails('Zobbies - profile', 'profile');
    }


    async getHtml() {
        return `
            <div class="profile wrapper">


              <div class="profile__main">

                <div class="profile__main--sidebar">

                  <div class="profile-picture">
                    <img src="" alt="Profile picture" id="profile-view-user-picture">
                  </div>

                  <div class="user-infos">
                    <h4 class="user-infos__username"></h4>
                    <h4 class="user-infos__display-name"></h4>
                    <h4 class="user-infos__bio"></h4>
                    <h4 class="user-infos__gender"></h4>
                  </div>

                  <div class="platform">
                    <a href="/edit-profile" title="Edit profile" data-link class="platform__edit-profile">Edit profile</a>
                    <a href="/settings" title="Settings" class="platform__settings">Settings</a>
                    <a href="/" class="platform__logout" id="logout">
                      <i class="fa-solid fa-right-from-bracket"></i>
                    </a>
                  </div>
                
                </div>
                <div class="profile__main--flux">


                  <div class="flux-item">

                  </div>

                </div>
            
              </div>
              
            </div>
        `;
    }
});

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AbstractView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class extends _AbstractView_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
});

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AbstractView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class extends _AbstractView_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
});

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AbstractView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class extends _AbstractView_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
});

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AbstractView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class extends _AbstractView_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
                <input id="submit-message" type="submit" value="↑"></input
              </form>
            </div>

          </div>

        `;
    }
});

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_helpers_managmentFunctions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


// history, router and click events
window.addEventListener('popstate', _js_helpers_managmentFunctions_js__WEBPACK_IMPORTED_MODULE_0__.callRouter);

document.addEventListener('DOMContentLoaded', () => {
  
  document.body.addEventListener('click', (e) => {    

    if(e.target.matches('[data-link]')){
      
      e.preventDefault();
      (0,_js_helpers_managmentFunctions_js__WEBPACK_IMPORTED_MODULE_0__.goTo)(e.target.href);
      (0,_js_helpers_managmentFunctions_js__WEBPACK_IMPORTED_MODULE_0__.updateNav)();
     
    }
  });
  
  (0,_js_helpers_managmentFunctions_js__WEBPACK_IMPORTED_MODULE_0__.updateNav)();
  (0,_js_helpers_managmentFunctions_js__WEBPACK_IMPORTED_MODULE_0__.callRouter)();



})
/******/ })()
;