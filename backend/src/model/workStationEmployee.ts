export class WorkStationEmployee {
    id: string;
    employeeAddress: string;
    workStationAddress: string;
    timeStart: string;
    timeEnd: string;

    constructor( _id: string, _employeeAddress: string, _workStationAddress: string, _timeStart: string, _timeEnd: string ) {
        this.id = _id;
        this.employeeAddress = _employeeAddress;
        this.workStationAddress = _workStationAddress;
        this.timeStart = _timeStart;
        this.timeEnd = _timeEnd;
    }

    fromObject() {
        return ( this.id, this.employeeAddress, this.workStationAddress, this.timeStart, this.timeEnd );
    }

    toObject( _id: string, _employeeAddress: string, _workStationAddress: string, _timeStart: string, _timeEnd: string ) {
        this.id = _id;
        this.employeeAddress = _employeeAddress;
        this.workStationAddress = _workStationAddress;
        this.timeStart = _timeStart;
        this.timeEnd = _timeEnd;
    }

}