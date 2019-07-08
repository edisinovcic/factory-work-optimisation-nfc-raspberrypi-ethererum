export interface BaseController {
    getAll(): any;
    getByID(id: number): any;
    create(object: object): any;
    update(id: number, object: object): any;
}