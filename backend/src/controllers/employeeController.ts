import { BaseController } from "./baseController";
import { Employee } from "../model/employee";
import { WalletHandler } from '../services/walletHandler';
import { ethers } from 'ethers';

const employeeRouterData = require('../../../blockchain/build/contracts/EmployeeRouter');
const networkId = process.env.NETWORK_ID;
const employeeRouterAddress = employeeRouterData.networks[networkId].address;
const employeeRouterAbi = employeeRouterData.abi;

export class EmployeeController implements BaseController {

    getAll(): Employee[] {
        let wallet = WalletHandler.getProviderForUser();
        let employeeRouter = new ethers.Contract(employeeRouterAddress, employeeRouterAbi, wallet);
        let employeeList;
        let promise = employeeRouter.getAllEmployees();

        promise
            .on('error', (error: any) => {
                console.log(error.message);
                console.log("Deployment failed with error: " + error.message);
                promise.reject(new Error(error.message));
            })
            .on('receipt', (receipt: any) => {
                employeeList = receipt;
            });

        return employeeList;
    }

    getByID(id: number): Employee {
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