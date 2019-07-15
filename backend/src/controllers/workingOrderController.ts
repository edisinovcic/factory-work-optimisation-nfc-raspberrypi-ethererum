import { BaseController } from "./baseController";
import { WorkingOrder } from "../model/workingOrder";

export class WorkingOrderController implements BaseController {
    getAllContents() {
        throw new Error("Method not implemented.");
    }
    getByAddress(address: string) {
        throw new Error("Method not implemented.");
    }
    getAll(): WorkingOrder[] {
        let workingOrder;

        return workingOrder;
    }

    getByID(id: number): WorkingOrder {
        let workingOrder;

        return workingOrder;
    }

    create(workingOrder: WorkingOrder): WorkingOrder {


        return workingOrder;
    }

    update(id: string, workingOrder: WorkingOrder): WorkingOrder {


        return workingOrder;
    }

}