pragma solidity ^0.5.9;

//WORK_STATION_EMPLOYEE:
//- id_employee:uint
//- id_work_station:uint
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
        uint employeeID;
        uint workStationID;
        string timeStart;
        string timeEnd;
    }

    event CreatedWorkStationEmployee(workStationEmployee _value);
    event UpdatedWorkStationEmployee(workStationEmployee _value);
    event DeletedWorkStationEmployee(workStationEmployee _value);

    constructor(uint _employeeID, uint _workStationID, string memory _timeStart, string memory _timeEnd) public {
        manager = msg.sender;
        workStationEmployeeData = workStationEmployee({
            employeeID : _employeeID,
            workStationID : _workStationID,
            timeStart : _timeStart,
            timeEnd : _timeEnd
            });

        emit CreatedWorkStationEmployee(workStationEmployeeData);
    }

    function update(uint _employeeID, uint _workStationID, string memory _timeStart, string memory _timeEnd) public onlyOwner {
        workStationEmployeeData = workStationEmployeeData({
            employeeID : _employeeID,
            workStationID : _workStationID,
            timeStart : _timeStart,
            timeEnd : _timeEnd
            });

        emit UpdatedWorkStationEmployee(workStationEmployeeData);
    }

    function getWorkStationEmployeeData() public view returns(workStationEmployee memory) {
        return workStationEmployeeData;
    }

}
