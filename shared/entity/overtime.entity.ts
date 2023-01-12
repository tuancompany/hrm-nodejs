import { OvertimeDto } from "./../dtos/overtime.dto"

export class OvertimeEntity {
    public id: string = '';
    public year: number = 1;
    public month: number = 1;
    public day: number = 1;
    public hour: number = 1;
    public employeeId: string = '';
    public overtimeTypeId: string = '';
    
    constructor(instanceData?: OvertimeDto) {
        if(instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData?: OvertimeDto) {
        const keys = Object.keys(this);

        for(const key of keys) {
            if(instanceData?.hasOwnProperty(key)) {
                this[key] = instanceData[key];
            }
        }
    }
}