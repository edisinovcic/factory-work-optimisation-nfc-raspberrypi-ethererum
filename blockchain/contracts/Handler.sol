pragma solidity ^0.5.9;
pragma experimental ABIEncoderV2;

import './Tag.sol';

contract Handler {

    address manager;

    constructor() public {
        manager = msg.sender;
    }

    modifier onlyOwner() {
        require(manager == msg.sender, "Ownable: caller is not the owner");
        _;
    }


    //Tag part

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
        tags[_address]=tag;
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

}