import { BaseController } from "./baseController";
import { WalletHandler } from "../services/walletHandler";
import { Tag } from "../model/tag";
import { ethers } from "ethers";

export class TagController implements BaseController {
    async getAll(): Promise<string[]> {
        const wallet = WalletHandler.getProviderForUser();
        const tagRouter = new ethers.Contract(global.tagData.contractAddress, global.tagData.abi, wallet);
        return await tagRouter.getAllTags();
    }

    async getAllContents(): Promise<Tag[]> {
        const wallet = WalletHandler.getProviderForUser();
        const tagRouter = new ethers.Contract(global.tagData.contractAddress, global.tagData.abi, wallet);
        const tagAddresses = await tagRouter.getAllTags();

        const promises: any[] = [];
        // Collect all promises
        for (const counter in tagAddresses) {
            const tagInstance = new ethers.Contract(tagAddresses[counter], global.tagData.instanceAbi, wallet);
            promises.push(tagInstance.getTagData());
        }

        return Promise.all(promises)
        .then((result) => {
            const tagList: Tag[] = [];
            result.forEach((element) => {
                const newTag: Tag = new Tag(element.id.toNumber(), element.active, element.description);
                tagList.push(
                    newTag
                );
            });
            return tagList;
        }).catch((error) => {
            throw new Error(error.message);
        });
    }

    async getByID(id: number): Promise<Tag> {
        const wallet = WalletHandler.getProviderForUser();
        const tagRouter = new ethers.Contract(global.tagData.contractAddress, global.tagData.abi, wallet);
        const result = await tagRouter.getTagById(id);
        return new Tag(result.id.toNumber(), result.active, result.description);
    }

    async getByAddress(address: string): Promise<Tag> {
        const wallet = WalletHandler.getProviderForUser();
        const tagRouter = new ethers.Contract(global.tagData.contractAddress, global.tagData.abi, wallet);
        const result = await tagRouter.getTagByAddress(address);
        return new Tag(result.id.toNumber(), result.active, result.description);
    }

    // TODO: Add timeout for request when request lasts too much
    // TODO: update to user Promise<Tag> as a return type
    async create(tag: Tag): Promise<any> {
        const wallet = WalletHandler.getProviderForUser();
        const tagRouter = new ethers.Contract(global.tagData.contractAddress, global.tagData.abi, wallet);
        const tx = await tagRouter.addNewTag(tag.id, tag.description, tag.active);
        const txPromise = tx.wait();
        const tagCreationPromise = new Promise((resolve) => {
            tagRouter
            .on(("CreatedTag"), (receipt: any) => {
                console.log(receipt);
                resolve(receipt);
            });
        });

        return Promise.all([tagCreationPromise, txPromise])
        .then((result) => {
            return result[0];
        }).catch((error) => {
            throw new Error(error.message);
        });
    }

    async update(id: number, tag: Tag): Promise<any> {
        const wallet = WalletHandler.getProviderForUser();
        const tagRouter = new ethers.Contract(global.tagData.contractAddress, global.tagData.abi, wallet);
        const tx = await tagRouter.addNewTag(tag.id, tag.active, tag.description);
        const txPromise = tx.wait();
        const tagCreationPromise = new Promise((resolve) => {
            tagRouter
            .on(("CreatedTag"), (receipt: any) => {
                console.log(receipt);
                resolve(receipt);
            });
        });

        return Promise.all([tagCreationPromise, txPromise])
        .then((result) => {
            return result[0];
        }).catch((error) => {
            throw new Error(error.message);
        });
    }

}