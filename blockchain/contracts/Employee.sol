pragma solidity ^0.5.9;
pragma experimental ABIEncoderV2;

contract Employee {

    address manager;
    employee public employeeData;

    modifier onlyOwner() {
        require(manager == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    struct employee {
        uint id;
        bool active;
        string skills;
    }

    event CreatedEmployee(
        employee _value
    );

    event UpdatedEmployee(
        employee _value
    );

    constructor(uint _id, bool _active, string memory _skills) public {
        manager = msg.sender;
        employeeData = employee({
            id : _id,
            active : _active,
            skills : _skills
            });

        emit CreatedEmployee(employeeData);
    }

    function update(uint _id, bool _active, string memory _skills) public onlyOwner {
        employeeData = employee({
            id : _id,
            active : _active,
            skills : _skills
            });
        emit UpdatedEmployee(employeeData);
    }

    function getEmployeeData() public view returns (employee memory) {
        return employeeData;
    }
}
