import jwt from "jsonwebtoken";
import { promisify } from "util";
import dotenv from "dotenv";
dotenv.config();

const sign = promisify(jwt.sign);
const verify = promisify(jwt.verify);

const secret = process.env.JWT_SECRET

// export const createToken = async (payload, option = null)  => {

//     const token = await sign(payload, secret, option);
//     console.log(token)
//     return token; 
// }

export const createToken = async (payload) => {
    const token = await sign(payload, secret, {expiresIn: "1h", algorithm: "HS512"})
    return token
}

export const validateToken = async(token) => {
    const verifiedToken = await verify(token, secret);
    return verifiedToken
}