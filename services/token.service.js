import { sign, verify } from "../utils/token.utils.js"

export const generateToken = async (payload, expiresIn, secret) => {
    let token = await sign(payload, expiresIn, secret)
    return token
}



//verify coming from token.utils.js
export const verifyToken = async (token, secret) => {
    let check = await verify(token, secret)
    return check;
}


//sign coming from utils