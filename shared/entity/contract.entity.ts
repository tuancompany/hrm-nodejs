import { ContractDto } from "../dtos/contract.dto";

export class ContractEntity {
    public id: string = '';
    public startDate: Date = new Date();
    public endDate: Date = new Date();
    public signedDate: Date = new Date();
    public content: string = '';
    public timesSigned: number = 1;
    public deadline: string = '';
    public coefficientsSalary: number = 1;
    public employeeId: string = '';
 
    constructor(instanceData?: ContractDto) {
        if(instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData?: ContractDto) {
        const keys = Object.keys(this);

        for(const key of keys) {
            if(instanceData?.hasOwnProperty(key)) {
                this[key] = instanceData[key];
            }
        }
    }
}