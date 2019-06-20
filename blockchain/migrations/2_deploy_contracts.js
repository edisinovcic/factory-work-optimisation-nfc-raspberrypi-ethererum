let EmployerRouter = artifacts.require("./router/EmployerRouter.sol");

module.exports = function (deployer) {
    deployer.deploy(EmployerRouter)
};