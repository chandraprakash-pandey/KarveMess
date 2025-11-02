import JWT from "jsonwebtoken";
const secret = "kisikonhipata";

export function createTokenForUser(user){
    const payload = {
        _id:user._id,
        email:user.email,
        fullName:user.fullName,
        messName:user.messName,
        messAddress:user.messAddress
    }
    const token = JWT.sign(payload,secret);

    return token;
}

export function validateToken(token){
    const payload = JWT.verify(token,secret);
    return payload;
}

