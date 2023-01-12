export class ICreateDayoffResponse {
    id: string;
    requestedDate: Date;
    from: Date;
    to: Date;
    type: string;
    approved: boolean;
    reason: string;
    employeeId: string;
}

export class CreateDayoffResponse {
    public id: string;
    public requestedDate: Date;
    public from: Date;
    public to: Date;
    public type: string;
    public approved: boolean;
    public reason: string;
    public employeeId: string;

    constructor(instanceData?: ICreateDayoffResponse) {
        if(instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData?: ICreateDayoffResponse) {
        const keys = Object.keys(this);

        for(const key of keys) {
            if(instanceData?.hasOwnProperty(key)) {
                this[key] = instanceData[key];
            } else {
                delete this[key];
            }
        }
    }
}