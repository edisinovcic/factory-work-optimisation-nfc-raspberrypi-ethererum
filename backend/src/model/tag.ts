export class Tag {
    id: number;
    description: string;
    active: boolean;

    constructor( _id: number, _description: string, _active: boolean ) {
        this.id = _id;
        this.description = _description;
        this.active = _active;
    }

    fromObject() {
        return ( this.id, this.description, this.active);
    }

    toObject(_id: number, _description: string, _active: boolean) {
        this.id = _id;
        this.description = _description;
        this.active = _active;
    }

}