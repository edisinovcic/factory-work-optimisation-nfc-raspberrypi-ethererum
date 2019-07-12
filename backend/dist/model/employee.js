"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Employee {
    constructor(_id, _active, _skills) {
        this.id = _id;
        this.active = _active;
        this.skills = _skills;
    }
    fromObject() {
        return (this.id, this.active, this.skills);
    }
    toObject(_id, _active, _skills) {
        this.id = _id;
        this.active = _active;
        this.skills = _skills;
    }
}
exports.Employee = Employee;
//# sourceMappingURL=employee.js.map