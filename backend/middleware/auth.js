import {validateToken} from '../services/authentication.js'

export function checkForAuthentication(req,res,next){
    const tokenCookie = req.cookies?.token;
    
    req.user = null;
    if(!tokenCookie){
        return next()
    }

    const token = tokenCookie;
    const user =  validateToken(token)
    req.user = user;
    return next();
}   

export function restrictTo(){
    return function(req,res,next){
        if(!req.user) return res.status(401).json({message: "Unauthorized"});

        return next();
    }
}