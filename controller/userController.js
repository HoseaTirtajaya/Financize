const { user } = require("../models/");
const { hashPass, checkPass } = require("../helper/hash.js");
const { generateToken } = require("../helper/jwttoken");

class userController{
    static registerUser(req, res, next){
        const {email, full_name, gender} = req.body;
        let password = req.body.password;

        let hashedPass = hashPass(password);
        user.create({email, password: hashedPass, full_name, gender})
        .then((userCreate) => {
            if(userCreate.dataValues){
                res.status(200).json({message: "Success", data: userCreate.dataValues});
            } else {
                res.status(500).json({message: "Fail to create user"});
            }
        }).catch(next);
    }
    static loginUser(req, res, next){
        const { email, password } = req.body;

        user.findOne({where: { email }})
        .then((userData) => {
            if(userData){
                let hashPass = checkPass(password, userData.password);
                if(hashPass){
                    let token = generateToken({id: userData.id});
                    res.status(200).json({message: "Success", data: token});
                } else {
                    res.status(400).json({message: "Wrong email or password!"});
                }
            } else {
                res.status(400).json({message: "Wrong email or password!"});
            }
        }).catch(next);
    }
}

module.exports = userController;