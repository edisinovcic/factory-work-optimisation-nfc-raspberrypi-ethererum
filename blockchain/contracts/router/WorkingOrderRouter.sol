pragma solidity ^0.5.9;
pragma experimental ABIEncoderV2;

import './Tag.sol';
import "./WorkingOrder.sol";

contract WorkingOrderRouter {

    address manager;

    constructor() public {
        manager = msg.sender;
    }

    modifier onlyOwner() {
        require(manager == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    //=================================================================================
    // WorkingOrder handler
    //=================================================================================

    mapping(address => WorkingOrder) private workingOrders;
    mapping(uint => address) private workingOrderIDs;
    address[] private workingOrderList;

    event CreatedWorkingOrder(WorkingOrder workOrder);
    event UpdatedWorkingOrder(WorkingOrder workOrder);
    event DeletedWorkingOrder(WorkingOrder workOrder);

    modifier workingOrderExists(address _address){
        require(workingOrders[_address].getWorkingOrderData().id != 0, 'Working order has to exist!');
        _;
    }

    function addNewWorkingOrder(uint _id, Tag.tag[] memory _inputTags, Tag.tag memory _outputTag, string memory _status, string memory _statusDescription) public onlyOwner {
        WorkingOrder workingOrder = new WorkingOrder(_id, _inputTags, _outputTag, _status, _statusDescription);
        address workingOrderAddress = address(workingOrder);
        workingOrderList.push(workingOrderAddress) - 1;
        workingOrders[workingOrderAddress] = workingOrder;
        workingOrderIDs[_id] = workingOrderAddress;
        emit CreatedWorkingOrder(workingOrder);
    }

    function updateWorkingOrder(address _address, uint _id, Tag.tag[] memory _inputTags, Tag.tag memory _outputTag, string memory _status, string memory _statusDescription) public workingOrderExists(_address) onlyOwner {
        WorkingOrder workingOrder = workingOrders[_address];
        address workingOrderAddress = address(workingOrder);
        workingOrder.update(_id, _inputTags, _outputTag, _status, _statusDescription);
        workingOrders[workingOrderAddress] = workingOrder;
        workingOrderIDs[_id] = workingOrderAddress;
        emit UpdatedWorkingOrder(workingOrder);
    }

    function getAllWorkingOrders() public view returns (address[] memory)  {
        return workingOrderList;
    }

    function getWorkingOrderByAddress(address _address) public view returns (WorkingOrder.workingOrder memory){
        return workingOrders[_address].getWorkingOrderData();
    }

    function getWorkingOrderById(uint _id) public view returns (WorkingOrder.workingOrder memory) {
        return workingOrders[workingOrderIDs[_id]].getWorkingOrderData();
    }

    function countWorkingOrders() public view returns (uint) {
        return workingOrderList.length;
    }
}