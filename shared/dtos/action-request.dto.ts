import { BaseDto } from "./base.dto";

export class ActionRequestDto extends BaseDto {
    expirationDate: Date;
    type: string;
    approved: boolean;
    employeeId: string;
    managerId: string;
}
