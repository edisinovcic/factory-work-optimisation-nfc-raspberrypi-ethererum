pragma solidity ^0.5.8;
pragma experimental ABIEncoderV2;

contract Employee {

    address manager;
    EmployeeStruct public employeeData;

    modifier onlyOwner() {
        require(manager == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    modifier mustBeActive(Employee _address) {
        require(_address.employeeData == 0, "Cannot update non existing Employee");
        _;
    }

    struct EmployeeStruct {
        bool active;
        string skills;
    }

    event CreatedEmployee(
        EmployeeStruct _value
    );

    event UpdatedEmployee(
        EmployeeStruct _valueemployeeData
    );

    constructor(bool _active, string memory _skills) public {
        manager = msg.sender;
        EmployeeStruct memory newEmployee = EmployeeStruct({
            active : _active,
            skills : _skills
            });

        emit CreatedEmployee(newEmployee);
    }

    function update(address _address, bool _active, string memory _skills) public onlyOwner mustBeActive(_address) {
        _address.active = _active;
        _address.skills = _skills;
        emit UpdatedEmployee(_address);
    }

    function getEmployee() public view returns(EmployeeStruct memory) {
        return employeeData;
    }
}
