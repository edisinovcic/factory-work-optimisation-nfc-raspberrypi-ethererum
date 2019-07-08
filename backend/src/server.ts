// import customErrorHandler from 'errors/errorHandler';
// import errorHandler from 'errorhandler';
// @ts-ignore
import app from "./app";
// import path from "path";

// let options = {};
// console.log(`Node env is: ${process.env.NODE_ENV}`);
// options.path = path.resolve(process.cwd(), '.env');

// const dotenv = require('dotenv');
// dotenv.config(options);

// app.use(errorHandler(customErrorHandler));

const server = app.listen(app.get("port"), () => {
    console.log(
        "App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    );
    console.log("Press CTRL-C to stop\n");
});

export default server;

