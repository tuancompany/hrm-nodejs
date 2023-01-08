import { ActionRequestDto } from "../dtos/action-request.dto";

export class ActionRequestEntity {
    public id: string = '';
    public expirationDate: Date = new Date();
    public type: string = '';
    public approved: boolean = false;
    public employeeId: string = '';
    public managerId: string = '';
 
    constructor(instanceData?: ActionRequestDto) {
        if(instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData?: ActionRequestDto) {
        const keys = Object.keys(this);

        for(const key of keys) {
            if(instanceData?.hasOwnProperty(key)) {
                this[key] = instanceData[key];
            }
        }
    }
}