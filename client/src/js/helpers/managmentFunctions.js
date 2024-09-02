import Router from "../router/router.js";
import Nav from "../components/nav.js";

import LandingPageView from '../views/LandingPageView.js';
import EnterSpaceView from '../views/EnterSpaceView.js';
import ChannelsView from '../views/ChannelsView.js';
import ForgotPasswordView from '../views/ForgotPasswordView.js';
import ResetPasswordView from '../views/ResetPasswordView.js';
import VerifyAccountView from "../views/VerifyAccountView.js";
import ProfileView from '../views/ProfileView.js';
import EditProfileView from "../views/EditProfileView.js";
import SettingsView from "../views/SettingsView.js";
import AddChannelView from "../views/AddChannelView.js";
import ChannelView from "../views/ChannelView.js";
import StaticView from "../views/StaticView.js";

import {handleRegister, handleLogin, handleForgotPassword, handleResetPassword, checkUserConnexionStatus, getUserInfos, handleUpdateUserInfos, handleSettings, getAdminAccess, handleAddChannel, getChannels, getChannel, getUsers, userChannelInteractions, getUserBySocketId, getUserById} from './apiCallsFunctions.js';
import { getStaticImgFolder, getUploadImgFolder, getStars, getServerUrl } from "./functions.js";

const serverUrl = getServerUrl();

const socket = io(serverUrl);

