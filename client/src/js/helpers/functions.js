export function getStaticImgFolder(){
  return './images/';
}

export function getUploadImgFolder(){
  return location.protocol + '//' + location.hostname + ':5000/server/uploads/';
}

export function getStars(pl){
  let stars = '';
  for(let i = 0; i < pl; i++){
    stars += '*';
  }
  return stars;
}



export function getClientUrl(){
  return location.origin;
}


export function getServerUrl(){

  let url;

  switch(getClientUrl()){
    case 'http://localhost:3050':
      url = 'http://localhost:5000';
      break;
    default:
      url = 'https://zobbies.onrender.com'
      break;
  }

  return url;

}