import {
  Model,
  Optional,
  DataTypes,
  ModelScopeOptions,
  ModelValidateOptions,
} from "sequelize";
import { Employee } from "./employee.model";

export interface ContractAttributes {
  id: string;
  startDate: Date;
  endDate: Date;
  signedDate: Date;
  content: string;
  timesSigned: number;
  deadline: string;
  coefficientsSalary: number;
  employeeId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContractCreationAttributes
  extends Optional<ContractAttributes, "id"> {}

export const ContractDefinition = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    field: "id",
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "start_date",
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: "end_date",
  },
  signedDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "signed_date",
  },
  content: {
    type: DataTypes.CHAR,
    allowNull: true,
    field: "content",
  },
  timesSigned: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "times_signed",
  },
  deadline: {
    type: DataTypes.CHAR,
    allowNull: true,
    field: "deadline",
  },
  coefficientsSalary: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "coefficients_salary",
  },
  employeeId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: "employee_id",
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

export class Contract
  extends Model<ContractAttributes, ContractCreationAttributes>
  implements ContractAttributes
{
  public id: string;
  public startDate: Date;
  public endDate: Date;
  public signedDate: Date;
  public content: string;
  public timesSigned: number;
  public deadline: string;
  public coefficientsSalary: number;
  public employeeId: string;
  public createdAt: Date;
  public updatedAt: Date;

  static readonly scopes: ModelScopeOptions = {};
  static readonly validations: ModelValidateOptions = {};
  associate: () => void;
}

Contract.prototype.associate = function () {
  Contract.belongsTo(Employee);
};
