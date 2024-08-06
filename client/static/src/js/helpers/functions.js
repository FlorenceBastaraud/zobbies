export function getStaticImgFolder(){
  return './src/images/default/';
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