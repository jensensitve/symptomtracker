import {validateToken} from "../lib/auth.js";
import cookieParser from "cookie-parser";

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.jwt;
    console.log ("token:", token)


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