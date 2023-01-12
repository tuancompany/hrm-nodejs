export class ICreateOvertimeResponse {
    id: string;
    year: number;
    month: number;
    day: number;
    hour: number;
    employeeId: string;
    overtimeTypeId: string;
}

export class CreateOvertimeResponse {
    public id: string = '';
    public year: number = 1;
    public month: number = 1;
    public day: number = 1;
    public hour: number = 1;
    public employeeId: string = '';
    public overtimeTypeId: string = '';

    constructor(instanceData?: ICreateOvertimeResponse) {
        if(instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData?: ICreateOvertimeResponse) {
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