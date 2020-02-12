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
        string id;
        bool active;
        string description;
    }

    event CreatedTag(
        tag _value
    );

    event UpdatedTag(
        tag _value
    );

    constructor(string memory _id, bool _active, string memory _description) public {
        manager = msg.sender;
        tagData = tag({
            id : _id,
            active : _active,
            description : _description
            });

        emit CreatedTag(tagData);
    }

    function update(string memory _id, bool _active, string memory _description) public onlyOwner {
        tagData = tag({
            id : _id,
            active : _active,
            description : _description
            });

        emit UpdatedTag(tagData);
    }

    function getTagData() public view returns(tag memory) {
        return tagData;
    }

}
