"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import customErrorHandler from 'errors/errorHandler';
// import errorHandler from 'errorhandler';
// @ts-ignore
const app_1 = __importDefault(require("./app"));
// import path from "path";
// let options = {};
// console.log(`Node env is: ${process.env.NODE_ENV}`);
// options.path = path.resolve(process.cwd(), '.env');
// const dotenv = require('dotenv');
// dotenv.config(options);
// app.use(errorHandler(customErrorHandler));
const server = app_1.default.listen(app_1.default.get("port"), () => {
    console.log("App is running at http://localhost:%d in %s mode", app_1.default.get("port"), app_1.default.get("env"));
    console.log("Press CTRL-C to stop\n");
});
exports.default = server;
//# sourceMappingURL=server.js.map