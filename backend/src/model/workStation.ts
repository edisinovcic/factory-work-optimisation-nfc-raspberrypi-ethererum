export class WorkStation {
    id: string;
    description: string;
    active: boolean;

    constructor( _id: string, _description: string, _active: boolean ) {
        this.id = _id;
        this.description = _description;
        this.active = _active;
    }

    fromObject() {
        return ( this.id, this.description, this.active);
    }

    toObject(_id: string, _description: string, _active: boolean) {
        this.id = _id;
        this.description = _description;
        this.active = _active;
    }

}