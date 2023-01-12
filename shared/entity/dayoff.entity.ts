import { DayoffDto } from "./../dtos/dayoff.dto"

export class DayoffEntity {
    public id: string = '';
    public requestedDate: Date = new Date();
    public from: Date = new Date();
    public to: Date = new Date();
    public type: string = '';
    public approved: boolean = false;
    public reason: string = '';
    public employeeId: string = '';
    
    constructor(instanceData?: DayoffDto) {
        if(instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData?: DayoffDto) {
        const keys = Object.keys(this);

        for(const key of keys) {
            if(instanceData?.hasOwnProperty(key)) {
                this[key] = instanceData[key];
            }
        }
    }
}