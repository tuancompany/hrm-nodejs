import {
  Model,
  Optional,
  DataTypes,
  ModelScopeOptions,
  ModelValidateOptions,
} from "sequelize";
import { Allowance } from "./allowance.model";
import { EmployeeAllowance } from "./employee-allowance.model";
import { Contract } from "./contract.model";
import { Department } from "./department.model";
import { Part } from "./part.model";
import { Position } from "./position.model";
import { Degree } from "./degree.model";
// import { ActionRequest } from "./action-request.model";
// import { Manager } from "./manager.model";
// import { DayOff } from "./dayoff.model";

export interface EmployeeAttributes {
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
  managerId: string;
  departmentId: string;
  partId: string;
  positionId: string;
  degreeId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmployeeCreationAttributes
  extends Optional<EmployeeAttributes, "id"> {}

export const EmployeeDefinition = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    field: "id",
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "name",
  },
  gender: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "gender",
  },
  dob: {
    allowNull: true,
    type: DataTypes.DATE,
    field: "dob",
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "phone_number",
  },
  citizenIdentification: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "citizen_identification",
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "address",
  },
  basicSalary: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "basic_salary",
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "image_url",
  },
  dateJoined: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'date_joined'
  },
  dateLeft: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'date_left'
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'active'
  },
  jobLevel: {
    type: DataTypes.NUMBER,
    allowNull: false,
    field: 'job_level'
  },
  managerId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'manager_id'
  },
  departmentId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: "department_id",
  },
  partId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: "part_id",
  },
  positionId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: "position_id",
  },
  degreeId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: "degree_id",
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "updated_at",
  },
};

export class Employee
  extends Model<EmployeeAttributes, EmployeeCreationAttributes>
  implements EmployeeAttributes
{
  public id: string;
  public name: string;
  public gender: string;
  public dob: Date;
  public phoneNumber: string;
  public citizenIdentification: string;
  public address: string;
  public basicSalary: number;
  public imageUrl: string;
  public dateJoined: Date;
  public dateLeft: Date;
  public active: boolean;
  public jobLevel: number;
  public managerId: string;
  public departmentId: string;
  public partId: string;
  public positionId: string;
  public degreeId: string;
  public createdAt: Date;
  public updatedAt: Date;

  static readonly scopes: ModelScopeOptions = {};
  static readonly validations: ModelValidateOptions = {};
  associate: () => void;
}

Employee.prototype.associate = function () {
  Employee.hasOne(Contract, {as: 'contract', foreignKey: "employeeId" });
  
  Employee.belongsTo(Department, { as: "department" });
  Employee.belongsTo(Part, { as: "part" });
  Employee.belongsTo(Position, { as: "position" });
  Employee.belongsTo(Degree, { as: "degree" });

  Employee.belongsToMany(Allowance, {
    through: EmployeeAllowance,
    foreignKey: "employeeId",
    as: "allowance"
  });

  Allowance.belongsToMany(Employee, {
    through: EmployeeAllowance,
    foreignKey: "allowanceId",
  });

};
