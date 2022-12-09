import { BaseDto } from "./base.dto";

export class ContractDto extends BaseDto {
    startDate: Date;
    endDate: Date;
    signedDate: Date;
    content: string;
    timesSigned: number;
    deadline: string;
    coefficientsSalary: number;
    employeeId?: string;
}
