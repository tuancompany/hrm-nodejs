import { AllowanceDto } from "../dtos/allowance.dto";

export class AllowanceEntity {
    public id: string = '';
    public name: string = '';
    public amount: number = 1;
    public content: string = '';
 
    constructor(instanceData?: AllowanceDto) {
        if(instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData?: AllowanceDto) {
        const keys = Object.keys(this);

        for(const key of keys) {
            if(instanceData?.hasOwnProperty(key)) {
                this[key] = instanceData[key];
            }
        }
    }
}