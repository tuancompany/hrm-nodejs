import { BaseDto } from "./base.dto";

export class DayoffDto extends BaseDto {
    id: string;
    requestedDate: Date;
    from: Date;
    to: Date;
    type: string;
    approved: boolean;
    reason: string;
    employeeId: string;
}
