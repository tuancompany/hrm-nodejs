interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    extraInfo: string;
};

export class UserEntity {
    public id: string = '';
    public name: string = '';
    public email: string = '';
    public password: string = '';
    public role: string = '';
    public extraInfo: string = '';
    
    constructor(instanceData?: IUser) {
        if(instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData?: IUser) {
        const keys = Object.keys(this);

        for(const key of keys) {
            if(instanceData?.hasOwnProperty(key)) {
                this[key] = instanceData[key];
            }
        }
    }
}