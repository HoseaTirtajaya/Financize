if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
    require("dotenv").config();
}

const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const app = express();

const PORT = process.env.PORT || 8088;
const logger = require('morgan')

// config form body untuk frontend
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// config form body untuk frontend
app.use(logger('dev'))
//
app.set("trust proxy", true)

app.use(helmet());
app.use(compression());
app.use(helmet.frameguard({
action: "deny"
}));
app.use(helmet.hidePoweredBy());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.xssFilter());
app.use(helmet.contentSecurityPolicy({
directives:{
    defaultSrc: [ "'self'", "https:" ],
    scriptSrc: ["'self'", "https://www.google-analytics.com/"],
    connectSrc:["'self'"],
    childSrc:["'self'"],
    styleSrc:["'self'", "https://maxcdn.bootstrapcdn.com/"],
    fontSrc:["'self'", "https://maxcdn.bootstrapcdn.com/"],
    imgSrc:["'self'", "https://www.google-analytics.com", "https://*.smaluna-id.com/"],
    frameAncestors: ["'none'"]
}
}));

// config router REST API and errHandler and CORS
const errHandler=require("./middleware/errHandler");
const mainRoute=require("./router/index");
app.use((req, res, next) => {
    const whitelist = [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://financize-frontend.herokuapp.com/"
        undefined// buat postman atau insomnia rest api
    ];
    if(whitelist.includes(req.headers.origin)){
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header("Access-Control-Allow-Headers", "X-Requested-With,origin,authorization, Content-Type,accept,client-sent-security-token,token");
        res.header('Access-Control-Allow-Credentials', true);
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, PATCH, OPTIONS");
        res.header("Access-Control-Expose-Headers", "Content-Security-Policy, Location");
        next();

    } else {
        let ip = req.ip.substr(7)
        console.log(`connection from ${req.headers.origin} with ${ip} rejected`)
        // res.status(404).json({message: "The endpoint you looking for doesn't exist"})
    }
  });
app.use(mainRoute);
app.use(errHandler);
// config router REST API and errHandler and CORS

// config toobusy
// reference : https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#monitor-the-event-loop
const toobusy = require('toobusy-js');
const { database, port } = require("pg/lib/defaults");
const session = require("express-session");
app.use(function (req, res, next) {
    if (toobusy()) {
        res.send(503, "Server Too Busy");
    } else {
        next();
    }
});
// config toobusy

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server is running ${PORT}`);
});

module.exports = app;
