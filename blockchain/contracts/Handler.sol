pragma solidity ^0.5.9;
pragma experimental ABIEncoderV2;

import "./router/EmployeeRouter.sol";
import "./router/TagRouter.sol";
import "./router/WorkingOrderRouter.sol";
import "./router/WorkStationRouter.sol";
import "./router/WorkStationEmployeeRouter.sol";


//TODO: exceedes maximum gas limit that can be used to deploy contract :) Will not be used.
contract Handler is EmployeeRouter, TagRouter, WorkingOrderRouter, WorkStationEmployeeRouter, WorkStationRouter {

    address manager;

    constructor() public {
        manager = msg.sender;
    }

    modifier onlyOwner() {
        require(manager == msg.sender, "Ownable: caller is not the owner");
        _;
    }

}