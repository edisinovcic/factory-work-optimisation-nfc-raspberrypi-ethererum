import { BaseController } from "./baseController";
import { WorkStationEmployee } from "../model/workStationEmployee";

export class WorkStationEmployeeController implements BaseController {
    getAllContents() {
        throw new Error("Method not implemented.");
    }
    getByAddress(address: string) {
        throw new Error("Method not implemented.");
    }
    getAll(): WorkStationEmployee[] {
        let workStationEmployee;

        return workStationEmployee;
    }

    getByID(id: number): WorkStationEmployee {
        let workStationEmployee;

        return workStationEmployee;
    }

    create(workStationEmployee: WorkStationEmployee): WorkStationEmployee {


        return workStationEmployee;
    }

    update(id: number, workStationEmployee: WorkStationEmployee): WorkStationEmployee {


        return workStationEmployee;
    }

}