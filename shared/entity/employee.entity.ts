interface IEmployee {
    id: string;
    name: string;
    gender: string;
    dob: Date;
    phoneNumber: string;
    citizenIdentification: string;
    address: string;
    basicSalary: number;
    imageUrl: string;
    departmentId: string;
    partId: string;
    positionId: string;
    degreeId: string;   
};

export class EmployeeEntity {
    public id: string = '';
    public name: string = '';
    public gender: string = '';
    public dob: Date = new Date();
    public phoneNumber: string = '';
    public citizenIdentification: string = '';
    public address: string = '';
    public basicSalary: number = 1;
    public imageUrl: string = '';
    public departmentId: string = '';
    public partId: string = '';
    public positionId: string = '';
    public degreeId: string = '';

    constructor(instanceData?: IEmployee) {
        if(instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData?: IEmployee) {
        const keys = Object.keys(this);

        for(const key of keys) {
            if(instanceData?.hasOwnProperty(key)) {
                this[key] = instanceData[key];
            }
        }
    }
}