import { EmployeeDto } from "../dtos/employee.dto";
import { ContractDto } from '../dtos/contract.dto';
import { AllowanceDto } from '../dtos/allowance.dto';

export class CreateEmployeeResponse {
    public id: string = '';
    public name: string = '';
    public gender: string = '';
    public dob: Date = new Date();
    public phoneNumber: string = '';
    public citizenIdentification: string = '';
    public address: string = '';
    public basicSalary: number = 1;
    public imageUrl: string = '';
    public allowance: AllowanceDto[] = [];
    public contract: ContractDto = {
        id: '',
        startDate: new Date(),
        endDate: new Date(),
        signedDate: new Date(),
        content: '',
        timesSigned: 1,
        deadline: '',
        coefficientsSalary: 1,
        employeeId: '',
    }
    public departmentId: string = '';
    public partId: string = '';
    public positionId: string = '';
    public degreeId: string = '';
 
    constructor(instanceData?: EmployeeDto) {
        if(instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData?: EmployeeDto) {
        const keys = Object.keys(this);

        for(const key of keys) {
            if(instanceData?.hasOwnProperty(key)) {
                this[key] = instanceData[key];
            }
        }
    }
}