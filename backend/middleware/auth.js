import {validateToken} from '../services/authentication.js'
import User from '../models/user.js';

export async function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null;

  if (!tokenCookie) return next();

  try {
    const payload = validateToken(tokenCookie); // throws if invalid
    // fetch the current user from DB (live data)
    const user = await User.findById(payload._id).select("-password"); // exclude sensitive fields
    if (!user) {
      return next();
    }
    req.user = user; // attach live Mongoose document
    return next();
  } catch (err) {
    // token invalid or DB error — treat as unauthenticated
    console.error("Auth middleware error:", err.message);
    return next();
  }
} 

export function restrictTo(){
    return function(req,res,next){
        if(!req.user) return res.status(401).json({message: "Unauthorized"});
        return next();
    }
}