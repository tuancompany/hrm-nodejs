import { PermissionDto } from "../dtos/permission.dto";

export class IGetUserResponse {
    id: string;
    name: string;
    email: string;
    password?: string;
    role: string;
    permission?: PermissionDto[]
    extraInfo: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class GetUserResponse {
    public id: string = '';
    public name: string = '';
    public email: string = '';
    public password?: string = '';
    public role: string = '';
    public extraInfo: string = '';
    public permission?: PermissionDto[] = [];
    public createdAt?: Date;
    public updatedAt?: Date;

    constructor(instanceData?: IGetUserResponse) {
        const keys = Object.keys(this);

        for(const key of keys) {
            if(instanceData?.hasOwnProperty(key)) {
                this[key] = instanceData[key];
            } else {
                delete this[key];
            }
        }
    }
}