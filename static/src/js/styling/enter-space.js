window.document.addEventListener('DOMContentLoaded', () => {

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


});