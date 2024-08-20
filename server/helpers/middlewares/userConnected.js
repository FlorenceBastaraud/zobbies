import jwt from 'jsonwebtoken';

export default async function isUserConnected(req, res, next){
  
  try {
    
    const token = await req.cookies?.token;
    
    if(token.length < 1){      

      return res.json({status: false, message: "not connected"});

    } else {

      const tokenDecoded = await jwt.verify(token, process.env.JWTSECRETKEY);

      next();

    }


  } catch(err){

    return res.json({status: false, message: 'token not found'});
  
  }

};
