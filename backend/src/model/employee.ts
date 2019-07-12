export class Employee {
    id: number;
    active: boolean;
    skills: string;

    constructor( _id: number, _active: boolean, _skills: string) {
        this.id = _id;
        this.active = _active;
        this.skills = _skills;
    }

    fromObject() {
        return ( this.id, this.active, this.skills );
    }

    toObject(_id: number, _active: boolean, _skills: string) {
        this.id = _id;
        this.active = _active;
        this.skills = _skills;
    }

}