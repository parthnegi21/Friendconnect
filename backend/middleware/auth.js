const jwt = require('jsonwebtoken');

async function authMiddleware(req,res,next){
const authHeader =  req.headers.authorization;

if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ msg: "No token provided or invalid format" });
  }

  const token = authHeader.split(' ')[1];



const checktoken = jwt.verify(token,"secreat")
if(checktoken){
    req.user = checktoken
    next()
}
else{
    res.json({msg:"wrong token"})
}



}
module.exports = authMiddleware