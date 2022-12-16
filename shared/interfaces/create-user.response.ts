export class ICreateUserResponse {
    id: string;
    name: string;
    email: string;
    role: string;
    extraInfo: string;
}

export class CreateUserResponse {
    public id: string = '';
    public name: string = '';
    public email: string = '';
    public role: string = '';
    public extraInfo: string = '';

    constructor(instanceData?: ICreateUserResponse) {
        if(instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData?: ICreateUserResponse) {
        const keys = Object.keys(this);

        for(const key of keys) {
            if(instanceData?.hasOwnProperty(key)) {
                this[key] = instanceData[key];
            }
        }
    }
}