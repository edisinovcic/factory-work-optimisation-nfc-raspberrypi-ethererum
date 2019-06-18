pragma solidity ^0.5.9;

import "./Tag.sol";

contract JobTicket {

    address manager;

    struct jobTicket {
        uint id;
        tag[] inputTags;
        tag outputTag;
        string status;
        string status_description;
    }

    event CreatedJobTicket(
        jobTicket _value
    );

    event UpdatedJobTicket(
        jobTicket _value
    );

    constructor(uint memory _id, tag[] memory _inputTags, tag memory _outputTag, string memory _status, string memory _status_description) {
        manager = _sender;
        jobTicket({
            id : _id,
            description : _description_,
            active : _active
            });

        emit CreatedTag(jobTicket);
    }

    function update(uint memory _id, string memory _description, bool memory _active) onlyOwner {
        jobTicket({
            id : _id,
            description : _description,
            active : _active
            });

        emit UpdatedTag(jobTicket);
    }

}
