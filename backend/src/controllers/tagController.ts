import { BaseController } from "./baseController";
import { Tag } from "../model/tag";

export class TagController implements BaseController {
    getAllContents() {
        throw new Error("Method not implemented.");
    }
    getAll(): Tag[] {
        let list;
        
        return list;
    }

    getByID(id: number): Tag {
        let tag;


        return tag;
    }

    getByAddress(address: string) {
        // TODO:
    }

    create(tag: Tag): Tag {

        return tag;
    }

    update(id: number, tag: Tag): Tag {


        return tag;
    }

}