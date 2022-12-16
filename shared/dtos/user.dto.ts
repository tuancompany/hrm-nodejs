import { BaseDto } from "./base.dto";

export class UserDto extends BaseDto {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    extraInfo: string;
}
