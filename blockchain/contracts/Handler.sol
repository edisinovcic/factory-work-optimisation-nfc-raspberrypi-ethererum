pragma solidity ^0.5.9;
pragma experimental ABIEncoderV2;

import './Tag.sol';
import "./Employee.sol";
import "./WorkStation.sol";
import './EmployeeRouter.sol';

contract Handler is EmployeeRouter {

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
    mapping(uint => address) private tagIDs;
    address[] private tagList;

    event CreatedTag(Tag tag);
    event UpdatedTag(Tag tag);
    event DeletedTag(Tag tag);

    modifier tagExists(address _address){
        require(tags[_address].getTagData().id != 0, 'Tag has to exist!');
        _;
    }

    function addNewTag(uint _id, string memory _description, bool _active) public onlyOwner {
        Tag tag = new Tag(_id, _description, _active);
        address tagAddress = address(tag);
        tagList.push(tagAddress) - 1;
        tags[tagAddress] = tag;
        tagIDs[_id] = tagAddress;
        emit CreatedTag(tag);
    }

    function updateTag(address _address, uint _id, string memory _description, bool _active) public tagExists(_address) onlyOwner {
        Tag tag = tags[_address];
        address tagAddress = address(tag);
        tag.update(_id, _description, _active);
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

    function getTagById(uint _id) public view returns (Tag.tag memory){
        return tags[tagIDs[_id]].getTagData();
    }

    function countTags() public view returns (uint) {
        return tagList.length;
    }


    //=================================================================================
    // WorkStation handler
    //=================================================================================

    mapping(address => WorkStation) private workStations;
    mapping(uint => address) private workStationIDs;
    address[] private workStationList;

    event CreatedWorkStation(WorkStation workStation);
    event UpdatedWorkStation(WorkStation workStation);
    event DeletedWorkStation(WorkStation workStation);

    modifier workStationExists(address _address){
        require(workStations[_address].getWorkStationData().id != 0, 'Work station has to exist!');
        _;
    }

    function addNewWorkStation(uint _id, string memory _description, bool _active) public onlyOwner {
        WorkStation workStation = new WorkStation(_id, _description, _active);
        address workStationAddress = address(workStation);
        workStationList.push(workStationAddress) - 1;
        workStations[workStationAddress] = workStation;
        workStationIDs[_id] = workStationAddress;
        emit CreatedWorkStation(workStation);
    }

    function updateWorkStation(address _address, uint _id, string memory _description, bool _active) public workStationExists(_address) onlyOwner {
        WorkStation workStation = workStations[_address];
        address workStationAddress = address(workStation);
        workStation.update(_id, _description, _active);
        workStations[workStationAddress] = workStation;
        workStationIDs[_id] = workStationAddress;
        emit UpdatedWorkStation(workStation);
    }

    function getAllWorkStations() public view returns (address[] memory)  {
        return workStationList;
    }

    function getWorkStationByAddress(address _address) public view returns (WorkStation.workStation memory){
        return workStations[_address].getWorkStationData();
    }

    function getWorkStationById(uint _id) public view returns (WorkStation.workStation memory) {
        return workStations[workStationIDs[_id]].getWorkStationData();
    }

    function countWorkStations() public view returns (uint) {
        return workStationList.length;
    }


    //=================================================================================
    // WorkingOrder handler
    //=================================================================================


    //=================================================================================
    // WorkStationEmployee handler
    //=================================================================================

}