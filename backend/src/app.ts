// import customErrorHandler from 'errors/errorHandler';
// import errorHandler from 'errorhandler';
import express from "express";
import compression from "compression"; // compresses requests
import bodyParser from "body-parser";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env")});

// Load employee blockchain data
const employeeRouterData = require("../../blockchain/build/contracts/EmployeeRouter.json");
global.employeeData = {
    contractAddress: employeeRouterData.networks[process.env.NETWORK_ID].address,
    abi: JSON.stringify(employeeRouterData.abi)
};

// Load tag data



// Routes (route handlers)
import tagRouter from "./routes/tag";
import employeeRouter from "./routes/employee";

const app = express();

// Express configuration
const port = process.env.PORT || 3000;
const environment = process.env;
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Routes
app.use("/api/tag", tagRouter);
app.use("/api/employee", employeeRouter);


// app.use(errorHandler(customErrorHandler));
app.listen(("port"), () => {
    console.log(
        "App is running at http://localhost:%d in %s mode",
        port,
        environment
    );
    console.log("Press CTRL-C to stop\n");
});

export default app;
