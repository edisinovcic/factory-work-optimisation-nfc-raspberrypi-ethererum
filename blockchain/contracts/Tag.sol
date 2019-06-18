pragma solidity ^0.5.9;

contract Tag {

    address manager;

    struct tag {
        uint id;
        string description;
        bool active;
    }

    event CreatedTag(
        tag _value
    );

    event UpdatedTag(
        tag _value
    );

    constructor(uint memory _id, string memory _description_, bool memory _active) {
        manager = _sender;
        tag({
            id : _id,
            description : _description_,
            active : _active
            });

        emit CreatedTag(tag);
    }

    function update(uint memory _id, string memory _description, bool memory _active) onlyOwner {
        tag({
            id : _id,
            description : _description,
            active : _active
            });

        emit UpdatedTag(tag);
    }

}
