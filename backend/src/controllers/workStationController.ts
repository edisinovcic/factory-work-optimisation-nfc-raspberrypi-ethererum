import { BaseController } from "./baseController";
import { WorkStation } from "../model/workStation";

export class WorkStationController implements BaseController {
    getAllContents() {
        throw new Error("Method not implemented.");
    }
    getByAddress(address: string) {
        throw new Error("Method not implemented.");
    }
    getAll(): WorkStation[] {
        let workStation;

        return workStation;
    }

    getByID(id: number): WorkStation {
        let workStation;

        return workStation;
    }

    create(workStation: WorkStation): WorkStation {


        return workStation;
    }

    update(id: number, workStation: WorkStation): WorkStation {


        return workStation;
    }

}