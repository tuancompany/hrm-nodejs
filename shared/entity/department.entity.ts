import { DepartmentDto } from "../dtos/department.dto";

export class DepartmentEntity {
    public id: string = '';
    public name: string = '';
 
    constructor(instanceData?: DepartmentDto) {
        if(instanceData) {
            this.deserialize(instanceData);
        }
    }

    private deserialize(instanceData?: DepartmentDto) {
        const keys = Object.keys(this);

        for(const key of keys) {
            if(instanceData?.hasOwnProperty(key)) {
                this[key] = instanceData[key];
            }
        }
    }
}