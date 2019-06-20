let EmployerRouter = artifacts.require("router/EmployeeRouter.sol");
let TagRouter = artifacts.require("router/TagRouter.sol");
let WorkingOrderRouter = artifacts.require("router/WorkingOrderRouter.sol");
let WorkStationEmployeeRouter = artifacts.require("router/WorkStationEmployeeRouter.sol");
let WorkStationRouter = artifacts.require("router/WorkStationRouter.sol");


module.exports = function (deployer) {
    deployer.deploy(EmployerRouter);
    deployer.deploy(TagRouter);
    deployer.deploy(WorkingOrderRouter);
    deployer.deploy(WorkStationEmployeeRouter);
    deployer.deploy(WorkStationRouter);
};