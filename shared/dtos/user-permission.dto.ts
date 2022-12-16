import { BaseDto } from "./base.dto";

export class UserPermissionDto extends BaseDto {
    id: string;
    userId: string;
    permissionId: string;
    licensed: number;
}