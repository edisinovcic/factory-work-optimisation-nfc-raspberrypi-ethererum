pragma solidity ^0.5.9;
pragma experimental ABIEncoderV2;

import "../entity/WorkingOrder.sol";

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
    mapping(string => address) private workingOrderIDs;
    address[] private workingOrderList;

    event CreatedWorkingOrder(WorkingOrder workOrder);
    event UpdatedWorkingOrder(WorkingOrder workOrder);
    event DeletedWorkingOrder(WorkingOrder workOrder);

    modifier workingOrderExists(address _address){
        require(bytes(workingOrders[_address].getWorkingOrderData().id).length != 0, 'Working order has to exist!');
        _;
    }

    //"2",["0x5b0c9dc0afe417858dcc8db5269e47abc572aa77","0x5b0c9dc0afe417858dcc8db5269e47abc572aa77"],"0x5b0c9dc0afe417858dcc8db5269e47abc572aa77","test","test"
    function addNewWorkingOrder(string memory _id, address[] memory _inputTags, address _outputTag, string memory _status, string memory _statusDescription) public onlyOwner {
        WorkingOrder workingOrder = new WorkingOrder(_id, _inputTags, _outputTag, _status, _statusDescription);
        address workingOrderAddress = address(workingOrder);
        workingOrderList.push(workingOrderAddress) - 1;
        workingOrders[workingOrderAddress] = workingOrder;
        workingOrderIDs[_id] = workingOrderAddress;
        emit CreatedWorkingOrder(workingOrder);
    }

    //"0xBa15db8C8D9BF7857C58b550bcE9968014251a34","2",["0x5b0c9dc0afe417858dcc8db5269e47abc572aa77","0x5b0c9dc0afe417858dcc8db5269e47abc572aa77"],"0x5b0c9dc0afe417858dcc8db5269e47abc572aa77","test2","test2"
    function updateWorkingOrder(address _address, string memory _id, address[] memory _inputTags, address  _outputTag, string memory _status, string memory _statusDescription) public workingOrderExists(_address) onlyOwner {
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

    function getWorkingOrderById(string memory _id) public view returns (WorkingOrder.workingOrder memory) {
        return workingOrders[workingOrderIDs[_id]].getWorkingOrderData();
    }

    function countWorkingOrders() public view returns (uint) {
        return workingOrderList.length;
    }
}