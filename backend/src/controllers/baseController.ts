export interface BaseController {
    getAll(): any;
    getAllContents(): any;
    getByID(id: number): any;
    getByAddress(address: string): any;
    create(object: object): any;
    update(id: string, object: object): any;
}