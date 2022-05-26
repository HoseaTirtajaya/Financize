const jwt = require("jsonwebtoken");
const secretRefresh = process.env.HASH_JWT;
const secretAccess = process.env.HASH_REFRESH;

function generateToken(payload) {
  return jwt.sign(payload, secretRefresh, {expiresIn: "2 days"});
}

function verifytoken(token, callback) {
  return jwt.verify(token, secretRefresh, function (err, decoded) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, decoded);
    }
  });
}

function generateRefreshToken(payload) {
  return jwt.sign(payload, secretRefresh, {expiresIn: "1y"});
}

function generateAccessToken(payload) {
  return jwt.sign(payload, secretAccess, {expiresIn: "1200s"});
}

function verifyRefreshToken(token, callback) {
  return jwt.verify(token, secretRefresh, function (err, decoded) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, decoded);
    }
  });
}

function verifyAccessToken(token, callback) {
  return jwt.verify(token, secretAccess, function (err, decoded) {
    if(err){
      if(err.message === "jwt expired"){
        callback(null, "expired")
      } else {
        callback(err, null)
      }
    } else {
      callback(null, decoded);
    }
  });
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  generateToken,
  verifytoken
};