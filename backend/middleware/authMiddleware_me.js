import { validateToken } from "../lib/auth.js";

export const authMiddleware = async (req, res, next) => {
    const headers = req.headers;
    const authorization = headers.cookie;
console.log(authorization)

    if (!authorization) {
        return res.status(403).json({message:"Authentification failed!"});
    }
    try {
        console.log("hallo", { authorization, headers })
        console.log("token before split", authorization);
        const token = authorization.split("=")[1];
        console.log("token validation", { token });
        if (!token) {
           return res.status(403).json({ msg: "Authentifizierung fehlgeschlagen! Token fehlerhaft." });
        }
        req.user = await validateToken(token);
        next();
     } catch (error) {
        return res.status(401).json({ error, msg: "Authentifizierung fehlgeschlagen!" });
     }
    // try {
        
    //     const token = authorization.split("=")[1] //jwt=aödfjöl43265ö26h3ö7jh67öjhö37h63ö => [jwt, aödfjöl43265ö26h3ö7jh67öjhö37h63ö]
    //     if (!token){
           
    //         return res.status(403).json({message: "No valied Token"})
    //     }
    //     req.user = await validateToken(token);
    //     next();

    // } catch(error){
    //     return res.status(401).json({message: "Du heute nicht!"})

    // }
}