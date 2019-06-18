pragma solidity ^0.5.9;

contract Employee {

    address manager;

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

    constructor(uint memory _id, bool memory _active, string memory _skills) {
        manager = _sender;
        employee({
            id : _id,
            active : _active,
            skills : _skills
            });

        emit CreatedEmployee(employee);
    }

    function update(uint memory _id, bool memory _active, string memory _skills) onlyOwner {
        employee({
            id : _id,
            active : _active,
            skills : _skills
            });


        emit UpdatedEmployee(employee);
    }
}
