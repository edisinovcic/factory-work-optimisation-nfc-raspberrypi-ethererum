import { BaseController } from "./baseController";
import { Employee } from "../model/employee";
import { WalletHandler } from "../services/walletHandler";
import { ethers } from "ethers";

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
                const newEmployee: Employee = new Employee(element.id.toNumber(), element.active, element.skills);
                employeeList.push(
                    newEmployee
                );
            });
            return employeeList;
        }).catch((error) => {
            throw new Error(error.message);
        });
    }

    async getByID(id: number): Promise<Employee> {
        const wallet = WalletHandler.getProviderForUser();
        const employeeRouter = new ethers.Contract(global.employeeData.contractAddress, global.employeeData.abi, wallet);
        const result = await employeeRouter.getEmployeeById(id)
        .then((result: any) => {
            return result;
        }).catch((error: any) => {
            throw new Error(error.message);
        });
        return new Employee(result.id.toNumber(), result.active, result.skills);
    }

    async getByAddress(address: string): Promise<Employee> {
        const wallet = WalletHandler.getProviderForUser();
        const employeeRouter = new ethers.Contract(global.employeeData.contractAddress, global.employeeData.abi, wallet);
        const result = await employeeRouter.getEmployeeByAddress(address)
        return new Employee(result.id.toNumber(), result.active, result.skills);
    }

    // TODO: Add timeout for request when request lasts too much
    // TODO: update to user Promise<Employee> as a return type
    async create(employee: Employee): Promise<any> {
        const wallet = WalletHandler.getProviderForUser();
        const employeeRouter = new ethers.Contract(global.employeeData.contractAddress, global.employeeData.abi, wallet);
        const tx = await employeeRouter.addNewEmployee(employee.id, employee.active, employee.skills);
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
        }).catch((error) => {
            throw new Error(error.message);
        });
    }

    async update(id: number, employee: Employee): Promise<any> {
        const wallet = WalletHandler.getProviderForUser();
        const employeeRouter = new ethers.Contract(global.employeeData.contractAddress, global.employeeData.abi, wallet);
        const tx = await employeeRouter.addNewEmployee(employee.id, employee.active, employee.skills);
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
        }).catch((error) => {
            throw new Error(error.message);
        });
    }

}