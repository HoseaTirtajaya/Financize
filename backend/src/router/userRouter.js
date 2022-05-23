const express = require("express");
const Router = express.Router();
const { AuthJWT } = require("../middleware/auth");
const { registerUser, loginUser } = require("../controller/userController.js");

Router.post("/login", loginUser);
Router.post("/register", registerUser);

module.exports = Router;