"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Tag {
    constructor(_id, _description, _active) {
        this.id = _id;
        this.description = _description;
        this.active = _active;
    }
    fromObject() {
        return (this.id, this.description, this.active);
    }
    toObject(_id, _description, _active) {
        this.id = _id;
        this.description = _description;
        this.active = _active;
    }
}
exports.Tag = Tag;
//# sourceMappingURL=tag.js.map