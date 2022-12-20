import { PermissionDto } from "../dtos/permission.dto";
export interface IGetUserPermissionResponse {
    id: string;
    licensed: number;
    userId: string;
    permission?: PermissionDto[];
}

export class GetUserPermissionResponse {
    public id: string = '';
    public licensed: number = 0;
    public userId: string= '';
    public permission?: PermissionDto[] = [];

    constructor(instanceData?: IGetUserPermissionResponse) {
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