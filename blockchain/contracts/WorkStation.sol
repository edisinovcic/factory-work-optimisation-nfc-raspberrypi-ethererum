pragma solidity ^0.5.9;

contract WorkStation {

    address manager;

    struct workStation {
        uint id;
        string description;
        bool active;
    }

    event CreatedWorkStation(
        workStation _value
    );

    event UpdatedWorkStation(
        workStation _value
    );

    constructor(uint memory _id, string memory _description_, bool memory _active) {
        manager = _sender;
        workStation({
            id : _id,
            description : _description_,
            active : _active
            });

        emit CreatedWorkStation(workStation);
    }

    function update(uint memory _id, string memory _description, bool memory _active) onlyOwner {
        workStation({
            id : _id,
            description : _description,
            active : _active
            });

        emit UpdatedWorkStation(workStation);
    }
}
