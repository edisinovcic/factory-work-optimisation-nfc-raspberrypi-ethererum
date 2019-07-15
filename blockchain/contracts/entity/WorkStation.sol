pragma solidity ^0.5.9;
pragma experimental ABIEncoderV2;

contract WorkStation {

    address manager;
    workStation public workStationData;

    struct workStation {
        string id;
        string description;
        bool active;
    }

    modifier onlyOwner() {
        require(manager == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    event CreatedWorkStation(
        workStation _value
    );

    event UpdatedWorkStation(
        workStation _value
    );

    constructor(string memory _id, string memory _description_, bool _active) public {
        manager = msg.sender;
        workStationData = workStation({
            id : _id,
            description : _description_,
            active : _active
            });

        emit CreatedWorkStation(workStationData);
    }

    function update(string memory _id, string memory _description, bool _active) public onlyOwner {
        workStationData = workStation({
            id : _id,
            description : _description,
            active : _active
            });

        emit UpdatedWorkStation(workStationData);
    }

    function getWorkStationData() public view returns(workStation memory) {
        return workStationData;
    }
}
