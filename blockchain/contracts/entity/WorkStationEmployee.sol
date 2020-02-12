pragma solidity ^0.5.9;
pragma experimental ABIEncoderV2;

//WORK_STATION_EMPLOYEE:
//- id:uint
//- employeeAddress:address
//- workStationAddress:address
//- time_start:string
//- time_end:string
//- status:bool (active/inactive)

contract WorkStationEmployee {

    address manager;
    workStationEmployee public workStationEmployeeData;

    modifier onlyOwner() {
        require(manager == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    struct workStationEmployee {
        string id;
        address employeeAddress;
        address workStationAddress;
        string timeStart;
        string timeEnd;
    }

    event CreatedWorkStationEmployee(workStationEmployee _value);
    event UpdatedWorkStationEmployee(workStationEmployee _value);
    event DeletedWorkStationEmployee(workStationEmployee _value);

    constructor(string memory _id, address _employeeAddress, address _workStationAddress, string memory _timeStart, string memory _timeEnd) public {
        manager = msg.sender;
        workStationEmployeeData = workStationEmployee({
            id: _id,
            employeeAddress : _employeeAddress,
            workStationAddress : _workStationAddress,
            timeStart : _timeStart,
            timeEnd : _timeEnd
            });

        emit CreatedWorkStationEmployee(workStationEmployeeData);
    }

    function update(string memory _id, address _employeeAddress, address _workStationAddress, string memory _timeStart, string memory _timeEnd) public onlyOwner {
        workStationEmployeeData = workStationEmployee({
            id: _id,
            employeeAddress : _employeeAddress,
            workStationAddress : _workStationAddress,
            timeStart : _timeStart,
            timeEnd : _timeEnd
            });

        emit UpdatedWorkStationEmployee(workStationEmployeeData);
    }

    function getWorkStationEmployeeData() public view returns(workStationEmployee memory) {
        return workStationEmployeeData;
    }

}
