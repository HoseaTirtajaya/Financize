module.exports=(err, req, res, next) => {
    let status = err.status || 500;
    let message = err.message || "Internal Server Error";
    console.log("=============");
    console.log(err);
    console.log("=============");
    // let tableMiss = err.parent.detail.split('"');
    // switch(tableMiss[1]){
    //     case "users":
    //         console.log("Masuk")
    //         message = "User not found on server"
    //         status = err.status || "404";
    //         break;
    //     default:
    //         message = err.message || "Internal Server Error";
    //         status = err.status || "500";
    //         break;
    // }
    res.status(status).json({
        message,
        status
    });
};
