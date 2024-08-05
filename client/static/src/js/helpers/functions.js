export function getStaticImgFolder(){
  return './src/images/default/';
}

export function getUploadImgFolder(){
  return location.protocol + '//' + location.hostname + ':5000/server/uploads/';
}