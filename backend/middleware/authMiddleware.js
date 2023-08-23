import {validateToken} from "../lib/auth.js";
import cookieParser from "cookie-parser";

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.jwt;
    console.log ("token:", token)
    // const headers = req.headers;
    // const authorization = headers.cookie;
    // console.log("authorization:",{authorization})

    // if (!authorization){
    //     return res.status(403).json({message: "Authentification failed!"});
    // }

    // try {
    //     console.log({authorization})
    //     const token = authorization.split("=")[1];

    //     console.log("token: Zeile 14 middleWare:", token)

        if (!token){
            return res.status(403).json({message:"Authentication failed, no valid token!"})
        }
        try {
            req.user = await validateToken(token);
        next();
    } catch (error) {
        return res.status(401).json({messsage:"Authenticaton failed!"});
    }
}