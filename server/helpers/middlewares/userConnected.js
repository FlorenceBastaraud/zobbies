import jwt from 'jsonwebtoken';

export default async function isUserConnected(req, res, next){
  
  try {
    
    const token = await req.cookies?.token;

    console.log('--------- is User Connected backend func:');
    console.log(token);
    console.log(req.cookies);
    console.log('---signed cookie');
    console.log(req.signedCookies);
    
    
    if(token.length < 1){

      console.log('no connexion token');
      

      return res.json({status: false, message: "not connected"});

    } else {

      console.log('yes token');


      const tokenDecoded = await jwt.verify(token, process.env.JWTSECRETKEY);

      console.log(tokenDecoded);


      next();

    }


  } catch(err){

    console.log(err);
    console.log('error carrément dans le catch direct -- souci avec ca : await req.cookies?.token');
    
    

    return res.json({status: false, message: 'token not found'});
  
  }

};
