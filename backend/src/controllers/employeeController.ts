import { BaseController } from "./baseController";
import { Employee } from "../model/employee";
import { WalletHandler } from "../services/walletHandler";
import { ethers } from "ethers";

export class EmployeeController implements BaseController {

    getAll(): Employee[] {
        const wallet = WalletHandler.getProviderForUser();
        const employeeRouter = new ethers.Contract(global.employeeData.contractAddress, global.employeeData.abi, wallet);
        let employeeList;
        const promise = employeeRouter.getAllEmployees();

        promise
            .on("error", (error: any) => {
                console.log(error.message);
                console.log("Deployment failed with error: " + error.message);
                promise.reject(new Error(error.message));
            })
            .on("receipt", (receipt: any) => {
                employeeList = receipt;
            });

        return employeeList;
    }

    getByID(id: number): Employee {
// tslint:disable-next-line: prefer-const
        let employee;
        return employee;
    }

    create(employee: Employee): Employee {

        return employee;
    }

    update(id: number, employee: Employee): Employee {

        return employee;
    }

}