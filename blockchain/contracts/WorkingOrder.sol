pragma solidity ^0.5.9;

import "./Tag.sol";

contract WorkingOrder {

    address manager;
    workingOrder public workingOrderData;

    struct workingOrder {
        uint id;
        tag[] inputTags;
        tag outputTag;
        string status;
        string statusDescription;
    }

    event CreatedWorkingOrder(
        workingOrder _value
    );

    event UpdatedWorkingOrder(
        workingOrder _value
    );

    constructor(uint memory _id, tag[] memory _inputTags, tag memory _outputTag, string memory _status, string memory _statusDescription) public {
        manager = _sender;
        workingOrderData = workingOrder({
            id : _id,
            inputTags : _inputTags,
            outputTag : _outputTag,
            status: _status,
            statusDescription: _statusDescription
            });

        emit CreatedTag(workingOrderData);
    }

    function update(uint memory _id, tag[] memory _inputTags, tag memory _outputTag, string memory _status, string memory _statusDescription) public onlyOwner {
         workingOrderData = workingOrder({
            id : _id,
            inputTags : _inputTags,
            outputTag : _outputTag,
            status: _status,
            statusDescription: _statusDescription
            });


        emit UpdatedTag(workingOrderData);
    }

    function getWorkingOrderData() public view returns(WorkingOrder memory) {
        return workingOrderData;
    }

}
