import { EmployeeAllowanceDto } from "../dtos/employee-allowance.dto";

export class EmployeeAllowanceEntity {
    public id: string = '';
    public date: Date = new Date();
    public content: string = '';
    public amount: number = 1;
    public employeeId: string = '';
    public allowanceId: string = '';
 
    constructor(instanceData?: EmployeeAllowanceDto) {
        if(instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData?: EmployeeAllowanceDto) {
        const keys = Object.keys(this);

        for(const key of keys) {
            if(instanceData?.hasOwnProperty(key)) {
                this[key] = instanceData[key];
            }
        }
    }
}