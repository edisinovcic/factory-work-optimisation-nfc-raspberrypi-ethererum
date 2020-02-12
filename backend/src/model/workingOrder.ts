export class WorkingOrder {
    id: string;
    inputTags: string[];
    outputTag: string;
    status: string;
    statusDescription: string;

    constructor( _id: string, _inputTags: string[], _outputTag: string, _status: string, _statusDescription: string ) {
        this.id = _id;
        this.inputTags = _inputTags;
        this.outputTag = _outputTag;
        this.status = _status;
        this.statusDescription = _statusDescription;
    }

    fromObject() {
        return ( this.id, this.inputTags, this.outputTag, this.status, this.statusDescription );
    }

    toObject( _id: string, _inputTags: string[], _outputTag: string, _status: string, _statusDescription: string ) {
        this.id = _id;
        this.inputTags = _inputTags;
        this.outputTag = _outputTag;
        this.status = _status;
        this.statusDescription = _statusDescription;
    }

}