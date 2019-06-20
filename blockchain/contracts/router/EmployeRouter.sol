pragma solidity ^0.5.9;
pragma experimental ABIEncoderV2;

import "./Employee.sol";

contract EmployeeRouter {

    //=================================================================================
    // Employee handler
    //=================================================================================

    mapping(address => Employee) private employees;
    mapping(uint => adress) private employeeIDs;
    address[] private employeeList;

    event CreatedTag(Employee employee);
    event UpdatedTag(Employee employee);
    event DeletedTag(Employee employee);

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
        employee.update(_id, _active, _skills);
        employees[_address] = employee;
        employeeIDs[address(employee)] = 0; //Remove old reference
        employeeIDs[_id] = employeeAddress;
    }

    function getAllEmployees() public view returns (address[] memory)  {
        return employeeList;
    }

    function getEmployeeByAddress(address _address) public view returns (Employee.employee memory){
        return employees[_address].getEmployeeData();
    }

    function getEmployeeById(uint _id) public view returns (Employee.employee memory) {
        return employeeIDs[_id].getEmployeeData();
    }

    function countEmployees() public view returns (uint) {
        return employeeList.length;
    }
}