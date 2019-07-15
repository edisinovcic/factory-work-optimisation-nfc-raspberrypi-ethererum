pragma solidity ^0.5.9;
pragma experimental ABIEncoderV2;

import '../entity/Tag.sol';

contract TagRouter {

    address manager;

    constructor() public {
        manager = msg.sender;
    }

    modifier onlyOwner() {
        require(manager == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    //=================================================================================
    //Tag handler
    //=================================================================================

    mapping(address => Tag) private tags;
    mapping(string => address) private tagIDs;
    address[] private tagList;

    event CreatedTag(Tag tag);
    event UpdatedTag(Tag tag);
    event DeletedTag(Tag tag);

    modifier tagExists(address _address){
        require(bytes(tags[_address].getTagData().id).length != 0, 'Tag has to exist!');
        _;
    }

    function addNewTag(string memory _id, bool _active, string memory _description) public onlyOwner {
        Tag tag = new Tag(_id, _active, _description);
        address tagAddress = address(tag);
        tagList.push(tagAddress) - 1;
        tags[tagAddress] = tag;
        tagIDs[_id] = tagAddress;
        emit CreatedTag(tag);
    }

    function updateTag(address _address, string memory _id, bool _active, string memory _description) public tagExists(_address) onlyOwner {
        Tag tag = tags[_address];
        address tagAddress = address(tag);
        tag.update(_id, _active, _description);
        tags[_address] = tag;
        tagIDs[_id] = tagAddress;
        emit UpdatedTag(tag);
    }

    function getAllTags() public view returns (address[] memory)  {
        return tagList;
    }

    function getTagByAddress(address _address) public view returns (Tag.tag memory){
        return tags[_address].getTagData();
    }

    function getTagById(string memory _id) public view returns (Tag.tag memory){
        return tags[tagIDs[_id]].getTagData();
    }

    function countTags() public view returns (uint) {
        return tagList.length;
    }
}
