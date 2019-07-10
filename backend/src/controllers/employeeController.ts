import { BaseController } from "./baseController";
import { Employee } from "../model/employee";
import { WalletHandler } from "../services/walletHandler";
import { ethers } from "ethers";

export class EmployeeController implements BaseController {

    async getAll(): Promise<any> {
        const wallet = WalletHandler.getProviderForUser();
        const employeeRouter = new ethers.Contract(global.employeeData.contractAddress, global.employeeData.abi, wallet);
        return await employeeRouter.getAllEmployees();
    }

    getByID(id: number): Employee {
        let employee;
        //TODO:
        return employee;
    }

    // Add timeout for request when request lasts too much
    async create(employee: Employee): Promise<any> {
        const wallet = WalletHandler.getProviderForUser();
        const employeeRouter = new ethers.Contract(global.employeeData.contractAddress, global.employeeData.abi, wallet);
        const tx = await employeeRouter.addNewEmployee(employee.id, employee.active, employee.skills);
        const txPromise = tx.wait();
        const employeeCreationPromise = new Promise((resolve, reject) => {
            employeeRouter
            .on(("CreatedEmployee"), (receipt: any) => {
                console.log(receipt);
                resolve(receipt);
            });
        });

        return Promise.all([employeeCreationPromise, txPromise])
        .then((result) => {
            return result[0];
        }).catch((error) => {
            throw new Error(error.message);
        });
    }

    update(id: number, employee: Employee): Employee {

        return employee;
    }

}