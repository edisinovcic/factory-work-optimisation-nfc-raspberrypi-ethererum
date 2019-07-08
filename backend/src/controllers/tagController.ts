import { BaseController } from "./baseController";
import { Tag } from "../model/tag";

export class TagController implements BaseController {

    getAll(): Tag[] {
        let list = null;

        return list;
    }

    getByID(id: number): Tag {
        let tag;


        return tag;
    }

    create(tag: Tag): Tag {

        return tag;
    }

    update(id: number, tag: Tag): Tag {


        return tag;
    }

}