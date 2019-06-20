pragma solidity ^0.5.9;
pragma experimental ABIEncoderV2;

import './Tag.sol';
import "./Employee.sol";
import "./WorkStation.sol";

contract Handler {

    address manager;

    constructor() public {
        manager = msg.sender;
    }

    modifier onlyOwner() {
        require(manager == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    //=================================================================================
    // Employee handler
    //=================================================================================

    mapping(address => Employee) private employees;
    address[] private employeeList;

    event CreatedTag(Employee employee);
    event UpdatedTag(Employee employee);
    event DeletedTag(Employee employee);

    modifier employeeExists(address _address){
        require(employees[_address].getEmployeeData().id != 0);
        _;
    }

    function addNewEmployee(uint _id, bool _active, string memory _skills) public onlyOwner {
        Employee employee = new Employee(_id, _active, _skills);
        address employeeAddress = address(employee);
        employeeList.push(employeeAddress) - 1;
        employees[employeeAddress] = employee;
        emit CreatedEmployee(employee);
    }

    function updateEmployee(address _address, uint _id, bool _active, string memory _skills) public employeeExists(_address) onlyOwner {
        Employee employee = employees[_address];
        employee.update(_id, _active, _skills);
        employees[_address] = employee;
    }

    function getAllEmployees() public view returns (address[] memory)  {
        return employeeList;
    }

    function getEmployeeByAddress(address _address) public view returns (Employee.employee memory){
        return employees[_address].getEmployeeData();
    }

    function countEmployees() view public returns (uint) {
        return employeeList.length;
    }


    //=================================================================================
    //Tag handler
    //=================================================================================

    mapping(address => Tag) private tags;
    address[] private tagList;

    event CreatedTag(Tag tag);
    event UpdatedTag(Tag tag);
    event DeletedTag(Tag tag);

    modifier tagExists(address _address){
        require(tags[_address].getTagData().id != 0);
        _;
    }

    function addNewTag(uint _id, string memory _description, bool _active) public onlyOwner {
        Tag tag = new Tag(_id, _description, _active);
        address tagAddress = address(tag);
        tagList.push(tagAddress) - 1;
        tags[tagAddress] = tag;
        emit CreatedTag(tag);
    }

    function updateTag(address _address, uint _id, string memory _description, bool _active) public tagExists(_address) onlyOwner {
        Tag tag = tags[_address];
        tag.update(_id, _description, _active);
        tags[_address] = tag;
        emit UpdatedTag(tag);
    }

    function getAllTags() public view returns (address[] memory)  {
        return tagList;
    }

    function getTagByAddress(address _address) public view returns (Tag.tag memory){
        return tags[_address].getTagData();
    }

    function countTags() view public returns (uint) {
        return tagList.length;
    }


    //=================================================================================
    // WorkStation handler
    //=================================================================================

    mapping(address => WorkStation) private workStations;
    address[] private workStationList;

    event CreatedWorkStation(WorkStation workStation);
    event UpdatedWorkStation(WorkStation workStation);
    event DeletedWorkStation(WorkStation workStation);

    modifier workStationExists(address _address){
        require(workStations[_address].getWorkStationData().id != 0);
        _;
    }

    function addNewWorkStation(uint _id, string memory _description, bool _active) public onlyOwner {
        WorkStation workStation = new WorkStation(_id, _description, _active);
        address workStationAddress = address(workStation);
        workStationList.push(workStationAddress) - 1;
        workStations[workStationAddress] = workStation;
        emit CreatedWorkStation(workStation);
    }

    function updateWorkStation(address _address, uint _id, string memory _description, bool _active) public tagExists(_address) onlyOwner {
        Tag tag = tags[_address];
        tag.update(_id, _description, _active);
        tags[_address] = tag;
        emit UpdatedWorkStation(workStation);
    }

    function getAllWorkStations() public view returns (address[] memory)  {
        return workStationList;
    }

    function getWorkStationByAddress(address _address) public view returns (Tag.tag memory){
        return workStations[_address].getWorkStationData();
    }

    function countWorkStations() view public returns (uint) {
        return workStationList.length;
    }


    //=================================================================================
    // WorkingOrder handler
    //=================================================================================


    //=================================================================================
    // WorkStationEmployee handler
    //=================================================================================

}