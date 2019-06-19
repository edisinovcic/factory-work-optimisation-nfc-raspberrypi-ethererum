pragma solidity ^0.5.9;
pragma experimental ABIEncoderV2;


contract Tag {

    address manager;
    tag public tagData;

    modifier onlyOwner() {
        require(manager == msg.sender, "Ownable: caller is not the owner");
        _;
    }

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

    constructor(uint _id, string memory _description, bool _active) public {
        manager = msg.sender;
        tagData = tag({
            id : _id,
            description : _description,
            active : _active
            });

        emit CreatedTag(tagData);
    }

    function update(uint _id, string memory _description, bool _active) public onlyOwner {
        tagData = tag({
            id : _id,
            description : _description,
            active : _active
            });

        emit UpdatedTag(tagData);
    }

    function getTagData() public view returns(tag memory) {
        return tagData;
    }

}
