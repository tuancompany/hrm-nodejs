import { UserPermissionDto } from "../dtos/user-permission.dto";

export class UserPermissionEntity {
    public id: string = '';
    public userId: string = '';
    public permissionId: string = '';
    public licensed: number = 0;
 
    constructor(instanceData?: UserPermissionDto) {
        if(instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData?: UserPermissionDto) {
        const keys = Object.keys(this);

        for(const key of keys) {
            if(instanceData?.hasOwnProperty(key)) {
                this[key] = instanceData[key];
            }
        }
    }
}