require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth=(req,res,next)=>{
    const token =req.header('x-auth-token');
    if(!token){
        return res.status(401).json({msg:'No Token,access denied'});
    }
    try{
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        req.user = decoded;
        next(); 
    }catch(e){
        res.status(400).json({msg:'Token not valid'})
    }
}

module.exports = auth;