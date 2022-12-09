import {
  Model,
  Optional,
  DataTypes,
  ModelScopeOptions,
  ModelValidateOptions,
} from "sequelize";
import { Employee } from "./employee.model";

export interface AdvanceSalaryAttributes {
  id: string;
  year: number;
  month: number;
  day: number;
  amount: number;
  status: boolean;
  employeeId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdvanceSalaryCreationAttributes
  extends Optional<AdvanceSalaryAttributes, "id"> {}

export const AdvanceSalaryDefinition = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    field: "id",
  },
  year: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: "year",
  },
  month: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: "month",
  },
  day: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: "day",
  },
  amount: {
    allowNull: false,
    type: DataTypes.DOUBLE,
    field: "amount",
  },
  status: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    field: "status",
  },
  employeeId: {
    allowNull: false,
    type: DataTypes.UUID,
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

export class AdvanceSalary
  extends Model<AdvanceSalaryAttributes, AdvanceSalaryCreationAttributes>
  implements AdvanceSalaryAttributes
{
  public id: string;
  public year: number;
  public month: number;
  public day: number;
  public amount: number;
  public status: boolean;
  public employeeId: string;
  public createdAt: Date;
  public updatedAt: Date;

  static readonly scopes: ModelScopeOptions = {};
  static readonly validations: ModelValidateOptions = {};
  associate: () => void;
}

AdvanceSalary.prototype.associate = function () {
  Employee.hasMany(AdvanceSalary, {
    as: "advanceSalary",
    foreignKey: "employee_id",
  });
  AdvanceSalary.belongsTo(Employee, { as: "employee" });
};
