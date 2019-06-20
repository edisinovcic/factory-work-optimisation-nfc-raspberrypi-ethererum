pragma solidity ^0.5.9;
pragma experimental ABIEncoderV2;

import "../entity/WorkStation.sol";

contract WorkStationRouter {

    address manager;

    constructor() public {
        manager = msg.sender;
    }

    modifier onlyOwner() {
        require(manager == msg.sender, "Ownable: caller is not the owner");
        _;
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

}