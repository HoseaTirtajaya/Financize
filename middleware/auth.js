const { admin } = require("../models");
const { verifytoken, generateToken, verifyRefreshToken, verifyAccessToken, generateRefreshToken, generateAccessToken } = require("../helper/jwttoken");

class Auth {
    static AuthJWT(req,res,next){
        let token = req.headers.token;
        verifytoken(token, (err,payload) => {
            if(err){
                res.status(401).json({
                    message: "Authentication error!",
                    status: 401
                });
            } else {
                req.decoded = payload;
                next();
            }
        });
    }
}

module.exports=Auth;