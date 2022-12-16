export interface IGetPermissionResponse {
    id: string;
    name: string;
}

export class GetPermissionResponse {
    public id: string = '';
    public name: string = '';

    constructor(instanceData?: IGetPermissionResponse) {
        const keys = Object.keys(this);

        for(const key of keys) {
            if(instanceData?.hasOwnProperty(key)) {
                this[key] = instanceData[key];
            }
        } 
    }
}