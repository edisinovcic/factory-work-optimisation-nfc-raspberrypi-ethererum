pragma solidity ^0.5.9;
pragma experimental ABIEncoderV2;

import "./Tag.sol";

contract WorkingOrder {

    address manager;
    workingOrder public workingOrderData;

    struct workingOrder {
        string id;
        address[] inputTags;
        address outputTag;
        string status;
        string statusDescription;
    }

    modifier onlyOwner() {
        require(manager == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    event CreatedWorkingOrder(
        workingOrder _value
    );

    event UpdatedWorkingOrder(
        workingOrder _value
    );

    constructor(string memory _id, address[] memory _inputTags, address _outputTag, string memory _status, string memory _statusDescription) public {
        manager = msg.sender;
        workingOrderData = workingOrder({
            id : _id,
            inputTags : _inputTags,
            outputTag : _outputTag,
            status: _status,
            statusDescription: _statusDescription
            });

        emit CreatedWorkingOrder(workingOrderData);
    }

    function update(string memory _id, address[] memory _inputTags, address _outputTag, string memory _status, string memory _statusDescription) public onlyOwner {
        workingOrderData = workingOrder({
            id : _id,
            inputTags : _inputTags,
            outputTag : _outputTag,
            status: _status,
            statusDescription: _statusDescription
            });


        emit UpdatedWorkingOrder(workingOrderData);
    }

    function getWorkingOrderData() public view returns(workingOrder memory) {
        return workingOrderData;
    }

}
