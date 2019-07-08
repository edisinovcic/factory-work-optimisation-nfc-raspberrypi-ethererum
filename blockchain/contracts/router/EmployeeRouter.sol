pragma solidity ^0.5.9;
pragma experimental ABIEncoderV2;

import "../entity/Employee.sol";

contract EmployeeRouter {

    address manager;

    modifier onlyOwner() {
        require(manager == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    constructor() public {
        manager = msg.sender;
    }

    //=================================================================================
    // Employee handler
    //=================================================================================

    mapping(address => Employee) private employees;
    mapping(uint => address) private employeeIDs;
    address[] private employeeList;

    event CreatedEmployee(Employee employee);
    event UpdatedEmployee(Employee employee);
    event DeletedEmployee(Employee employee);


    modifier employeeExists(address _address){
        require(employees[_address].getEmployeeData().id != 0, 'Employee has to exist!');
        _;
    }

    function addNewEmployee(uint _id, bool _active, string memory _skills) public onlyOwner {
        Employee employee = new Employee(_id, _active, _skills);
        address employeeAddress = address(employee);
        employeeList.push(employeeAddress) - 1;
        employees[employeeAddress] = employee;
        employeeIDs[_id] = employeeAddress;
        emit CreatedEmployee(employee);
    }

    function updateEmployee(address _address, uint _id, bool _active, string memory _skills) public employeeExists(_address) onlyOwner {
        Employee employee = employees[_address];
        uint oldID = employee.getEmployeeData().id;
        address employeeAddress = address(employee);
        employee.update(_id, _active, _skills);
        employees[_address] = employee;
        employeeIDs[oldID] = address(0); //Remove old reference
        employeeIDs[_id] = employeeAddress;
        emit UpdatedEmployee(employee);
    }

    function getAllEmployees() public view returns (address[] memory)  {
        return employeeList;
    }

    function getEmployeeByAddress(address _address) public view returns (Employee.employee memory){
        return employees[_address].getEmployeeData();
    }

    function getEmployeeById(uint _id) public view returns (Employee.employee memory) {
        return employees[employeeIDs[_id]].getEmployeeData();
    }

    function countEmployees() public view returns (uint) {
        return employeeList.length;
    }
}