pragma solidity ^0.5.9;

import "./Tag.sol";

contract WorkingOrder {

    address manager;

    struct workingOrder {
        uint id;
        tag[] inputTags;
        tag outputTag;
        string status;
        string status_description;
    }

    event CreatedWorkingOrder(
        workingOrder _value
    );

    event UpdatedWorkingOrder(
        workingOrder _value
    );

    constructor(uint memory _id, tag[] memory _inputTags, tag memory _outputTag, string memory _status, string memory _status_description) {
        manager = _sender;
        workingOrder({
            id : _id,
            description : _description_,
            active : _active
            });

        emit CreatedTag(workingOrder);
    }

    function update(uint memory _id, string memory _description, bool memory _active) onlyOwner {
        workingOrder({
            id : _id,
            description : _description,
            active : _active
            });

        emit UpdatedTag(workingOrder);
    }

}
