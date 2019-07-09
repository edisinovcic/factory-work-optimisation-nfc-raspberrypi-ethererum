"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import customErrorHandler from 'errors/errorHandler';
// import errorHandler from 'errorhandler';
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression")); // compresses requests
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), ".env") });
// Load employee blockchain data
const employeeRouterData = require("../../blockchain/build/contracts/EmployeeRouter.json");
global.employeeData = {
    contractAddress: employeeRouterData.networks[process.env.NETWORK_ID].address,
    abi: JSON.stringify(employeeRouterData.abi)
};
// Load tag data
// Routes (route handlers)
const tag_1 = __importDefault(require("./routes/tag"));
const employee_1 = __importDefault(require("./routes/employee"));
const app = express_1.default();
// Express configuration
const port = process.env.PORT || 3000;
const environment = process.env;
app.set("port", process.env.PORT || 3000);
app.use(compression_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Routes
app.use("/api/tag", tag_1.default);
app.use("/api/employee", employee_1.default);
// app.use(errorHandler(customErrorHandler));
app.listen(("port"), () => {
    console.log("App is running at http://localhost:%d in %s mode", port, environment);
    console.log("Press CTRL-C to stop\n");
});
exports.default = app;
//# sourceMappingURL=app.js.map