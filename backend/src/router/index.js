const express = require("express");
const Router = express.Router();

//Router modules

const userRouter = require("./userRouter");
const financialRouter = require("./financialRouter");

//--------------------------------------------
//Routes



//--------------------------------------------
//Redirect for any unknown hits to "/"
Router.use("/", (req,res,next) => {
    res.status(200).json({message: "OK"})
});

module.exports = Router;
