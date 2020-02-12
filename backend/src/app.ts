// import customErrorHandler from 'errors/errorHandler';
// import errorHandler from 'errorhandler';
import express from "express";
import compression from "compression"; // compresses requests
import bodyParser from "body-parser";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env")});

const app = express();

// Express configuration
const port = process.env.PORT || 3000;
const environment = process.env;
app.set("port", port);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Load employee blockchain data
const employeeData = require("../../blockchain/build/contracts/EmployeeRouter.json");
const employeeInstanceData = require("../../blockchain/build/contracts/Employee.json");
global.employeeData = {
    contractAddress: employeeData.networks[process.env.NETWORK_ID].address,
    abi: JSON.stringify(employeeData.abi),
    instanceAbi: JSON.stringify(employeeInstanceData.abi)
};

// Load tag data
const tagData = require("../../blockchain/build/contracts/TagRouter.json");
const tagInstanceData = require("../../blockchain/build/contracts/Tag.json");
global.tagData = {
    contractAddress: tagData.networks[process.env.NETWORK_ID].address,
    abi: JSON.stringify(tagData.abi),
    instanceAbi: JSON.stringify(tagInstanceData.abi)
};

// Load workingOrder data
const workingOrderData = require("../../blockchain/build/contracts/WorkingOrderRouter.json");
const workingOrderInstanceData = require("../../blockchain/build/contracts/WorkingOrder.json");
global.workingOrderData = {
    contractAddress: workingOrderData.networks[process.env.NETWORK_ID].address,
    abi: JSON.stringify(workingOrderData.abi),
    instanceAbi: JSON.stringify(workingOrderInstanceData.abi)
};

// Load workStation data
const workStationData = require("../../blockchain/build/contracts/WorkStationRouter.json");
const workStationInstanceData = require("../../blockchain/build/contracts/WorkStation.json");
global.workStationData = {
    contractAddress: workStationData.networks[process.env.NETWORK_ID].address,
    abi: JSON.stringify(workStationData.abi),
    instanceAbi: JSON.stringify(workStationInstanceData.abi)
};

// Load workStationEmployee data
const workStationEmployeeData = require("../../blockchain/build/contracts/WorkingOrderRouter.json");
const workStationEmployeeInstanceData = require("../../blockchain/build/contracts/WorkingOrder.json");
global.workStationEmployeeData = {
    contractAddress: workStationEmployeeData.networks[process.env.NETWORK_ID].address,
    abi: JSON.stringify(workStationEmployeeData.abi),
    instanceAbi: JSON.stringify(workStationEmployeeInstanceData.abi)
};

// Routes (route handlers)
import employeeRouter from "./routes/employee";
import tagRouter from "./routes/tag";
import workingOrderRouter from "./routes/workingOrder";
import workStationRouter from "./routes/workStationRouter";
import workStationEmployeeRouter from "./routes/workStationEmployeeRouter";

// Routes
app.use("/api/employee", employeeRouter);
app.use("/api/tag", tagRouter);
app.use("/api/workingOrder", workingOrderRouter);
app.use("/api/workStation", workStationRouter);
app.use("/api/workStationEmployee", workStationEmployeeRouter);

// Error handling
import errorMiddleware from "./middleware/errorMiddelware";
app.use(errorMiddleware);

app.listen(port, () => {
    console.log(
        "App is running at http://localhost:%d in %s mode",
        port,
        environment
    );
    console.log("Press CTRL-C to stop\n");
});

export default app;
