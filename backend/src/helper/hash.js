const bcrypt = require("bcryptjs");

function hashPass(pass){
    let salt = bcrypt.genSaltSync(10);
    let newPass = bcrypt.hashSync(pass, salt);
    return newPass;
}

function checkPass(pass, hash){
    return bcrypt.compareSync(pass, hash);
}

module.exports = { hashPass, checkPass };