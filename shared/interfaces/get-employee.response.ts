import { ContractDto } from "../dtos/contract.dto";
import { AllowanceDto } from "../dtos/allowance.dto";
import { DepartmentDto } from "../dtos/department.dto";
import { PartDto } from "../dtos/part.dto";
import { PositionDto } from "../dtos/position.dto";
import { DegreeDto } from "../dtos/degree.dto";
import { ManagerDto } from "../dtos/manager.dto";

export interface IGetEmployeeResponse {
  id: string;
  name: string;
  gender: string;
  dob: Date;
  phoneNumber: string;
  citizenIdentification: string;
  address: string;
  basicSalary: number;
  imageUrl: string;
  dateJoined: Date;
  dateLeft: Date;
  active: boolean;
  jobLevel: number;
  manager?: ManagerDto;
  allowance?: AllowanceDto[];
  contract?: ContractDto;
  department?: DepartmentDto;
  part?: PartDto;
  position?: PositionDto;
  degree?: DegreeDto;
}

export class GetEmployeeResponse {
  public id: string = "";
  public name: string = "";
  public gender: string = "";
  public dob: Date = new Date();
  public phoneNumber: string = "";
  public citizenIdentification: string = "";
  public address: string = "";
  public basicSalary: number = 1;
  public imageUrl: string = "";
  public dateJoined: Date = new Date();
  public dateLeft: Date = new Date();
  public active: boolean = false;
  public jobLevel: number = 0;
  public manager?: ManagerDto = {
    id: "",
    name: "",
    gender: "",
    dob: new Date(),
    phoneNumber: "",
    email: "",
    dateJoined: new Date(),
    dateLeft: new Date(),
    active: false,
  };
  public allowance?: AllowanceDto[] = [];
  public contract?: ContractDto = {
    id: "",
    startDate: new Date(),
    endDate: new Date(),
    signedDate: new Date(),
    content: "",
    timesSigned: 1,
    deadline: "",
    coefficientsSalary: 1,
    employeeId: "",
  };
  public department?: DepartmentDto = {
    id: "",
    name: "",
  };
  public part?: PartDto = {
    id: "",
    name: "",
  };
  public position?: PositionDto = {
    id: "",
    name: "",
  };
  public degree?: DegreeDto = {
    id: "",
    name: "",
  };

  constructor(instanceData?: IGetEmployeeResponse) {
    if (instanceData) {
      this.deserialize(instanceData);
    }
  }

  private deserialize(instanceData?: IGetEmployeeResponse) {
    const keys = Object.keys(this);

    for (const key of keys) {
      if (instanceData?.hasOwnProperty(key)) {
        this[key] = instanceData[key];
      } else {
        delete this[key];
      }
    }
  }
}
