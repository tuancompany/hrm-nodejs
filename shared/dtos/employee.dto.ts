import { BaseDto } from "./base.dto";
import { AllowanceDto } from './allowance.dto';
import { ContractDto } from './contract.dto';
export class EmployeeDto extends BaseDto {
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
  managerId: string;
  allowance?: AllowanceDto[];
  contract?: ContractDto;
  departmentId: string;
  partId: string;
  positionId: string;
  degreeId: string;
}
