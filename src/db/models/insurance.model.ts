import {
  Model,
  Optional,
  DataTypes,
  ModelScopeOptions,
  ModelValidateOptions,
} from "sequelize";
import { Employee } from "./employee.model";

export interface InsuranceAttributes {
  id: string;
  insuranceNumber: string;
  issuedDate: Date;
  issuedAddress: string;
  medicalExaminationAddress: string;
  employeeId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InsuranceCreationAttributes
  extends Optional<InsuranceAttributes, "id"> {}

export const InsuranceDefinition = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    field: "id",
  },
  insuranceNumber: {
    type: DataTypes.CHAR,
    allowNull: false,
    field: "insurance_number",
  },
  issuedDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "issued_date",
  },
  issuedAddress: {
    type: DataTypes.CHAR,
    allowNull: false,
    field: "issued_address",
  },
  medicalExaminationAddress: {
    type: DataTypes.CHAR,
    allowNull: true,
    field: "medical_examination_address",
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

export class Insurance
  extends Model<InsuranceAttributes, InsuranceCreationAttributes>
  implements InsuranceAttributes
{
  public id: string;
  public insuranceNumber: string;
  public issuedDate: Date;
  public issuedAddress: string;
  public medicalExaminationAddress: string;
  public employeeId: string;
  public createdAt: Date;
  public updatedAt: Date;

  static readonly scopes: ModelScopeOptions = {};
  static readonly validations: ModelValidateOptions = {};
  associate: () => void;
}

Insurance.prototype.associate = function () {
  Employee.hasOne(Insurance, { as: "insurance", foreignKey: "employeeId" });
  Insurance.belongsTo(Employee, { as: "employee" });
};
