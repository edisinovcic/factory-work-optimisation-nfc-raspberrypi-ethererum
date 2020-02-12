import { BaseController } from "./baseController";
import { Employee } from "../model/employee";
import { WalletHandler } from "../services/walletHandler";
import { ethers } from "ethers";
import uuid from "uuid";

export class EmployeeController implements BaseController {

    async getAll(): Promise<string[]> {
        const wallet = WalletHandler.getProviderForUser();
        const employeeRouter = new ethers.Contract(global.employeeData.contractAddress, global.employeeData.abi, wallet);
        return await employeeRouter.getAllEmployees();
    }

    async getAllContents(): Promise<Employee[]> {
        const wallet = WalletHandler.getProviderForUser();
        const employeeRouter = new ethers.Contract(global.employeeData.contractAddress, global.employeeData.abi, wallet);
        const employeeAddresses = await employeeRouter.getAllEmployees();

        const promises: any[] = [];
        // Collect all promises
        for (const counter in employeeAddresses) {
            const employeeInstance = new ethers.Contract(employeeAddresses[counter], global.employeeData.instanceAbi, wallet);
            promises.push(employeeInstance.getEmployeeData());
        }

        return Promise.all(promises)
        .then((result) => {
            const employeeList: Employee[] = [];
            result.forEach((element) => {
                const newEmployee: Employee = new Employee(element.id, element.active, element.skills);
                employeeList.push(
                    newEmployee
                );
            });
            return employeeList;
        });
    }

    async getByID(id: number): Promise<Employee> {
        const wallet = WalletHandler.getProviderForUser();
        const employeeRouter = new ethers.Contract(global.employeeData.contractAddress, global.employeeData.abi, wallet);
        const result = await employeeRouter.getEmployeeById(id);
        return new Employee(result.id, result.active, result.skills);
    }

    async getByAddress(address: string): Promise<Employee> {
        const wallet = WalletHandler.getProviderForUser();
        const employeeRouter = new ethers.Contract(global.employeeData.contractAddress, global.employeeData.abi, wallet);
        const result = await employeeRouter.getEmployeeByAddress(address);
        return new Employee(result.id, result.active, result.skills);
    }

    // TODO: Add timeout for request when request lasts too much
    // TODO: update to user Promise<Employee> as a return type
    async create(employee: Employee): Promise<any> {
        const wallet = WalletHandler.getProviderForUser();
        const employeeRouter = new ethers.Contract(global.employeeData.contractAddress, global.employeeData.abi, wallet);
        const tx = await employeeRouter.addNewEmployee(uuid().toString(), employee.active, employee.skills);
        const txPromise = tx.wait();
        const employeeCreationPromise = new Promise((resolve) => {
            employeeRouter
            .on(("CreatedEmployee"), (receipt: any) => {
                console.log(receipt);
                resolve(receipt);
            });
        });

        return Promise.all([employeeCreationPromise, txPromise])
        .then((result) => {
            return result[0];
        });
    }

    async update(address: string, employee: Employee): Promise<any> {
        const wallet = WalletHandler.getProviderForUser();
        const employeeInstanceRouter = new ethers.Contract(address, global.employeeData.instanceAbi, wallet);
        const tx = await employeeInstanceRouter.update(employee.id, employee.active, employee.skills);
        const txPromise = tx.wait();
        const employeeCreationPromise = new Promise((resolve) => {
            employeeInstanceRouter
            .on(("UpdatedEmployee"), (receipt: any) => {
                console.log(receipt);
                resolve(receipt);
            });
        });

        return Promise.all([employeeCreationPromise, txPromise])
        .then((result) => {
            return result[0];
        });
    }

}