export async function callRouter(){

  const isAdmin = await getAdminAccess();
  
  await checkUserConnexionStatus().then((checkStatus) => {

    let routes = [
      {path: '/cookies', view: StaticView},
      {path: '/privacy-policy', view: StaticView},
      {path: '/conditions-of-use', view: StaticView},
      {path: '/disclaimers', view: StaticView},
      {path: '/genesis', view: StaticView},
    ];

    if(checkStatus){

      routes.unshift({path: '/channels', view: ChannelsView});
      routes.push(
        {path: '/verify-account', view: VerifyAccountView},
        {path: '/profile', view: ProfileView},
        {path: '/edit-profile', view: EditProfileView},
        {path: '/settings', view: SettingsView},
        {path: '/add-channel', view: AddChannelView},
        {path: '/channel', view: ChannelView}
      );

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

      routes.unshift({path: '/', view: LandingPageView});
      routes.push(
        {path: '/enter-space', view: EnterSpaceView},
        {path: '/forgot-password', view: ForgotPasswordView},
        {path: '/reset-password', view: ResetPasswordView},
        {path: '/verify-account', view: VerifyAccountView}
      );

      const routesPaths = routes.map(route => route.path);

      if(!routesPaths.includes(location.pathname)){
        history.pushState(null, null, '/');
        updateNav();
      }
  
    }

    return routes;


  }).then(async (routes) => {

    const router = new Router(routes);
    const view = await new router.match.route.view();
    const zobbies = document.querySelector("#app");
    const viewHtml = await view.getHtml();
    
    zobbies.innerHTML = viewHtml;

    let getUserIdProfileVisit = null;

    if(location.pathname === '/profile'){
      getUserIdProfileVisit = await view.getUserIdProfileVisit();
    }

    return getUserIdProfileVisit;


  }).then((getUserIdProfileVisit) => {

  
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

            handleRegister(registerValues, e);
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

            handleLogin(loginValues, e);

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

      
            handleForgotPassword({ email: userEmail}, e);
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

      
            handleResetPassword({ password: userNewPassword}, e);
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

          const userDetails = getUserIdProfileVisit ? await getUserById(getUserIdProfileVisit) : await getUserInfos();
      
          if(getUserIdProfileVisit){
            document.querySelector('.platform').classList.add('display-none');
          }

          const userPictureName = userDetails.userPicture.length > 1 ? JSON.parse(userDetails.userPicture).filename : '';
          const profilePicture = userPictureName !== '' ? getUploadImgFolder() + userPictureName : getStaticImgFolder() + 'profile-picture-default.jpg';
          const username = '@' + userDetails.username || '@username-undefined';
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
          const user = await getUserInfos();

          const userPictureName = user.userPicture.length > 1 ? JSON.parse(user.userPicture).filename : '';
          const profilePicture = userPictureName !== '' ? getUploadImgFolder() + userPictureName : getStaticImgFolder() + 'profile-picture-default.jpg';
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

              handleUpdateUserInfos(bodyFormData, e);
              errorMessageSpan.innerText = '';
              

          }

          
        });




      }

      // handle settings view
      if(location.pathname == '/settings'){


        const userInfos = async () => {

          const {lastname, firstname, dateOfBirth, gender, country, email, username, pl} = await getUserInfos();
  
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
          document.querySelector('#settings-password').setAttribute('placeholder', getStars(pl));
        

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
  
              handleSettings(settingsValues, e);
              errorMessageSpan.innerText = '';
              
  
          }
  
          
        })


        document.querySelector('.cancel-settings').addEventListener('click', (e) => {
          
          e.preventDefault();
          document.getElementById('settings-form').reset();
          goTo('/profile');


        });


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
              
              handleAddChannel(addChannelData, e);
      
          }
  
        });

      }
      
      // channels view
      if(location.pathname == '/channels'){

        let channelElements = ``;
        async function channelsItems(){

          const channels = await getChannels();
          channels.map(channel => {
            const {name, displayName, members} = channel;
            
            channelElements += `
                    <div class="channels__blobs--item blob">
                      <a href="/channel#${name}" data-blob="${name}">${displayName}</a>
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
        let socket;
        let room;
        
        async function currentChannel(options = {}){
          
          let channel = await getChannel();
          
          if(Object.keys(options).length > 0){

            if(options.action == 'firstLoaded'){
              
              const currUser = await getUserInfos();
              
              if(channel?.members.find(member => member == currUser._id)){

                document.querySelector('.channel__join').classList.add('display-none');
                document.querySelector('.channel__top-ctas').classList.remove('display-none');
                document.querySelector('.channel__infos').classList.remove('display-none');
                document.querySelector('.channel__chat').classList.remove('display-none');
                document.querySelector('.channel__input').classList.remove('display-none');
                
              }
              
              

            } else {
              
              userChannelInteractions(channel.name, options.action);
              channel = await getChannel();

              if(options.action == 'redirect'){
                return goTo('/channels');
              }


              if(options.action == 'leave'){
                return await currentChannel({action: 'redirect'});
              }

              return await currentChannel();

            }


            socket = io(serverUrl)

            socket.emit('leaveRoom', channel.name);
            currUserSocketId = null;
            socket.off('newMessage');
            socket.disconnect();

            return await currentChannel();


          }

          
          const {name, displayName, description, members, chat} = channel;
          
          
          // chat config
          socket = io(serverUrl);
          room = name;

          socket.on("connect", () => {
            socket.emit('joinRoom', room);
            currUserSocketId = socket.id;
            userChannelInteractions('', 'socket', currUserSocketId);
          });


          const addNewMessage = async newMessage => {

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

                await userChannelInteractions(channel.name, 'update-chat', dataToAdd);


              }

              let currentUser = await getUserBySocketId(messageSocketId);  
              
              const currentUserPictureName = currentUser.userPicture?.length > 1 ? JSON.parse(currentUser.userPicture).filename : '';
              const currentUserPhoto = currentUserPictureName !== '' ? getUploadImgFolder() + currentUserPictureName : getStaticImgFolder() + 'profile-picture-default.jpg';
              const currentUserUsername = '@' + currentUser.username || '@username-undefined';
              const mainChatWrapper = document.querySelector('.channel__chat');
              const chatElement = `
                      <div class="channel__chat--item">
        
                            <div class="user" data-user="${currentUser._id}">
                              <div class="user__image">
                                <img class="user__image--item" src="${currentUserPhoto}" alt="${currentUser.displayName} profile picture">
                              </div>
                              <a class="user__username exit-channel" data-user-profile-id="${currentUser._id}" data-link href="/profile" title="Visit ${currentUser.username}'s profile">${currentUserUsername}</a>
                            </div>
        
                            <p class="message">${incomingMessage}</p>
        
                            <span class="publish-time">${time}</span>
        
                        </div>`;
                mainChatWrapper.innerHTML += chatElement;

                document.querySelector('.channel__chat').scrollTop = 9999999;


            }
          
          }
          socket.on('newMessage', addNewMessage);
        
          
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


            const users = await getUsers();

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
  
                const userPictureName = user.userPicture.length > 1 ? JSON.parse(user.userPicture).filename : '';
                const userPhoto = userPictureName !== '' ? getUploadImgFolder() + userPictureName : getStaticImgFolder() + 'profile-picture-default.jpg';
                const username = '@' + user.username || '@username-undefined';
  
                chatItems += `
                    <div class="channel__chat--item">
  
                      <div class="user" data-user="${user._id}">
                        <div class="user__image">
                          <img class="user__image--item" src="${userPhoto}" alt="${displayName} profile picture">
                        </div>
                        <a class="user__username exit-channel" data-user-profile-id="${user._id}" data-link href="/profile" title="Visit ${user.username}'s profile">${username}</a>
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
          
          socket.emit("message", {room, messageSocketId: currUserSocketId, message});
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

        document.querySelectorAll('.exit-channel').forEach(exit => {

          exit.addEventListener('click', (e) => {
            
            socket.emit('leaveRoom', room);
            currUserSocketId = null;
            socket.off('newMessage');
            socket.disconnect();

          })

        })

        

      }


      // static pages view
      const statisRoutes = ['/genesis', '/cookies', '/privacy-policy', '/conditions-of-use', '/disclaimers'];
      if(statisRoutes.includes(location.pathname)){
        window.document.body.setAttribute('type', 'static');
      } else {
        window.document.body.removeAttribute('type');
      }


  });


  
    
  
}


export function goTo(url){
  history.pushState(null, null, url);
  callRouter();
}


export async function updateNav(){
  
  const navLinksList = document.querySelector("#navlinks");
  navLinksList.innerHTML = await new Nav().renderLinks();

}