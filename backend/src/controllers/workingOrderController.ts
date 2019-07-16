import { BaseController } from "./baseController";
import { WorkingOrder } from "../model/workingOrder";
import { WalletHandler } from "../services/walletHandler";
import { ethers } from "ethers";
import uuid = require("uuid");

export class WorkingOrderController implements BaseController {

    async getAll(): Promise<string[]> {
        const wallet = WalletHandler.getProviderForUser();
        const workingOrderRouter = new ethers.Contract(global.workingOrderData.contractAddress, global.workingOrderData.abi, wallet);
        return await workingOrderRouter.getAllWorkingOrders();
    }

    async getAllContents(): Promise<WorkingOrder[]> {
        const wallet = WalletHandler.getProviderForUser();
        const workingOrderRouter = new ethers.Contract(global.workingOrderData.contractAddress, global.workingOrderData.abi, wallet);
        const workingOrderAddresses = await workingOrderRouter.getAllWorkingOrders();

        const promises: any[] = [];
        // Collect all promises
        for (const counter in workingOrderAddresses) {
            const workingOrderInstance = new ethers.Contract(workingOrderAddresses[counter], global.workingOrderData.instanceAbi, wallet);
            promises.push(workingOrderInstance.getWorkingOrderData());
        }

        return Promise.all(promises)
        .then((result) => {
            const workingOrderList: WorkingOrder[] = [];
            result.forEach((element) => {
                const newWorkingOrder: WorkingOrder = new WorkingOrder(element.id, element.inputTags, element.outputTag, element.status, element.statusDescription);
                workingOrderList.push(
                    newWorkingOrder
                );
            });
            return workingOrderList;
        });
    }

    async getByID(id: number): Promise<WorkingOrder> {
        const wallet = WalletHandler.getProviderForUser();
        const workingOrderRouter = new ethers.Contract(global.workingOrderData.contractAddress, global.workingOrderData.abi, wallet);
        const result = await workingOrderRouter.getWorkingOrderById(id);
        return new WorkingOrder(result.id, result.inputTags, result.outputTag, result.status, result.statusDescription);
    }

    async getByAddress(address: string): Promise<WorkingOrder> {
        const wallet = WalletHandler.getProviderForUser();
        const workingOrderRouter = new ethers.Contract(global.workingOrderData.contractAddress, global.workingOrderData.abi, wallet);
        const result = await workingOrderRouter.getWorkingOrderByAddress(address);
        return new WorkingOrder(result.id, result.inputTags, result.outputTag, result.status, result.statusDescription);
    }

    // TODO: Add timeout for request when request lasts too much
    // TODO: update to user Promise<WorkingOrder> as a return type
    async create(workingOrder: WorkingOrder): Promise<any> {
        const wallet = WalletHandler.getProviderForUser();
        const workingOrderRouter = new ethers.Contract(global.workingOrderData.contractAddress, global.workingOrderData.abi, wallet);
        const tx = await workingOrderRouter.addNewWorkingOrder(uuid().toString(), workingOrder.inputTags, workingOrder.outputTag, workingOrder.status, workingOrder.statusDescription);
        const txPromise = tx.wait();
        const workingOrderCreationPromise = new Promise((resolve) => {
            workingOrderRouter
            .on(("CreatedWorkingOrder"), (receipt: any) => {
                console.log(receipt);
                resolve(receipt);
            });
        });

        return Promise.all([workingOrderCreationPromise, txPromise])
        .then((result) => {
            return result[0];
        });
    }

    async update(address: string, workingOrder: WorkingOrder): Promise<any> {
        const wallet = WalletHandler.getProviderForUser();
        const workingOrderInstanceRouter = new ethers.Contract(address, global.workingOrderData.instanceAbi, wallet);
        const tx = await workingOrderInstanceRouter.update(workingOrder.id, workingOrder.inputTags, workingOrder.outputTag, workingOrder.status, workingOrder.statusDescription);
        const txPromise = tx.wait();
        const workingOrderCreationPromise = new Promise((resolve) => {
            workingOrderInstanceRouter
            .on(("UpdatedWorkingOrder"), (receipt: any) => {
                console.log(receipt);
                resolve(receipt);
            });
        });

        return Promise.all([workingOrderCreationPromise, txPromise])
        .then((result) => {
            return result[0];
        });
    }


}