import { BaseDto } from "./base.dto";

export class ManagerDto extends BaseDto {
    id: string;
    name: string;
    gender: string;
    dob: Date;
    phoneNumber: string;
    email: string;
    dateJoined: Date;
    dateLeft: Date;
    active: boolean;
    departmentId?: string;
    partId?: string;
    positionId?: string;
    degreeId?: string;
}
