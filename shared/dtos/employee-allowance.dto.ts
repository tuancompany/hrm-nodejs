import { BaseDto } from "./base.dto";

export class EmployeeAllowanceDto extends BaseDto {
    id: string;
    date: Date;
    content: string;
    amount: number;
    employeeId: string;
    allowanceId: string;
}