import { BaseDto } from "./base.dto";

export class OvertimeDto extends BaseDto {
    id: string;
    year: number;
    month: number;
    day: number;
    hour: number;
    employeeId: string;
    overtimeTypeId: string;
}
