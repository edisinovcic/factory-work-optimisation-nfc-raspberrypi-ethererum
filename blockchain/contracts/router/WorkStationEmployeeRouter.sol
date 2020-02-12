pragma solidity ^0.5.9;
pragma experimental ABIEncoderV2;

import "../entity/WorkStationEmployee.sol";

contract WorkStationEmployeeRouter {

    address manager;

    constructor() public {
        manager = msg.sender;
    }

    modifier onlyOwner() {
        require(manager == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    //=================================================================================
    // WorkStationEmployee handler
    //=================================================================================

    mapping(address => WorkStationEmployee) private workStationEmployees;
    mapping(string => address) private workStationEmployeeIDs;
    address[] private workStationEmployeeList;

    event CreatedWorkStationEmployee(WorkStationEmployee workStationEmployee);
    event UpdatedWorkStationEmployee(WorkStationEmployee workStationEmployee);
    event DeletedWorkStationEmployee(WorkStationEmployee workStationEmployee);

    modifier workStationEmployeeExists(address _address){
        require(workStationEmployees[_address].getWorkStationEmployeeData().employeeAddress != address(0), 'Work station employee has to exist!');
        _;
    }

    function addNewWorkStationEmployee(string memory _id, address _employeeAddress, address _workStationAddress, string memory _timeStart, string memory _timeEnd) public onlyOwner {
        WorkStationEmployee workStationEmployee = new WorkStationEmployee(_id, _employeeAddress, _workStationAddress, _timeStart, _timeEnd);
        address workStationEmployeeAddress = address(workStationEmployee);
        workStationEmployeeList.push(workStationEmployeeAddress) - 1;
        workStationEmployees[workStationEmployeeAddress] = workStationEmployee;
        workStationEmployeeIDs[_id] = workStationEmployeeAddress;
        emit CreatedWorkStationEmployee(workStationEmployee);
    }

    function updateWorkStationEmployee(address _address, string memory _id, address _employeeAddress, address _workStationAddress, string memory _timeStart, string memory _timeEnd) public workStationEmployeeExists(_address) onlyOwner {
        WorkStationEmployee workStationEmployee = workStationEmployees[_address];
        address workStationEmployeeAddress = address(workStationEmployee);
        workStationEmployee.update(_id, _employeeAddress, _workStationAddress, _timeStart, _timeEnd);
        workStationEmployees[workStationEmployeeAddress] = workStationEmployee;
        workStationEmployeeIDs[_id] = workStationEmployeeAddress;
        emit UpdatedWorkStationEmployee(workStationEmployee);
    }

    function getAllWorkStationEmployees() public view returns (address[] memory)  {
        return workStationEmployeeList;
    }

    function getWorkStationEmployeeByAddress(address _address) public view returns (WorkStationEmployee.workStationEmployee memory){
        return workStationEmployees[_address].getWorkStationEmployeeData();
    }

    function getWorkStationEmployeeById(string memory _id) public view returns (WorkStationEmployee.workStationEmployee memory) {
        return workStationEmployees[workStationEmployeeIDs[_id]].getWorkStationEmployeeData();
    }

    function countWorkStationEmployees() public view returns (uint) {
        return workStationEmployeeList.length;
    }

}